# Multi-Expense Parser Implementation Guide

## Implementation Status: **Phase 1-2 Complete **

### **Phase 1: Backend Implementation** - **COMPLETED**
- [x] Multi-expense parser module (`multi_expense_parser.py`)
- [x] Smart expense detection function (`detectExpenseCount`)
- [x] Parallel processing for multiple expenses
- [x] New API endpoint `/api/agents/multi_expense_parser/`
- [x] Updated router with MultiExpenseQuery model

### **Phase 2: Frontend Core Logic** - **COMPLETED**  
- [x] Updated `chatService.js` with smart parsing methods
- [x] `detectExpenseCount()` frontend implementation
- [x] `parseMultipleExpenses()` API integration
- [x] `parseExpensesSmart()` unified parsing method
- [x] Updated `handleSendMessage()` to use smart parsing
- [x] `MultiExpenseCard` component for collapsible expense display
- [x] Updated `ExpenseMessage` component to handle multi-expenses

### **Phase 3: Testing & Refinement** - **ACTIVE** 🧪
- **🌐 Browser Preview**: http://127.0.0.1:44487 (Ready for testing)
- **📋 Test Plan**: See `MULTI_EXPENSE_TEST_PLAN.md` for comprehensive testing
- [x] **Fixed missing dependencies**: Installed @heroicons/react package
- [x] **Fixed missing UserContext**: Updated to use existing useUserData hook
- [x] **Backend Structure**: Updated multi-expense parser with proper Pydantic models
- [ ] Test single expense parsing (backward compatibility)
- [ ] Test multiple expense parsing with various patterns  
- [ ] Performance optimization and error handling
- [ ] UI/UX refinements

**Recent Fixes:**
1. **Frontend Dependencies**: Added missing @heroicons/react package
2. **Context Integration**: Fixed MultiExpenseCard to use useUserData hook instead of missing UserContext
3. **Backend Structure**: Enhanced multi-expense parser with proper async handling and ExpenseData models
4. **Type Safety**: Implemented structured MultiExpenseResult return type

### **Phase 4: Advanced Features** - **PENDING**
- [ ] Receipt OCR integration
- [ ] Expense analysis insights
- [ ] Batch expense import

## Overview
This guide outlines the implementation strategy for enabling the MoneyManager chat system to handle multiple expenses in a single message while maintaining backward compatibility and performance.

## Current System Analysis

### Current Flow
1. User sends message → `handleSendMessage()` in chat.js
2. Parallel calls: `chatService.sendMessage()` + `chatService.parseExpense()`
3. `parseExpense()` calls `/api/agents/expense_parser/` with `save_to_db: true`
4. Single expense returned, shown as ExpenseCard in chat
5. Message saved to DB with basic structure (content, user_id, timestamp, message_type)
6. ExpenseData cached in frontend state for UI display

### Current Message Structure
**Database (Firestore messages collection):**
```javascript
{
  id: "message_id",
  content: "✅ Expense saved: coffee - €3.50",
  user_id: "user_id", 
  timestamp: "2025-01-01T10:00:00Z",
  message_type: "system" // or "user"
}
```

**Frontend Cache:**
```javascript
expenseDataCache[messageId] = {
  id: "expense_id",
  amount: 3.50,
  currency: "EUR",
  short_text: "coffee",
  // ... full expense object
}
```

## Implementation Strategy

### 1. Smart Detection System

#### 1.1 Number-Based Detection
Create a regex-based detection system that counts monetary amounts in the input:

```javascript
// Frontend: chatService.js
function detectExpenseType(text) {
  // Match monetary patterns: "10 euros", "$5", "€3.50", etc.
  const moneyRegex = /(?:€|£|\$|¥)?\d+(?:\.\d{2})?(?:\s*(?:euros?|dollars?|pounds?|gbp|usd|eur|jpy))?/gi;
  const matches = text.match(moneyRegex);
  
  if (!matches || matches.length <= 1) {
    return 'single'; // 0 or 1 monetary amount = single expense parser
  } else {
    return 'multiple'; // 2+ monetary amounts = multi-expense parser
  }
}
```

