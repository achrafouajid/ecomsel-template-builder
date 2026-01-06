# Ecomsel Template Builder

A dynamic Next.js e-commerce template supporting multi-tenant subdomains via GraphQL.

## Features

- **Multi-Subdomain Support**: Automatically detects store based on subdomain (e.g., `store1.ecomsel.com`).
- **Dynamic Theming**: Adapts primary colors, logos, and fonts per store.
- **GraphQL Integration**: Fetches data from `api.ecomsel.com`.
- **SSR/SSG**: Optimized for SEO and performance using Next.js `getServerSideProps`.
- **Modular Components**: Reusable `Header`, `Footer`, `ProductCard`, etc.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   open [http://localhost:3000](http://localhost:3000).
   
   *Note*: When running locally, the app defaults to `template1.ecomsel.com` for data fetching. To test other stores, you can modify the `getServerSideProps` logic or map subdomains in your `/etc/hosts`.

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `pages/`: Application routes.
  - `index.tsx`: Home page.
  - `category/[metaSlug].tsx`: Category pages.
  - `product/[metaSlug].tsx`: Product details.
- `components/`:
  - `layout/`: Header, Footer, Layout (Theming).
  - `commerce/`: Product cards, Cart, Reviews.
- `contexts/`:
  - `StoreContext`: Global store settings (theme, config).
  - `CartContext`: Shopping basket logic.
- `lib/`:
  - `apollo.ts`: GraphQL configuration.
  - `queries.ts`: GraphQL queries/fragments.

## Extending the Template

### Adding New Subdomains
The template automatically supports any subdomain that exists in the Ecomsel database. No code changes are needed. Just point the subdomain to this deployment.

### Adding New Pages
1. Create a file in `pages/new-page.tsx`.
2. Implement `getServerSideProps` to fetch `STORE_BY_DOMAIN` and any page-specific data.
3. Wrap content in `<Layout />` to apply the store's theme.

### modifying the Theme
The `Layout` component injects CSS variables (`--primary-color`, etc.) based on the store data. Use these variables in your CSS modules:
```css
.myComponent {
  color: var(--primary-color);
}
```
