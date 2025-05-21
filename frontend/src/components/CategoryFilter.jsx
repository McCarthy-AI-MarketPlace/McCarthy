import React, { useState } from 'react';

const categories = [
  { name: 'All', count: null },
  { name: 'Text Generation', count: 156 },
  { name: 'Image Generation', count: 87 },
  { name: 'Voice Generation', count: 42 },
  { name: 'Video Generation', count: 35 },
  { name: 'Code Generation', count: 28 },
  { name: 'Data Analysis', count: 63 },
];

export default function CategoryFilter({ onCategorySelect }) {
  const [selected, setSelected] = useState('All');

  const backgroundColor = '#a682c6';

  const handleSelect = (category) => {
    setSelected(category.name);
    if (onCategorySelect) {
      onCategorySelect(category.name);
    }
  };

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
          const isSelected = selected === category.name;
          return (
            <button
              key={category.name}
              onClick={() => handleSelect(category)}
              style={{
                cursor: 'pointer',
                padding: '10px 20px',
                borderRadius: '20px',
                border: isSelected ? 'none' : '1px solid #ccc',
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
              <span>{category.name}</span>
              {category.count !== null && (
                <span style={{ opacity: 0.7 }}>({category.count})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
