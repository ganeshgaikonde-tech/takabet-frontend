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
        getPosts({ featured: true, limit: 5 }).catch(() => ({ data: { posts: [] } })),
        getPosts({ limit: 6 }).catch(() => ({ data: { posts: [] } })),
        getCategories().catch(() => ({ data: [] }))
      ]);
      
      setFeaturedPosts(Array.isArray(featured.data.posts) ? featured.data.posts : []);
      setRecentPosts(Array.isArray(recent.data.posts) ? recent.data.posts : []);
      setCategories(Array.isArray(cats.data) ? cats.data : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setFeaturedPosts([]);
      setRecentPosts([]);
      setCategories([]);
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
      {featuredPosts.length > 0 && (
        <section className="hero-section">
          <div className="container">
            <Slider {...sliderSettings}>
              {featuredPosts.map((post) => (
                <div key={post._id} className="hero-slide">
                  <div className="hero-content">
                    <div className="hero-text">
                      <span className="hero-category">{post.category?.name || 'News'}</span>
                      <h2>{post.title}</h2>
                      <p>{post.excerpt}</p>
                      <Link to={`/post/${post.slug}`} className="btn btn-primary">
                        Read More
                      </Link>
                    </div>
                    <div className="hero-image">
                      <img src={post.featuredImage || 'https://via.placeholder.com/800x450'} alt={post.title} />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
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
                  <span className="category-icon">{category.icon || '📁'}</span>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="recent-posts-section">
        <div className="container">
          <h2 className="section-title">Latest Posts</h2>
          {recentPosts.length > 0 ? (
            <>
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
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <h3 style={{ color: '#b8b8b8' }}>No posts available yet</h3>
              <p style={{ color: '#b8b8b8' }}>Please check your backend connection</p>
            </div>
          )}
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
```

---

## ✅ **The Real Problem: Backend Not Working**

The `.map is not a function` error happens because the backend API is not returning data. Let's verify:

### **Test Your Backend:**

Open these URLs in a new browser tab:
```
1. https://takabet-backend.up.railway.app/api/health
   Should show: {"status":"OK","message":"Server is running"}

2. https://takabet-backend.up.railway.app/api/categories
   Should show: Array of categories [{...}, {...}]

3. https://takabet-backend.up.railway.app/api/posts
   Should show: {posts: [...], currentPage: 1, ...}
```

**If these don't work, your backend is the problem.**

---

## 🔧 **Fix Backend Issues**

### **Check Railway Deployment:**

1. **Railway.app** → Your backend project
2. **Deployments** → Click latest
3. **View Logs** 

**Look for:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
✅ Server running in production mode on port 8080
