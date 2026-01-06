import { GetServerSideProps } from 'next';
import { client } from '../lib/apollo';
import { HOME_PAGE_QUERY } from '../lib/queries';
import { Layout } from '../components/layout/Layout';
import { ProductCard } from '../components/commerce/ProductCard';
import styles from '../styles/Home.module.css';
import { MOCK_STORE, MOCK_SLIDES, MOCK_PRODUCTS } from '../lib/mockData';

export default function Home({ store, homeCollection, storeSlides }: any) {
  return (
    <Layout>
      {/* Hero Section */}
      {storeSlides && storeSlides.length > 0 && (
        <div className={styles.hero}>
          {storeSlides.map((slide: any) => (
            <div key={slide._id} className={styles.slide}>
              <img src={slide.image?.url} alt={slide.title} />
              <div className={styles.heroContent}>
                <h2>{slide.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Collection */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{homeCollection?.name || 'Featured Products'}</h2>
        <div className={styles.grid}>
          {homeCollection?.products?.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const host = req.headers.host || '';
  const domain = host.includes('localhost') ? 'template1.ecomsel.com' : host;

  try {
    const { data } = await client.query<any>({
      query: HOME_PAGE_QUERY,
      variables: { domain }
    });

    // Fallback to Mock Data if API returns null/empty
    if (!data?.storeByDomain) {
      console.log("No store found, using MOCK data");
      return {
        props: {
          store: MOCK_STORE,
          homeCollection: { name: 'Latest Arrivals', products: MOCK_PRODUCTS },
          storeSlides: MOCK_SLIDES,
        }
      }
    }

    return {
      props: {
        store: data.storeByDomain,
        homeCollection: data.homeCollection,
        storeSlides: data.storeSlides || [],
      }
    };
  } catch (error) {
    console.error('Error fetching home data, using Mock:', error);
    // Return Mock data on error
    return {
      props: {
        store: MOCK_STORE,
        homeCollection: { name: 'Latest Arrivals', products: MOCK_PRODUCTS },
        storeSlides: MOCK_SLIDES,
      }
    };
  }
};
