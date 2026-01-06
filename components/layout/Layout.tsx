import React from 'react';
import Head from 'next/head';
import { useStore } from '../../contexts/StoreContext';
import styles from './Layout.module.css';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
    children: React.ReactNode;
    seoData?: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, seoData }) => {
    const { store } = useStore();

    return (
        <>
            <Head>
                <title>{seoData?.title || store.name}</title>
                <meta name="description" content={seoData?.description || `Welcome to ${store.name}`} />
                {store.faviconUrl && <link rel="icon" href={store.faviconUrl} />}
            </Head>
            <div
                className={styles.container}
                style={{
                    '--primary-color': store.primaryColor,
                    '--foreground-color': store.foregroundColor,
                    '--prices-color': store.pricesColor,
                } as React.CSSProperties}
            >
                <Header />
                <main className={styles.main}>{children}</main>
                <Footer />
            </div>
        </>
    );
};
