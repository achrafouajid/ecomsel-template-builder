import { GetServerSideProps } from 'next';
import { client } from '../../lib/apollo';
import { CATEGORY_PAGE_QUERY, STORE_BY_DOMAIN } from '../../lib/queries';
import { Layout } from '../../components/layout/Layout';
import { ProductCard } from '../../components/commerce/ProductCard';
import styles from '../../styles/Category.module.css';

export default function CategoryPage({ store, products, category }: any) {
    return (
        <Layout>
            <div className={styles.header}>
                <h1>{category?.name || 'Category'}</h1>
            </div>

            <div className={styles.grid}>
                {products && products.data ? products.data.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                )) : <p>No products found in this category.</p>}
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const host = req.headers.host || '';
    const domain = host.includes('localhost') ? 'template1.ecomsel.com' : host;
    const slug = params?.metaSlug as string;

    try {
        const [storeResult, categoryResult] = await Promise.all([
            client.query<any>({ query: STORE_BY_DOMAIN, variables: { domain } }),
            client.query<any>({ query: CATEGORY_PAGE_QUERY, variables: { domain, slug } })
        ]);

        if (!storeResult.data?.storeByDomain) {
            return { notFound: true };
        }

        // Find the current category name from publicCategories if not returned directly
        // Ideally the API would return the category details. CATEGORY_PAGE_QUERY fetches publicCategories.
        // We can filter to find the name.
        const categories = categoryResult.data?.publicCategories || [];
        const currentCategory = categories.find((c: any) => c.metaSlug === slug) || { name: slug };

        return {
            props: {
                store: storeResult.data.storeByDomain,
                products: categoryResult.data?.categoryProduct,
                category: currentCategory,
            }
        };
    } catch (error) {
        console.error('Error fetching category:', error);
        return { notFound: true };
    }
};
