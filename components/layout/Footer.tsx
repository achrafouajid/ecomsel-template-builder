import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import styles from './Footer.module.css';

export const Footer = () => {
    const { store } = useStore();

    return (
        <footer className={styles.footer} style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
            <div className={styles.content}>
                <p>&copy; {new Date().getFullYear()} {store.name}. All rights reserved.</p>
            </div>
        </footer>
    );
};
