import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { getCategories } from '../services/api';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="logo">
              <Link to="/">
                <h1>🎰 TakaBet</h1>
              </Link>
            </div>
            
            <div className="header-actions">
              <button 
                className="search-toggle"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                <FaSearch />
              </button>
              
              {user ? (
                <div className="user-menu">
                  <Link to="/admin" className="user-link">
                    <FaUser /> {user.username}
                  </Link>
                  <button onClick={handleLogout} className="logout-btn">
                    <FaSignOutAlt />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
              
              <button 
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <div className="container">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
      )}

      <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            {categories.slice(0, 5).map((category) => (
              <li key={category._id}>
                <Link 
                  to={`/category/${category.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {category.icon} {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
