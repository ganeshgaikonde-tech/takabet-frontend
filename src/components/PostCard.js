import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaClock, FaUser } from 'react-icons/fa';
import './PostCard.css';

const PostCard = ({ post }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="post-card">
      <Link to={`/post/${post.slug}`} className="post-image">
        <img 
          src={post.featuredImage || 'https://via.placeholder.com/400x250'} 
          alt={post.title}
        />
        {post.featured && <span className="featured-badge">Featured</span>}
      </Link>

      <div className="post-content">
        <Link to={`/category/${post.category.slug}`} className="post-category">
          {post.category.name}
        </Link>

        <h3 className="post-title">
          <Link to={`/post/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="post-excerpt">{post.excerpt}</p>

        <div className="post-meta">
          <span className="meta-item">
            <FaUser /> {post.author.username}
          </span>
          <span className="meta-item">
            <FaClock /> {formatDate(post.publishedAt)}
          </span>
          <span className="meta-item">
            <FaEye /> {post.views}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
