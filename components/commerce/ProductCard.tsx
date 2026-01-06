import React from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const image = product.images?.[0]?.url || 'https://via.placeholder.com/300';

    return (
        <div className={styles.card}>
            <Link href={`/product/${product.metaSlug}`} className={styles.link}>
                <div className={styles.imageWrapper}>
                    <img src={image} alt={product.name} loading="lazy" />
                    <div className={styles.quickAdd}>
                        <button className={styles.addButton}>Quick Add</button>
                    </div>
                </div>
                <div className={styles.info}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <div className={styles.price}>
                        {product.currency || '$'} {product.price}
                    </div>
                </div>
            </Link>
        </div>
    );
};
