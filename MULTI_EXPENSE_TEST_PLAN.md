# Multi-Expense Parser Test Plan

## Phase 3: Testing & Refinement

### Browser Preview
🌐 **Application URL**: http://127.0.0.1:44487
📱 **Test Environment**: MoneyManager Chat Interface

---

## Test Categories

### 1. **Backward Compatibility Tests** ✅
Test that existing single expense functionality works unchanged.

#### Single Expense Test Cases:
- [ ] **Basic Single**: "Bought coffee for $5"
- [ ] **Currency Variations**: "Spent €15 for lunch" 
- [ ] **Complex Single**: "Bought groceries and household items for $45.50"
- [ ] **No Amount**: "Had lunch" (should not parse)
- [ ] **Different Formats**: "5 dollars on coffee"

**Expected Behavior**: Should route to existing single expense parser and display ExpenseCard.

---

### 2. **Multi-Expense Detection Tests** 🔍

#### Multiple Expense Test Cases:
- [ ] **Clear Multiple**: "$10 for coffee, $15 for lunch, $20 for dinner"
- [ ] **Mixed Currency**: "€15 for lunch, $20 for taxi, £10 for drinks"
- [ ] **Different Formats**: "Spent 10 euros on coffee and 5 dollars on snacks"
- [ ] **Receipt Style**: "Breakfast: $12, Gas: $45, Parking: $8"
- [ ] **Complex**: "Morning coffee was $4.50, then lunch at $18.75, and evening taxi for $12"

**Expected Behavior**: Should route to multi-expense parser and display MultiExpenseCard.

---

### 3. **Edge Cases** ⚠️

#### Boundary Test Cases:
- [ ] **Single with Conjunctions**: "Coffee and tea for $8" (should be single)
- [ ] **List without Amounts**: "Coffee, tea, and bagel for $15" (should be single)
- [ ] **Ambiguous**: "Lunch $15 and drinks" (should be single)
- [ ] **Empty Message**: "" (should not parse)
- [ ] **Non-Expense**: "How are you?" (should not parse)

---

### 4. **Performance Tests** ⚡

#### Load Testing:
- [ ] **Single Expense Response Time**: < 1 second
- [ ] **3 Expenses Response Time**: < 2 seconds
- [ ] **5 Expenses Response Time**: < 3 seconds
- [ ] **10+ Expenses**: Should handle gracefully
- [ ] **Concurrent Requests**: Multiple users testing simultaneously

---

### 5. **UI/UX Tests** 🎨

#### MultiExpenseCard Tests:
- [ ] **Expand/Collapse**: Click to expand all expenses
- [ ] **Individual Cards**: Each expense shows proper ExpenseCard styling
- [ ] **Summary Display**: Shows total count and amount
- [ ] **Loading Animation**: Shows during processing
- [ ] **Error Handling**: Displays errors gracefully
- [ ] **Mobile Responsive**: Works on different screen sizes

#### Chat Integration Tests:
- [ ] **Message Flow**: User message → Loading → Result message
- [ ] **Cache Management**: Expenses persist after page refresh
- [ ] **Error Recovery**: Failed parsing doesn't break chat
- [ ] **Delete Functionality**: Can delete individual expenses

---

## Test Execution Steps

### Step 1: Login & Setup
1. Navigate to http://127.0.0.1:44487
2. Log in with test credentials
3. Navigate to chat interface
4. Ensure chat is working for basic messages

### Step 2: Single Expense Tests
Run each single expense test case and verify:
- ✅ Routes to single expense parser
- ✅ Displays single ExpenseCard
- ✅ Shows correct expense data
- ✅ Expense is saved to database

### Step 3: Multi-Expense Tests  
Run each multi-expense test case and verify:
- ✅ Routes to multi-expense parser
- ✅ Displays MultiExpenseCard
- ✅ Shows correct expense count
- ✅ All expenses are individually accessible
- ✅ All expenses are saved to database

### Step 4: Performance Monitoring
- Monitor browser console for errors
- Check response times in Network tab
- Verify memory usage doesn't spike
- Test with multiple concurrent sessions

### Step 5: Error Scenarios
- Test with invalid OpenAI API key
- Test with backend offline
- Test with malformed responses
- Verify graceful error handling

---

## Success Criteria

### ✅ **Functional Requirements**
- [ ] Single expenses work exactly as before
- [ ] Multiple expenses are detected and parsed correctly
- [ ] All expense types display properly in chat
- [ ] Database saves all expenses correctly
- [ ] Delete functionality works for all scenarios

### ✅ **Performance Requirements**
- [ ] Single expense: < 1 second response
- [ ] Multiple expenses: < 2 seconds for up to 5 expenses
- [ ] No memory leaks during extended use
- [ ] UI remains responsive during processing

### ✅ **UX Requirements**
- [ ] Clear visual distinction between single/multi expenses
- [ ] Intuitive expand/collapse for multiple expenses
- [ ] Proper loading states and error messages
- [ ] Consistent styling with existing components

---

## Issues & Refinements Log

### Issues Found:
- [ ] Issue 1: Description
- [ ] Issue 2: Description

### Refinements Made:
- [ ] Refinement 1: Description
- [ ] Refinement 2: Description

---

## Next Steps (Phase 4)
After successful testing:
1. **Receipt OCR Integration**: Upload receipt images
2. **Expense Analysis**: AI-powered insights and categorization
3. **Batch Operations**: Edit/delete multiple expenses
4. **Performance Optimization**: Caching and rate limiting improvements