**Examples:**
- Single: "I spent 10 euros in X and Y" → `single`
- Multiple: "I spent 10 euros in X and 3 euros in Y" → `multiple`
- Single: "Bought groceries for €25.50" → `single`  
- Multiple: "€15 for lunch, $20 for taxi, £10 for drinks" → `multiple`

### 2. Multi-Expense Parser Backend

#### 2.1 New Endpoint: `/api/agents/multi_expense_parser/`

```python
# backend/app/agents/multi_expense_parser.py
from typing import List
import asyncio
import concurrent.futures
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate

class MultiExpenseData(BaseModel):
    """Container for multiple expense parsing results"""
    expenses: List[dict]
    total_count: int
    processing_time: float

async def split_multi_expense_text(text: str, user_id: str, db_client) -> List[str]:
    """
    Use GPT-4o-nano to intelligently split multi-expense text into individual expense strings
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    model = ChatOpenAI(
        model="gpt-4o-nano",
        temperature=0.1,
        openai_api_key=api_key
    )
    
    prompt = PromptTemplate(
        template="""
        You are an expense text splitter. Given a text containing multiple expenses, 
        split it into individual expense descriptions that can be parsed separately.
        
        Input: "{text}"
        
        Rules:
        1. Each output line should be a complete, parseable expense description
        2. Include amount, currency, and description for each
        3. Maintain context from the original text where relevant
        4. One expense per line
        5. If only one expense is detected, return just that one line
        
        Examples:
        Input: "I spent €15 for lunch and $20 for taxi"
        Output:
        €15 for lunch
        $20 for taxi
        
        Input: "Bought coffee for €3.50 and pastry for €2.20 at the cafe"  
        Output:
        €3.50 for coffee at the cafe
        €2.20 for pastry at the cafe
        
        Split the following text:
        """,
        input_variables=["text"]
    )
    
    chain = prompt | model
    result = await chain.ainvoke({"text": text})
    
    # Parse the result into individual expense strings
    expense_strings = [line.strip() for line in result.content.split('\n') if line.strip()]
    
    # Fallback: if splitting fails, return original text
    if not expense_strings:
        expense_strings = [text]
    
    return expense_strings

async def parse_multiple_expenses(text: str, user_id: str, db_client) -> dict:
    """
    Parse multiple expenses from text using parallel processing
    """
    start_time = time.time()
    
    try:
        # Step 1: Split the text into individual expense descriptions
        expense_texts = await split_multi_expense_text(text, user_id, db_client)
        
        if len(expense_texts) == 1:
            # Single expense detected, use regular parser
            result = parse_expense(expense_texts[0], user_id, db_client)
            return {
                "expenses": [result] if result else [],
                "total_count": 1 if result else 0,
                "processing_time": time.time() - start_time,
                "original_text": text
            }
        
        # Step 2: Process all expenses in parallel using ThreadPoolExecutor
        expenses = []
        with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
            # Submit all parsing tasks
            future_to_text = {
                executor.submit(parse_expense, expense_text, user_id, db_client): expense_text
                for expense_text in expense_texts
            }
            
            # Collect results as they complete
            for future in concurrent.futures.as_completed(future_to_text):
                expense_text = future_to_text[future]
                try:
                    result = future.result()
                    if result:  # Only add successful parses
                        expenses.append(result)
                except Exception as exc:
                    print(f'Expense parsing failed for "{expense_text}": {exc}')
        
        return {
            "expenses": expenses,
            "total_count": len(expenses),
            "processing_time": time.time() - start_time,
            "original_text": text
        }
        
    except Exception as e:
        print(f"Error in multi-expense parsing: {e}")
        return {
            "expenses": [],
            "total_count": 0,
            "processing_time": time.time() - start_time,
            "original_text": text,
            "error": str(e)
        }
```

#### 2.2 Router Endpoint

```python
# backend/app/agents/router.py - Add new endpoint
@router.post('/multi_expense_parser/')
async def parse_multi_expense(
    query: ExpenseQuery, 
    current_user: dict = Depends(get_current_user)
):
    """
    Parse multiple expenses from text using AI.
    
    Returns a list of expense objects instead of a single one.
    """
    try:
        print(f"Multi-expense parsing request: {query.text}")
        result = await parse_multiple_expenses(query.text, current_user["user_id"], db)
        print(f"Multi-expense result: {result}")
        return result
    except Exception as e:
        print(f"Error in parse_multi_expense: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error parsing expenses: {str(e)}"
        )
```

