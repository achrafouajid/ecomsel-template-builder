import React from 'react';
import Link from 'next/link';
import { useStore } from '../../contexts/StoreContext';
import styles from './Header.module.css';

export const Header = () => {
    const { store } = useStore();

    return (
        <header className={`${styles.header} ${store.floatingNavbar ? styles.floating : ''}`}>
            <div className={styles.wrapper}>
                <Link href="/" className={styles.logo}>
                    {store.logoUrl ? (
                        <img src={store.logoUrl} alt={store.name} />
                    ) : (
                        <span style={{ color: 'var(--primary-color)' }}>{store.name}</span>
                    )}
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    {/* Dynamic categories could be fetched here or passed via props */}
                    <Link href="/cart" className={styles.navLink}>Cart</Link>
                </nav>
            </div>
        </header>
    );
};
