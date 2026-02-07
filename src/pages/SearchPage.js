import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import { getPosts } from '../services/api';
import { FaSearch } from 'react-icons/fa';
import './SearchPage.css';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    if (query) {
      fetchSearchResults(currentPage);
    }
  }, [query, currentPage]);

  const fetchSearchResults = async (page) => {
    try {
      setLoading(true);
      const response = await getPosts({ search: query, page, limit: 9 });
      setPosts(response.data.posts);
      setTotalPages(response.data.totalPages);
      setTotalPosts(response.data.totalPosts);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && posts.length === 0) {
    return <div className="loading">Searching...</div>;
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="container">
          <div className="search-info">
            <FaSearch className="search-icon" />
            <div>
              <h1>Search Results</h1>
              <p>Showing results for: <strong>"{query}"</strong></p>
              <span className="result-count">{totalPosts} results found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {posts.length === 0 ? (
          <div className="no-results">
            <h2>No results found</h2>
            <p>Try searching with different keywords</p>
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

export default SearchPage;
