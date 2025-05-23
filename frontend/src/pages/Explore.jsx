import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Explore() {
  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTools, setFilteredTools] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [pricingFilters, setPricingFilters] = useState([]);

  const categories = [
    'Text Generation', 'Image Generation', 'Voice Generation', 
    'Video Generation', 'Code Generation'
  ];

  const pricingOptions = ['Free', 'Freemium', 'Premium', 'Free Trial', 'Pay Per Use'];

  const fetchTools = async () => {
    try {
      const response = await axios.get('/api/tool');
      setTools(response.data.data);
      console.log('Fetched tools:', response.data.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const filterTools = () => {
    let filtered = tools;

    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'i');
      filtered = filtered.filter(tool =>
        regex.test(tool.title) || 
        tool.hashtags.some(tag => regex.test(tag)) || 
        tool.keyWords.some(keyword => regex.test(keyword))
      );
    }

    if (categoryFilters.length > 0) {
      filtered = filtered.filter(tool => 
        categoryFilters.some(category =>
          tool.keyWords.includes(category) || tool.hashtags.includes(category)
        )
      );
    }

    if (pricingFilters.length > 0) {
      filtered = filtered.filter(tool => 
        pricingFilters.includes(tool.pricing)
      );
    }

    setFilteredTools(filtered);
  };

  const handleCategoryChange = (category) => {
    setCategoryFilters(prevFilters => {
      if (prevFilters.includes(category)) {
        return prevFilters.filter(item => item !== category);
      } else {
        return [...prevFilters, category];
      }
    });
  };

  const handlePricingChange = (pricing) => {
    setPricingFilters(prevFilters => {
      if (prevFilters.includes(pricing)) {
        return prevFilters.filter(item => item !== pricing);
      } else {
        return [...prevFilters, pricing];
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    filterTools();
  };

  useEffect(() => {
    fetchTools();
  }, []);

  useEffect(() => {
    filterTools();
  }, [searchQuery, categoryFilters, pricingFilters, tools]);

  return (
    <div style={{marginTop: '5rem', padding: '2rem'}}>
      <div>
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>

      <div>
        <h3>Categories</h3>
        {categories.map(category => (
          <label key={category}>
            <input
              type="checkbox"
              checked={categoryFilters.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <div>
        <h3>Pricing</h3>
        {pricingOptions.map(option => (
          <label key={option}>
            <input
              type="checkbox"
              checked={pricingFilters.includes(option)}
              onChange={() => handlePricingChange(option)}
            />
            {option}
          </label>
        ))}
      </div>

      <div>
        <h3>Latest Tools</h3>
        {filteredTools.slice(0, 12).map(tool => (
          <div key={tool._id}>
            <h4>{tool.title}</h4>
            <p>{tool.description}</p>
            <div>
              <strong>Hashtags:</strong> {tool.hashtags.join(', ')}
            </div>
            <div>
              <strong>Keywords:</strong> {tool.keyWords.join(', ')}
            </div>
            <div>
              <strong>Pricing:</strong> {tool.pricing}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
