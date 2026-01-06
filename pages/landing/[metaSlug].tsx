import { GetServerSideProps } from 'next';
import { client } from '../../lib/apollo';
import { STORE_BY_DOMAIN } from '../../lib/queries';
import { Layout } from '../../components/layout/Layout';
// import { LANDING_PAGE_QUERY } from '../../lib/queries'; // TODO: Define specific query

export default function LandingPage({ store, slug }: any) {
    return (
        <Layout>
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1>Landing Page: {slug}</h1>
                <p>Dynamic content for landing page goes here.</p>
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    const host = req.headers.host || '';
    const domain = host.includes('localhost') ? 'template1.ecomsel.com' : host;
    const slug = params?.metaSlug as string;

    try {
        const { data } = await client.query<any>({
            query: STORE_BY_DOMAIN,
            variables: { domain }
        });

        if (!data?.storeByDomain) {
            return { notFound: true };
        }

        // TODO: Fetch landing page specific data
        // const landingData = await client.query({ query: LANDING_PAGE_QUERY, variables: { domain, slug } });

        return {
            props: {
                store: data.storeByDomain,
                slug
            }
        };
    } catch (error) {
        console.error('Error fetching landing:', error);
        return { notFound: true };
    }
};
