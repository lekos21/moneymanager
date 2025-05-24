# Expense Edit Dialog Implementation Strategy

## Implementation Status

✅ **COMPLETED**

- Created main ExpenseEditDialog component with form fields and animations
- Implemented TagSelector with search functionality and visual feedback
- Added EditDialogSkeleton for loading states
- Updated ExpenseCard to integrate with the dialog
- Added necessary CSS styles for the dialog components
- Set up lazy loading for better performance

## Overview
This document outlines a comprehensive strategy for implementing an expense edit dialog that appears when tapping an ExpenseCard. The implementation will be coherent with the existing MoneyManager design system and provide a seamless UX for editing expenses.

## Architecture Overview

### Component Structure
```
ExpenseEditDialog/
├── ExpenseEditDialog.js        # Main dialog component
├── TagSelector.js              # Tag selection component with search
├── TagChip.js                  # Individual tag display component
└── EditDialogSkeleton.js       # Loading state component
```

## UI/UX Design Specifications

### 1. Dialog Appearance & Animation
```javascript
// Dialog will use a sliding panel from bottom on mobile, modal on desktop
const dialogStyles = {
  mobile: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '90vh',
    borderTopLeftRadius: 'var(--radius-xl)',
    borderTopRightRadius: 'var(--radius-xl)',
    animation: 'slideUp 300ms ease-out'
  },
  desktop: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    maxWidth: '90vw',
    maxHeight: '85vh',
    borderRadius: 'var(--radius-xl)',
    animation: 'fadeInScale 250ms ease-out'
  }
}
```

### 2. Dialog Layout Structure
```jsx
<ExpenseEditDialog>
  {/* Header with gradient background */}
  <DialogHeader className="bg-gradient-primary">
    <h2>Edit Expense</h2>
    <button onClick={onClose}>
      <X className="w-5 h-5" />
    </button>
  </DialogHeader>

  {/* Main form content */}
  <DialogBody>
    {/* Amount and Currency Section */}
    <AmountSection>
      <AmountInput />
      <CurrencySelector />
    </AmountSection>

    {/* Short Description */}
    <InputGroup>
      <Label>Quick Description</Label>
      <Input placeholder="e.g., Coffee at Starbucks" />
    </InputGroup>

    {/* Full Message */}
    <InputGroup>
      <Label>Full Details (Optional)</Label>
      <TextArea placeholder="Add any additional notes..." />
    </InputGroup>

    {/* Tag Selection Section */}
    <TagSection>
      <Label>Categories & Tags</Label>
      <TagSelector />
    </TagSection>

    {/* Date/Time Section */}
    <DateTimeSection>
      <DatePicker />
      <TimePicker />
    </DateTimeSection>
  </DialogBody>

  {/* Action Buttons */}
  <DialogFooter>
    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
    <Button variant="primary" onClick={onSave}>Save Changes</Button>
  </DialogFooter>
</ExpenseEditDialog>
```

## Key Components Implementation

### 1. ExpenseEditDialog Component
```javascript
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import TagSelector from './TagSelector';
import expenseService from '../services/expenseService';
import { useExpenses } from '../hooks/useExpenses';
import { getCurrencySymbol } from '../utils/formatters';

export default function ExpenseEditDialog({ expense, isOpen, onClose }) {
  const { mutate: refreshExpenses } = useExpenses();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: expense?.amount || 0,
    currency: expense?.currency || 'USD',
    short_text: expense?.short_text || '',
    raw_text: expense?.raw_text || '',
    area_tags: expense?.area_tags || [],
    context_tags: expense?.context_tags || [],
    timestamp: expense?.timestamp || new Date().toISOString()
  });

  // Smooth backdrop blur effect
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: 'blur(0px)' },
    visible: { opacity: 1, backdropFilter: 'blur(8px)' }
  };

  // Dialog animation variants
  const dialogVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await expenseService.updateExpense(expense.id, formData);
      refreshExpenses();
      onClose();
    } catch (error) {
      console.error('Failed to update expense:', error);
      // Show error notification
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-[var(--z-index-modal-backdrop)]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 
                       md:-translate-x-1/2 md:-translate-y-1/2 
                       bg-white rounded-2xl shadow-2xl 
                       z-[var(--z-index-modal)] 
                       max-w-2xl w-full max-h-[85vh] 
                       flex flex-col"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Dialog content implementation */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

### 2. TagSelector Component
```javascript
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useTags } from '../hooks/useTags';
import TagIcon from './TagIcon';

