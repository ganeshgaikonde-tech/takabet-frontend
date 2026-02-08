import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { getPosts, getCategoryBySlug } from '../services/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchCategoryAndPosts = useCallback(async () => {
    try {
      setLoading(true);
      const [catResponse, postsResponse] = await Promise.all([
        getCategoryBySlug(slug),
        getPosts({ category: slug, page: currentPage, limit: 9 })
      ]);
      
      setCategory(catResponse.data);
      setPosts(postsResponse.data.posts);
      setTotalPages(postsResponse.data.totalPages);
      setTotalPosts(postsResponse.data.totalPosts);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  }, [slug, currentPage]);

  useEffect(() => {
    fetchCategoryAndPosts();
  }, [fetchCategoryAndPosts]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && !category) {
    return <div className="loading">Loading category...</div>;
  }

  if (!category) {
    return (
      <div className="container">
        <div className="error">Category not found</div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="category-header">
        <div className="container">
          <div className="category-info">
            <span className="category-icon-large">{category.icon}</span>
            <div>
              <h1>{category.name}</h1>
              <p>{category.description}</p>
              <span className="post-count">{totalPosts} posts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <div className="no-posts">
            <h2>No posts in this category yet</h2>
            <p>Check back later for new content!</p>
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
