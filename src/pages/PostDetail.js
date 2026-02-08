import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaEye, FaClock, FaUser, FaTag } from 'react-icons/fa';
import { getPostBySlug, getPosts } from '../services/api';
import './PostDetail.css';

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPostBySlug(slug);
      setPost(response.data);
      
      // Fetch related posts from same category
      const relatedResponse = await getPosts({ 
        category: response.data.category.slug, 
        limit: 3 
      });
      setRelatedPosts(relatedResponse.data.posts.filter(p => p._id !== response.data._id));
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (!post) {
    return (
      <div className="container">
        <div className="error">Post not found</div>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <div className="post-header">
        <div className="container">
          <Link to={`/category/${post.category.slug}`} className="breadcrumb">
            {post.category.name}
          </Link>
          <h1>{post.title}</h1>
          <div className="post-header-meta">
            <span className="meta-item">
              <FaUser /> {post.author.username}
            </span>
            <span className="meta-item">
              <FaClock /> {formatDate(post.publishedAt)}
            </span>
            <span className="meta-item">
              <FaEye /> {post.views} views
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="post-content-wrapper">
          <article className="post-main-content">
            {post.featuredImage && (
              <div className="post-featured-image">
                <img src={post.featuredImage} alt={post.title} />
              </div>
            )}

            <div 
              className="post-body"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                <FaTag />
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </article>

          <aside className="post-sidebar">
            <div className="sidebar-widget">
              <h3>About the Author</h3>
              <div className="author-info">
                <div className="author-avatar">
                  <FaUser />
                </div>
                <div>
                  <h4>{post.author.username}</h4>
                  <p>{post.author.email}</p>
                </div>
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className="sidebar-widget">
                <h3>Related Posts</h3>
                <div className="related-posts">
                  {relatedPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost._id}
                      to={`/post/${relatedPost.slug}`}
                      className="related-post-item"
                    >
                      <img src={relatedPost.featuredImage} alt={relatedPost.title} />
                      <div>
                        <h4>{relatedPost.title}</h4>
                        <span>{formatDate(relatedPost.publishedAt)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
