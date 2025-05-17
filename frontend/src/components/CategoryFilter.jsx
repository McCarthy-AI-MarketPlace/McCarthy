import React, { useState } from 'react';

const categories = [
  { name: 'All', count: null },
  { name: 'Text Generation', count: 156 },
  { name: 'Image Generation', count: 87 },
  { name: 'Voice Generation', count: 42 },
  { name: 'Video Generation', count: 35 },
  { name: 'Code Generation', count: 28 },
  { name: 'Data Analysis', count: 63 }
];

export default function CategoryFilter({ onCategorySelect }) {
  const [selected, setSelected] = useState('All');

  // Set this to your page's background color:
  const backgroundColor = '#a682c6'; // your purple color from screenshot

  const handleSelect = (category) => {
    setSelected(category.name);
    if (onCategorySelect) {
      onCategorySelect(category.name);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
      {categories.map((category) => {
        const isSelected = selected === category.name;
        return (
          <button
            key={category.name}
            onClick={() => handleSelect(category)}
            style={{
              cursor: 'pointer',
              padding: '8px 18px',
              borderRadius: '20px',
              border: isSelected ? 'none' : '1px solid #ccc',
              backgroundColor: isSelected ? backgroundColor : '#f0f0f0', // light grey unselected
              color: '#000',
              fontWeight: isSelected ? '600' : '400',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.9rem',
              transition: 'background-color 0.3s, color 0.3s',
            }}
          >
            <span>{category.name}</span>
            {category.count !== null && (
              <span style={{ opacity: 0.7 }}>
                ({category.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