export default function TagSelector({ 
  selectedAreaTags = [], 
  selectedContextTags = [],
  onTagsChange 
}) {
  const { allTags } = useTags();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('area'); // 'area' or 'context'

  // Filter and group tags
  const filteredTags = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allTags.filter(tag => 
      tag.id.toLowerCase().includes(query) ||
      tag.label.toLowerCase().includes(query) ||
      tag.synonyms?.some(syn => syn.toLowerCase().includes(query))
    );
  }, [allTags, searchQuery]);

  const areaTags = filteredTags.filter(tag => tag.facet === 'area');
  const contextTags = filteredTags.filter(tag => tag.facet === 'context');

  const handleTagToggle = (tag) => {
    if (tag.facet === 'area') {
      const newTags = selectedAreaTags.includes(tag.id)
        ? selectedAreaTags.filter(id => id !== tag.id)
        : [...selectedAreaTags, tag.id];
      onTagsChange({ area_tags: newTags, context_tags: selectedContextTags });
    } else {
      const newTags = selectedContextTags.includes(tag.id)
        ? selectedContextTags.filter(id => id !== tag.id)
        : [...selectedContextTags, tag.id];
      onTagsChange({ area_tags: selectedAreaTags, context_tags: newTags });
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tags..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 
                     rounded-xl focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Tab Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setActiveTab('area')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all
                     ${activeTab === 'area' 
                       ? 'bg-white text-purple-600 shadow-sm' 
                       : 'text-gray-600 hover:text-gray-800'}`}
        >
          Categories ({areaTags.length})
        </button>
        <button
          onClick={() => setActiveTab('context')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition-all
                     ${activeTab === 'context' 
                       ? 'bg-white text-purple-600 shadow-sm' 
                       : 'text-gray-600 hover:text-gray-800'}`}
        >
          Context ({contextTags.length})
        </button>
      </div>

      {/* Selected Tags */}
      {(selectedAreaTags.length > 0 || selectedContextTags.length > 0) && (
        <div className="p-3 bg-purple-50 rounded-xl">
          <p className="text-xs text-purple-600 font-medium mb-2">Selected Tags</p>
          <div className="flex flex-wrap gap-2">
            {selectedAreaTags.map(tagId => {
              const tag = allTags.find(t => t.id === tagId);
              return tag && <SelectedTagChip key={tagId} tag={tag} onRemove={() => handleTagToggle(tag)} />;
            })}
            {selectedContextTags.map(tagId => {
              const tag = allTags.find(t => t.id === tagId);
              return tag && <SelectedTagChip key={tagId} tag={tag} onRemove={() => handleTagToggle(tag)} />;
            })}
          </div>
        </div>
      )}

      {/* Tag Grid */}
      <div className="max-h-64 overflow-y-auto rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
          {(activeTab === 'area' ? areaTags : contextTags).map(tag => (
            <TagOption 
              key={tag.id} 
              tag={tag} 
              isSelected={
                activeTab === 'area' 
                  ? selectedAreaTags.includes(tag.id)
                  : selectedContextTags.includes(tag.id)
              }
              onClick={() => handleTagToggle(tag)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Tag Option Component
function TagOption({ tag, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-3 rounded-xl 
                  border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
    >
      <div 
        className="w-8 h-8 rounded-full flex items-center justify-center"
        style={{ backgroundColor: tag.colors?.bgHex || '#f3f4f6' }}
      >
        <TagIcon 
          iconName={tag.icon}
          iconColor={tag.colors?.hex || '#6b7280'}
          size="sm"
        />
      </div>
      <span 
        className="text-sm font-medium truncate"
        style={{ color: isSelected ? '#7B3FE4' : '#374151' }}
      >
        {tag.label}
      </span>
    </button>
  );
}

// Selected Tag Chip Component
function SelectedTagChip({ tag, onRemove }) {
  return (
    <div 
      className="inline-flex items-center gap-1.5 px-3 py-1.5 
                 rounded-full text-sm font-medium"
      style={{ 
        backgroundColor: tag.colors?.bgHex || '#f3f4f6',
        color: tag.colors?.textHex || '#4b5563'
      }}
    >
      <TagIcon 
        iconName={tag.icon}
        iconColor={tag.colors?.hex || '#6b7280'}
        size="xs"
      />
      <span>{tag.label}</span>
      <button 
        onClick={onRemove}
        className="ml-1 hover:opacity-70 transition-opacity"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
```

### 3. Form Input Styling
```css
/* Add to globals.css */
.input-group {
  @apply space-y-2;
}

.input-label {
  @apply text-sm font-medium text-gray-700;
}

.input-field {
  @apply w-full px-4 py-3 border border-gray-200 rounded-xl
         focus:outline-none focus:ring-2 focus:ring-purple-500 
         focus:border-transparent transition-all duration-200
         text-gray-900 placeholder-gray-400;
}

.input-field:hover {
  @apply border-gray-300;
}

/* Amount input special styling */
.amount-input {
  @apply text-2xl font-semibold text-center;
  font-family: 'Lexend', monospace;
}

/* Textarea styling */
.textarea-field {
  @apply input-field resize-none;
  min-height: 100px;
}
```

## Implementation Steps

### Step 1: Create the Dialog Component 
1. Create `ExpenseEditDialog.js` with proper animations
2. Implement form state management with `useState`
3. Add validation for required fields
4. Integrate with `expenseService.updateExpense()`

### Step 2: Implement Tag Selector 
1. Create `TagSelector.js` with search functionality
2. Add tab navigation for area/context tags
3. Implement visual feedback for selected tags
4. Ensure smooth animations for tag selection

### Step 3: Update ExpenseCard 
```javascript
// In ExpenseCard.js
const ExpenseCard = ({ expense, onEdit, ... }) => {
  const handleCardClick = (e) => {
    // Prevent triggering edit when clicking delete button
    if (e.target.closest('.delete-button')) return;
    onEdit(expense);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="card cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Existing card content */}
    </div>
  );
};
```

### Step 4: Integrate in Parent Components 
```javascript
// In home.js, history.js, etc.
const [editingExpense, setEditingExpense] = useState(null);

return (
  <>
    {/* Existing content */}
    {expenses.map(expense => (
      <ExpenseCard 
        key={expense.id}
        expense={expense}
        onEdit={setEditingExpense}
        // ... other props
      />
    ))}

    <ExpenseEditDialog
      expense={editingExpense}
      isOpen={!!editingExpense}
      onClose={() => setEditingExpense(null)}
    />
  </>
);
```

## Accessibility Considerations

1. **Focus Management**
   - Trap focus within dialog when open
   - Return focus to trigger element on close
   - Implement proper tab order

2. **Keyboard Navigation**
   - ESC key to close dialog
   - Tab/Shift+Tab for navigation
   - Enter to submit, Space to select tags

3. **Screen Reader Support**
   - Proper ARIA labels and roles
   - Announce dialog open/close
   - Describe form validation errors

## Performance Optimizations

1. **Lazy Loading**
   ```javascript
   const ExpenseEditDialog = dynamic(
     () => import('../components/ExpenseEditDialog'),
     { loading: () => <EditDialogSkeleton /> }
   );
   ```

2. **Debounced Search**
   ```javascript
   const debouncedSearch = useMemo(
     () => debounce(setSearchQuery, 300),
     []
   );
   ```

3. **Memoized Tag Filtering**
   - Use `useMemo` for expensive tag filtering operations
   - Cache tag data with SWR

## Mobile-Specific Enhancements

1. **Bottom Sheet Pattern**
   - Slide-up animation from bottom
   - Drag-to-dismiss gesture
   - Proper safe area handling

2. **Touch Optimizations**
   - Larger touch targets (minimum 44px)
   - Haptic feedback on actions
   - Smooth scrolling for tag selection

## Expected User Flow

1. User taps on ExpenseCard
2. Dialog slides up/fades in with smooth animation
3. Current expense data pre-populated
4. User can:
   - Adjust amount with large, easy-to-tap buttons
   - Edit description inline
   - Search and select tags with visual feedback
   - Change date/time if needed
5. Save button shows loading state during API call
6. Dialog closes with success animation
7. ExpenseCard updates in real-time without page refresh

## Success Metrics

- **Performance**: Dialog opens in <200ms
- **Usability**: Tag selection completed in <3 taps
- **Accessibility**: Full keyboard navigation support
- **Visual**: Smooth 60fps animations
- **Error Handling**: Clear error messages with recovery options

This implementation will create a delightful, efficient, and accessible expense editing experience that's perfectly aligned with the MoneyManager design system.
