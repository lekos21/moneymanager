import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { useTags } from '../../contexts/TagsContext';
import TagIcon from '../TagIcon';

export default function TagSelector({ 
  selectedAreaTags = [], 
  selectedContextTags = [],
  onTagsChange,
  showAllTags = false
}) {
  const { tags } = useTags();
  const [searchQuery, setSearchQuery] = useState('');
  // If showAllTags is true, we don't use tabs
  const [activeTab, setActiveTab] = useState('area'); // 'area' or 'context'

  // Filter and group tags
  const filteredTags = useMemo(() => {
    if (!tags || tags.length === 0) return [];
    
    const query = searchQuery.toLowerCase();
    return tags.filter(tag => 
      tag.tag_id?.toLowerCase().includes(query) ||
      tag.label?.toLowerCase().includes(query) ||
      tag.synonyms?.some(syn => syn.toLowerCase().includes(query))
    );
  }, [tags, searchQuery]);

  // All available tags to display
  const tagsToDisplay = useMemo(() => {
    if (showAllTags) return filteredTags;
    return filteredTags.filter(tag => tag.facet === activeTab);
  }, [filteredTags, showAllTags, activeTab]);

  const handleTagToggle = (tag) => {
    if (tag.facet === 'area') {
      const newTags = selectedAreaTags.includes(tag.tag_id)
        ? selectedAreaTags.filter(id => id !== tag.tag_id)
        : [...selectedAreaTags, tag.tag_id];
      onTagsChange({ area_tags: newTags, context_tags: selectedContextTags });
    } else {
      const newTags = selectedContextTags.includes(tag.tag_id)
        ? selectedContextTags.filter(id => id !== tag.tag_id)
        : [...selectedContextTags, tag.tag_id];
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
          className="w-full pl-10 pr-4 py-2 border border-gray-200 
                     rounded-lg focus:outline-none focus:ring-2 
                     focus:ring-purple-500 focus:border-transparent
                     transition-all duration-200"
        />
      </div>

      {/* Tab Selector - only shown if not showing all tags */}
      {!showAllTags && (
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('area')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all
                      ${activeTab === 'area' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'}`}
          >
            Categories
          </button>
          <button
            onClick={() => setActiveTab('context')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all
                      ${activeTab === 'context' 
                        ? 'bg-white text-purple-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'}`}
          >
            Context
          </button>
        </div>
      )}

      {/* Selected Tags */}
      {(selectedAreaTags.length > 0 || selectedContextTags.length > 0) && (
        <div className="p-3 bg-purple-50 rounded-lg">
          <p className="text-xs text-purple-600 font-medium mb-2">Selected Tags</p>
          <div className="flex flex-wrap gap-2">
            {selectedAreaTags.map(tagId => {
              const tag = tags.find(t => t.tag_id === tagId);
              return tag && <SelectedTagChip key={tagId} tag={tag} onRemove={() => handleTagToggle(tag)} />;
            })}
            {selectedContextTags.map(tagId => {
              const tag = tags.find(t => t.tag_id === tagId);
              return tag && <SelectedTagChip key={tagId} tag={tag} onRemove={() => handleTagToggle(tag)} />;
            })}
          </div>
        </div>
      )}

      {/* Tag Grid */}
      <div className="max-h-64 overflow-y-auto rounded-lg border border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3">
          {tagsToDisplay.map(tag => (
            <TagOption 
              key={tag.tag_id} 
              tag={tag} 
              isSelected={
                tag.facet === 'area'
                  ? selectedAreaTags.includes(tag.tag_id)
                  : selectedContextTags.includes(tag.tag_id)
              }
              onClick={() => handleTagToggle(tag)}
            />
          ))}
          
          {/* Empty state */}
          {tagsToDisplay.length === 0 && (
            <div className="col-span-2 sm:col-span-3 py-8 text-center text-gray-500">
              {searchQuery 
                ? `No tags found for "${searchQuery}"`
                : `No tags available`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Tag Option Component
function TagOption({ tag, isSelected, onClick }) {
  // Ensure tag colors have good contrast
  const bgColor = tag.colors?.bgHex || '#f3f4f6';
  const textColor = tag.colors?.textHex || '#374151';
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded-lg 
                  border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300 bg-white'}`}
    >
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{ backgroundColor: bgColor }}
      >
        <TagIcon 
          iconName={tag.icon || 'tag'}
          iconColor={tag.colors?.hex || '#6b7280'}
          size="sm"
        />
      </div>
      <span 
        className="text-sm font-medium truncate"
        style={{ color: isSelected ? 'var(--color-purple-600)' : textColor }}
      >
        {tag.label || tag.tag_id}
      </span>
    </button>
  );
}

// Selected Tag Chip Component
function SelectedTagChip({ tag, onRemove }) {
  // Ensure tag colors have good contrast
  const bgColor = tag.colors?.bgHex || '#f3f4f6';
  const textColor = '#333'; // Force dark text for readability
  
  return (
    <div 
      className="inline-flex items-center gap-1.5 px-3 py-1.5 
                 rounded-full text-sm font-medium"
      style={{ 
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      <TagIcon 
        iconName={tag.icon || 'tag'}
        iconColor={tag.colors?.hex || '#6b7280'}
        size="xs"
      />
      <span>{tag.label || tag.tag_id}</span>
      <button 
        onClick={onRemove}
        className="ml-1 hover:opacity-70 transition-opacity"
        aria-label={`Remove ${tag.label || tag.tag_id} tag`}
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
}
