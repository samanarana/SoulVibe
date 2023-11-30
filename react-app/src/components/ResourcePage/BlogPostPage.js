import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './BlogPost.css'

function BlogPostPage() {
  const { id } = useParams();
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    // Fetch the blog post content using the id
    fetch(`/api/resources/blog/${id}`)
      .then(response => response.json())
      .then(data => setPostContent(data.content))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  return (
    <div className="blog-post-container">
      <ReactMarkdown>{postContent}</ReactMarkdown>
    </div>
  );
}

export default BlogPostPage;
