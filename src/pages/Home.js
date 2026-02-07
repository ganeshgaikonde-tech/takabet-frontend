import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { getPosts, getCategories } from '../services/api';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';

const Home = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [featured, recent, cats] = await Promise.all([
        getPosts({ featured: true, limit: 5 }),
        getPosts({ limit: 6 }),
        getCategories()
      ]);
      
      setFeaturedPosts(featured.data.posts);
      setRecentPosts(recent.data.posts);
      setCategories(cats.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home">
      {/* Hero Slider */}
      <section className="hero-section">
        <div className="container">
          <Slider {...sliderSettings}>
            {featuredPosts.map((post) => (
              <div key={post._id} className="hero-slide">
                <div className="hero-content">
                  <div className="hero-text">
                    <span className="hero-category">{post.category.name}</span>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/post/${post.slug}`} className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                  <div className="hero-image">
                    <img src={post.featuredImage} alt={post.title} />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse Categories</h2>
          <div className="categories-grid">
            {categories.slice(0, 6).map((category) => (
              <Link 
                key={category._id} 
                to={`/category/${category.slug}`}
                className="category-card"
              >
                <span className="category-icon">{category.icon}</span>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="recent-posts-section">
        <div className="container">
          <h2 className="section-title">Latest Posts</h2>
          <div className="posts-grid">
            {recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/posts" className="btn btn-outline">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="promo-banner">
        <div className="container">
          <div className="promo-content">
            <h2>🎁 Welcome Bonus</h2>
            <p>Get up to $500 bonus on your first deposit!</p>
            <Link to="/category/promotions" className="btn btn-primary">
              Claim Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
