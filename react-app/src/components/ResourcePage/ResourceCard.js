import React from 'react';
import { useHistory } from 'react-router-dom';
import './ResourceCard.css'

function ResourceCard({ resource }) {
    const history = useHistory();

    const handleReadMore = () => {
      if (resource.type === 'internal') {
        // Navigate to the blog post page
        history.push(`/resources/blog/${resource.id}`);
      } else {
        // Open external linkS
        window.open(resource.link, '_blank');
      }
    };

  return (
    <div className="resource-card">
      <p className="resource-name">{resource.name}</p>
      <p className="resource-description">{resource.description}</p>
      {resource.type === 'internal' && <p className="resource-excerpt">{resource.excerpt}</p>}
      <button onClick={handleReadMore}>READ MORE</button>
    </div>
  );
}

export default ResourceCard;
