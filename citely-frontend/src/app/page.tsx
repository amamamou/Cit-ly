import React from 'react';
import styles from './home/Home.module.css'; // Import the CSS module

export default function Home() {
  return (
    <div>
      {/* Home Section with Video Background */}
      <section className={styles['home-section']}>
        {/* Video background */}
        <video autoPlay loop muted playsInline className={styles['background-video']}>
          <source src="/assets/2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Title */}
        <h1 className={styles['title-small']}>An Encyclopedic Playground of</h1>
        <h1 className={styles['title-main']}>Citations & Wisdom</h1>

        {/* Search Bar */}
        <div className={styles['search-container']}>
          <input type="text" className={styles['search-bar']} placeholder="SEARCH QUOTERY" />
          <span className={styles['search-icon']}>
            <i className="fa fa-search"></i>
          </span>
        </div>

        {/* OR Line */}
        <div className={styles['or-container']}>
          <span className={styles['line']}></span>
          <span className={styles['or-text']}>OR</span>
          <span className={styles['line']}></span>
        </div>

        {/* Explore Citations Button */}
        <div className={styles['cta-container']}>
          <button className={styles['cta-btn']}>EXPLORE QUOTES</button>
        </div>
      </section>
    </div>
  );
}
