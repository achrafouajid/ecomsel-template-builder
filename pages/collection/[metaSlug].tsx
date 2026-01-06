import { GetServerSideProps } from 'next';
import { client } from '../../lib/apollo';
import { STORE_BY_DOMAIN } from '../../lib/queries';
import { Layout } from '../../components/layout/Layout';

export default function CollectionPage({ store, slug }: any) {
    return (
        <Layout>
            <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                <h1>Collection: {slug}</h1>
                <p>Dynamic collection content goes here.</p>
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

        return {
            props: {
                store: data.storeByDomain,
                slug
            }
        };
    } catch (error) {
        console.error('Error fetching collection:', error);
        return { notFound: true };
    }
};
