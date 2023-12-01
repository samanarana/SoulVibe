import React, { useState, useEffect } from 'react';
import ResourceCard from './ResourceCard';
import './ResourcePage.css'

function ResourcePage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch('/api/resources')
      .then(response => response.json())
      .then(data => setResources(data))
      .catch(error => console.error('Error fetching resources:', error));
  }, []);

  return (
    <div className="page-container">
      <div className="resource-list">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
};

export default ResourcePage;
