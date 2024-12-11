 
// src/components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Citély Text */}
      <div className={styles['navbar-logo']}>
        <span className={styles['logo-text']}>
          <Link href="/" className={styles['logo-link']}>Citély</Link>
        </span>
      </div>
      
      {/* Links */}
      <div className={styles['navbar-links']}>
        <div className={styles['navbar-item']}><Link href="/authors">Authors</Link></div>
        <div className={styles['navbar-item']}>Collections</div>
        <div className={styles['navbar-item']}>Quotes</div>
        <div className={styles['navbar-item']}>Topics</div>
      </div>
    </nav>
  );
};

export default Navbar;