### 3. Frontend Integration Strategy

#### 3.1 Enhanced Chat Service

```javascript
// frontend/services/chatService.js - Add new methods
export default {
  // ... existing methods

  // Determine if message should use single or multi-expense parsing
  detectExpenseType(text) {
    const moneyRegex = /(?:€|£|\$|¥)?\d+(?:\.\d{2})?(?:\s*(?:euros?|dollars?|pounds?|gbp|usd|eur|jpy))?/gi;
    const matches = text.match(moneyRegex);
    return (!matches || matches.length <= 1) ? 'single' : 'multiple';
  },

  // Parse single expense (existing method)
  async parseExpense(content) {
    // ... existing implementation
  },

  // Parse multiple expenses (new method)
  async parseMultipleExpenses(content) {
    try {
      const request = await createAuthenticatedRequest();
      console.log('Sending multi-expense parser request:', { text: content, save_to_db: true });
      const response = await request.post('/api/agents/multi_expense_parser/', {
        text: content,
        save_to_db: true
      });
      console.log('Multi-expense parser response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error parsing multiple expenses:', error);
      throw error;
    }
  },

  // Smart expense parser that routes to appropriate endpoint
  async parseExpenses(content) {
    const expenseType = this.detectExpenseType(content);
    
    if (expenseType === 'single') {
      const result = await this.parseExpense(content);
      return {
        expenses: result ? [result] : [],
        total_count: result ? 1 : 0,
        type: 'single'
      };
    } else {
      const result = await this.parseMultipleExpenses(content);
      return {
        ...result,
        type: 'multiple'
      };
    }
  }
};
```

#### 3.2 Updated Message Database Structure

**Enhanced MessageCreate Model:**
```python
# backend/app/chat/router.py
class MessageCreate(BaseModel):
    content: str
    message_type: Literal["user", "system"] = "user"
    expense_ids: List[str] = []  # NEW: Array of expense IDs
    expense_count: int = 0       # NEW: Number of expenses
    expense_data: Optional[dict] = None  # NEW: Full expense data for cache

class Message(BaseModel):
    id: str
    content: str
    user_id: str
    timestamp: datetime
    message_type: Literal["user", "system"]
    expense_ids: List[str] = []  # NEW
    expense_count: int = 0       # NEW
    expense_data: Optional[dict] = None  # NEW
```

**Database Message Structure:**
```javascript
// Firestore messages collection
{
  id: "message_id",
  content: "✅ 3 expenses saved: lunch (€15), taxi ($20), coffee (€3.50)",
  user_id: "user_id",
  timestamp: "2025-01-01T10:00:00Z", 
  message_type: "system",
  expense_ids: ["exp_1", "exp_2", "exp_3"],  # NEW
  expense_count: 3,                          # NEW
  expense_data: { /* full expense objects */ } // NEW - for cache
}
```

#### 3.3 Enhanced Chat Component

