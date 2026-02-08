import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { getPosts } from '../services/api';
import './PostsPage.css';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      setLoading(true);
      const response = await getPosts({ page, limit: 9 });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setTotalPosts(response.data.totalPosts);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && posts.length === 0) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="posts-page">
      <div className="container">
        <div className="page-header">
          <h1>All Posts</h1>
          <p>Showing {posts.length} of {totalPosts} posts</p>
        </div>

        {posts.length === 0 ? (
          <div className="no-posts">
            <h2>No posts found</h2>
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

export default PostsPage;
