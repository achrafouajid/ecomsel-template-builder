import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { client } from '../../lib/apollo';
import { PRODUCT_PAGE_QUERY, STORE_BY_DOMAIN } from '../../lib/queries';
import { Layout } from '../../components/layout/Layout';
import { useCart } from '../../contexts/CartContext';
import styles from '../../styles/Product.module.css';
import { MOCK_STORE, MOCK_PRODUCTS, MOCK_REVIEWS } from '../../lib/mockData';

export default function ProductPage({ store, product, reviews }: any) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0]?.url);

    if (!product) return <div>Product not found</div>;

    return (
        <Layout seoData={{ title: product.name, description: product.description }}>
            <div className={styles.container}>
                {/* Gallery */}
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        {selectedImage && <img src={selectedImage} alt={product.name} />}
                    </div>
                    <div className={styles.thumbnails}>
                        {product.images?.map((img: any) => (
                            <img
                                key={img._id}
                                src={img.url}
                                onClick={() => setSelectedImage(img.url)}
                                className={selectedImage === img.url ? styles.activeThumb : ''}
                            />
                        ))}
                    </div>
                </div>

                {/* Details */}
                <div className={styles.details}>
                    <h1 className={styles.title}>{product.name}</h1>
                    <div className={styles.price} style={{ color: 'var(--prices-color)' }}>
                        {product.currency || '$'} {product.price}
                    </div>

                    <div className={styles.description} dangerouslySetInnerHTML={{ __html: product.description }} />

                    <button
                        className={styles.addToCart}
                        onClick={() => addToCart(product)}
                        style={{ backgroundColor: 'var(--primary-color)' }}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className={styles.reviews}>
                <h3>Reviews ({reviews?.data?.length || 0})</h3>
                {reviews?.data?.map((review: any) => (
                    <div key={review._id} className={styles.review}>
                        <strong>{review.user?.username || 'Anonymous'}</strong>
                        <div className={styles.rating}>{'★'.repeat(review.rating)}</div>
                        <p>{review.body}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const host = req.headers.host || '';
    const domain = host.includes('localhost') ? 'template1.ecomsel.com' : host;
    const slug = params?.metaSlug as string;

    try {
        const [storeResult, productResult] = await Promise.all([
            client.query<any>({ query: STORE_BY_DOMAIN, variables: { domain } }),
            client.query<any>({ query: PRODUCT_PAGE_QUERY, variables: { domain, slug } })
        ]);

        if (!storeResult.data?.storeByDomain || !productResult.data?.productForPublic) {
            // Return Mock Product if found in MOCK_PRODUCTS, else first mock product for demo
            const mockProduct = MOCK_PRODUCTS.find(p => p.metaSlug === slug) || MOCK_PRODUCTS[0];

            return {
                props: {
                    store: MOCK_STORE,
                    product: mockProduct,
                    reviews: { data: MOCK_REVIEWS }
                }
            }
        }

        return {
            props: {
                store: storeResult.data.storeByDomain,
                product: productResult.data.productForPublic,
                reviews: productResult.data.getReviews,
            }
        };
    } catch (error) {
        console.error('Error fetching product, using Mock:', error);
        const mockProduct = MOCK_PRODUCTS.find(p => p.metaSlug === slug) || MOCK_PRODUCTS[0];
        return {
            props: {
                store: MOCK_STORE,
                product: mockProduct,
                reviews: { data: MOCK_REVIEWS }
            }
        };
    }
};
