import React, { useState, useEffect } from 'react';
import { tools as toolsData } from '../data/Tools';

export default function CategoryFilter({ onCategorySelect, selectedCategory }) {
  const [selected, setSelected] = useState(selectedCategory || 'All');
  const [categoryCounts, setCategoryCounts] = useState({});

  const backgroundColor = '#a682c6';

  useEffect(() => {
    const counts = toolsData.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1;
      return acc;
    }, {});
    const totalCount = toolsData.length;
    setCategoryCounts({ All: totalCount, ...counts });
  }, []);

  useEffect(() => {
    setSelected(selectedCategory);
  }, [selectedCategory]);

  const handleSelect = (categoryName) => {
    setSelected(categoryName);
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  };

  const categories = [
    'All',
    'Text Generation',
    'Image Generation',
    'Voice Generation',
    'Video Generation',
    'Code Generation',
    'Data Analysis',
  ];

  return (
    <div
      style={{
        width: '100%',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        paddingBottom: '10px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          gap: '12px',
        }}
      >
        {categories.map((category) => {
          const isSelected = selected === category;
          return (
            <button
              key={category}
              onClick={() => handleSelect(category)}
              style={{
                cursor: 'pointer',
                padding: '10px 20px',
                borderRadius: '20px',
                border: 'none',
                backgroundColor: isSelected ? backgroundColor : '#f0f0f0',
                color: isSelected ? '#fff' : '#000',
                fontWeight: isSelected ? '600' : '400',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease',
                boxShadow: isSelected
                  ? '0 4px 10px rgba(166, 130, 198, 0.3)'
                  : '0 1px 4px rgba(0, 0, 0, 0.05)',
                whiteSpace: 'nowrap',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e0e0e0';
                e.currentTarget.style.color = '#000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isSelected
                  ? backgroundColor
                  : '#f0f0f0';
                e.currentTarget.style.color = isSelected ? '#fff' : '#000';
              }}
            >
              <span>{category}</span>
              {categoryCounts[category] !== undefined && (
                <span style={{ opacity: 0.7 }}>({categoryCounts[category]})</span>
              )}
              {isSelected && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-4px',
                    left: '20%',
                    right: '20%',
                    height: '3px',
                    backgroundColor: '#fff',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease',
                  }}
                ></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}