```javascript
// frontend/pages/chat.js - Updated handleSendMessage
const handleSendMessage = async (e) => {
  e.preventDefault();
  
  if (!inputText.trim() || isProcessingExpense) return;
  
  const messageText = inputText;
  setInputText('');
  
  try {
    // Step 1: Add user message immediately
    const userMessage = {
      id: `user-${Date.now()}`,
      content: messageText,
      message_type: 'user',
      timestamp: new Date().toISOString()
    };
    
    mutate(prevMessages => [...(prevMessages || []), userMessage], false);
    
    // Step 2: Process expenses with smart routing
    setIsProcessingExpense(true);
    
    try {
      const [userResponse, expenseResult] = await Promise.all([
        chatService.sendMessage(messageText, 'user'),
        chatService.parseExpenses(messageText) // NEW: Smart routing method
      ]);
      
      if (expenseResult && expenseResult.expenses.length > 0) {
        console.log('Expenses parsed:', expenseResult);
        
        // Create response message based on expense count
        const responseText = createExpenseResponseText(expenseResult);
        
        const expenseMessage = {
          id: `expense-${Date.now()}`,
          content: responseText,
          message_type: 'system',
          timestamp: new Date().toISOString(),
          expense_ids: expenseResult.expenses.map(exp => exp.id),
          expense_count: expenseResult.total_count,
          expenseData: expenseResult.expenses // Full data for immediate display
        };
        
        // Add to UI
        mutate(prevMessages => [...(prevMessages || []), expenseMessage], false);
        
        // Cache expense data
        setExpenseDataCache(prev => ({
          ...prev,
          [expenseMessage.id]: expenseResult.expenses
        }));
        
        // Send to server (background)
        chatService.sendMessage(
          responseText, 
          'system', 
          {
            expense_ids: expenseResult.expenses.map(exp => exp.id),
            expense_count: expenseResult.total_count,
            expense_data: expenseResult.expenses
          }
        ).catch(err => console.warn('Failed to sync message:', err));
      }
      
    } catch (err) {
      console.error('Failed to parse expenses:', err);
      // Handle error...
    }
    
  } finally {
    setIsProcessingExpense(false);
  }
};

// Helper function to create response text
function createExpenseResponseText(expenseResult) {
  if (expenseResult.total_count === 1) {
    const exp = expenseResult.expenses[0];
    return `✅ Expense saved: ${exp.short_text} - ${getCurrencySymbol(exp.currency)}${exp.amount}`;
  } else {
    const summary = expenseResult.expenses
      .map(exp => `${exp.short_text} (${getCurrencySymbol(exp.currency)}${exp.amount})`)
      .join(', ');
    return `✅ ${expenseResult.total_count} expenses saved: ${summary}`;
  }
}
```

#### 3.4 New Multi-Expense Card Component

```javascript
// frontend/components/MultiExpenseCard.js
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ExpenseCard from './ExpenseCard';

const MultiExpenseCard = ({ expenses, isExpanded: initialExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  
  if (!expenses || expenses.length === 0) return null;
  
  if (expenses.length === 1) {
    // Single expense, show regular card
    return <ExpenseCard expense={expenses[0]} />;
  }
  
  // Calculate totals by currency
  const totals = expenses.reduce((acc, expense) => {
    const currency = expense.currency;
    acc[currency] = (acc[currency] || 0) + parseFloat(expense.amount);
    return acc;
  }, {});
  
  const totalText = Object.entries(totals)
    .map(([currency, amount]) => `${getCurrencySymbol(currency)}${amount.toFixed(2)}`)
    .join(' + ');
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Summary Header */}
      <div 
        className="p-4 bg-gradient-to-r from-[#7B3FE4] to-[#9C6EFF] text-white cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {expenses.length} Expenses
            </h3>
            <p className="text-purple-100 text-sm">
              Total: {totalText}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-2 space-y-2 bg-gray-50">
          {expenses.map((expense, index) => (
            <div key={expense.id || index} className="bg-white rounded-lg">
              <ExpenseCard expense={expense} compact={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiExpenseCard;
```

#### 3.5 Updated ExpenseMessage Component

```javascript
// frontend/pages/chat.js - Updated ExpenseMessage component
const ExpenseMessage = memo(({ message, onDelete }) => {
  const { parseExpenseData, expenseDataCache, expenses } = useContext(MessageContext);
  
  const expenseData = useMemo(() => {
    // Check cache first
    if (expenseDataCache && expenseDataCache[message.id]) {
      return expenseDataCache[message.id];
    }
    
    // Check direct message data
    if (message.expenseData) {
      return Array.isArray(message.expenseData) ? message.expenseData : [message.expenseData];
    }
    
    // Legacy fallback for single expenses
    if (message.expense_ids && message.expense_ids.length > 0) {
      // Try to match with API data
      const matchedExpenses = message.expense_ids
        .map(id => expenses?.find(exp => exp.id === id))
        .filter(Boolean);
      
      if (matchedExpenses.length > 0) {
        return matchedExpenses;
      }
    }
    
    // Parse from message content as last resort
    return parseExpenseData ? [parseExpenseData(message.content)] : null;
  }, [message, expenseDataCache, expenses, parseExpenseData]);
  
  if (!expenseData || expenseData.length === 0) {
    return (
      <div className="flex justify-start mb-4">
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg max-w-[85%] whitespace-pre-wrap">
          {message.content}
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[85%]">
        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg mb-2 text-sm">
          {message.content}
        </div>
        <MultiExpenseCard 
          expenses={expenseData} 
          isExpanded={expenseData.length <= 3} // Auto-expand for small lists
        />
      </div>
    </div>
  );
});
```

