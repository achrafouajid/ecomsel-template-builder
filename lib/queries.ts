import { gql } from '@apollo/client';

export const DOCUMENT_DATA_FRAGMENT = gql`
  fragment documentData on Document {
    _id
    url
    type
  }
`;

export const SEO_DATA_FRAGMENT = gql`
  fragment seoData on StoreSeo {
    title
    description
    image
    keywords
  }
`;

export const PRODUCT_DATA_FRAGMENT = gql`
  fragment ProductData on Product {
    _id
    metaSlug
    name
    description
    price
    currency
    promotion
    maxPerOrder
    images {
      ...documentData
    }
  }
  ${DOCUMENT_DATA_FRAGMENT}
`;

export const STORE_BY_DOMAIN = gql`
  query StoreByDomain($domain: String!) {
    storeByDomain(domain: $domain) {
      _id
      name
      domain
      primaryColor
      foregroundColor
      pricesColor
      floatingNavbar
      logo {
         ...documentData
      }
      favicon {
         ...documentData
      }
      seo {
        ...seoData
      }
    }
  }
  ${DOCUMENT_DATA_FRAGMENT}
  ${SEO_DATA_FRAGMENT}
`;

export const HOME_PAGE_QUERY = gql`
  query HomePageQuery($domain: String!) {
    storeByDomain(domain: $domain) {
      _id
      name
    }
    homeCollection(domain: $domain) {
       _id
       name
       metaSlug
       products {
         ...ProductData
       }
    }
    storeSlides(domain: $domain) {
      _id
      title
      image {
        ...documentData
      }
      link
    }
  }
  ${PRODUCT_DATA_FRAGMENT}
  ${DOCUMENT_DATA_FRAGMENT}
`;

export const CATEGORY_PAGE_QUERY = gql`
  query CategoryPageQuery($domain: String!, $slug: String!) {
    publicCategories(domain: $domain) {
      _id
      name
      metaSlug
    }
    categoryProduct(domain: $domain, slug: $slug, first: 20) {
      data {
        ...ProductData
      }
      paginatorInfo {
        currentPage
        lastPage
      }
    }
  }
  ${PRODUCT_DATA_FRAGMENT}
`;

export const PRODUCT_PAGE_QUERY = gql`
  query ProductPageQuery($domain: String!, $slug: String!) {
    productForPublic(domain: $domain, slug: $slug) {
      ...ProductData
      variants {
        _id
        name
        price
      }
    }
    getReviews(domain: $domain, productSlug: $slug) {
      data {
        _id
        rating
        body
        user {
          username
        }
        images {
          ...documentData
        }
      }
    }
  }
  ${PRODUCT_DATA_FRAGMENT}
  ${DOCUMENT_DATA_FRAGMENT}
`;