## Migration Strategy

### Phase 1: Backend Implementation (1-2 days)
1. Create `multi_expense_parser.py` with splitting and parallel processing
2. Add new endpoint to agents router
3. Enhance chat message models to support multiple expenses
4. Update chat router to handle new message structure

### Phase 2: Frontend Core (1 day) 
1. Add detection logic to chatService
2. Create smart routing method `parseExpenses()`
3. Update `handleSendMessage` to use new structure
4. Modify message caching for multiple expenses

### Phase 3: UI Components (1 day)
1. Create `MultiExpenseCard` component
2. Update `ExpenseMessage` component
3. Add expand/collapse functionality
4. Handle summary display and totals

### Phase 4: Testing & Optimization (0.5 days)
1. Test single expense backward compatibility
2. Test multi-expense parsing accuracy
3. Performance optimization
4. Error handling and edge cases

## Backward Compatibility

- **Single Expenses**: Automatically detected and routed to existing parser
- **Legacy Messages**: Existing messages display correctly with fallback parsing
- **API Responses**: Single expenses wrapped in array format for consistency
- **Database**: New fields are optional, existing messages unaffected

## Performance Considerations

- **Smart Detection**: Regex-based pre-processing to avoid unnecessary API calls
- **Parallel Processing**: ThreadPoolExecutor for concurrent expense parsing
- **Caching**: Frontend caching prevents re-parsing on render
- **Rate Limiting**: Maximum 5 concurrent expense parsing requests
- **Fallback**: Graceful degradation when parsing fails

## Expected Performance

| Scenario | Processing Time | API Calls |
|----------|----------------|-----------|
| Single Expense | < 1s | 1 call |
| 2-3 Expenses | < 2s | 1 split + 2-3 parallel |
| 5-10 Expenses | < 3s | 1 split + 5-10 parallel |
| Receipt (20+ items) | < 5s | 1 split + parallel batch |

## Future Extensions

This architecture supports:
- **Receipt OCR**: Upload image → extract text → multi-expense parser
- **Expense Analysis**: Additional AI tools for budgeting and insights  
- **Smart Categorization**: Improved tag assignment across multiple expenses
- **Bulk Operations**: Edit, delete, or categorize multiple expenses at once

## Implementation Checklist

### Backend Tasks
- [x] Create `multi_expense_parser.py`
- [x] Add text splitting with GPT-4o-nano
- [x] Implement parallel processing with ThreadPoolExecutor
- [x] Add new router endpoint `/api/agents/multi_expense_parser/`
- [x] Enhance chat message models (expense_ids, expense_count, expense_data)
- [x] Update chat router to handle new structure

### Frontend Tasks  
- [x] Add `detectExpenseType()` to chatService
- [x] Create `parseMultipleExpenses()` method
- [x] Add smart routing `parseExpenses()` method
- [x] Update `handleSendMessage()` for new flow
- [x] Create `MultiExpenseCard` component
- [x] Update `ExpenseMessage` component
- [x] Enhance expense caching for arrays
- [x] Add expand/collapse UI functionality

### Testing Tasks
- [ ] Test number detection regex with various inputs
- [ ] Verify single expense backward compatibility  
- [ ] Test multi-expense parsing accuracy
- [ ] Performance testing with 10+ expenses
- [ ] Error handling and edge cases
- [ ] UI responsiveness and accessibility

## Risk Mitigation

1. **Parsing Accuracy**: Use same model (GPT-4o-nano) for splitting and parsing
2. **Performance**: Parallel processing + rate limiting + smart detection
3. **UI Complexity**: Progressive disclosure with expand/collapse
4. **Backward Compatibility**: Fallback systems at every level
5. **Error Handling**: Graceful degradation to basic text messages

This implementation provides a robust, scalable foundation for multi-expense parsing while maintaining the accuracy and performance of the current single-expense system.
