import type { AppProps } from 'next/app';
import { StoreProvider } from '../contexts/StoreContext';
import { CartProvider } from '../contexts/CartContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  // Use the store data passed from getServerSideProps, or fall back to a safe default to prevent crashes
  const store = pageProps.store || {
    name: 'Loading...',
    primaryColor: '#000000',
    foregroundColor: '#ffffff',
    pricesColor: '#000000',
    floatingNavbar: false,
  };

  return (
    <StoreProvider store={store}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </StoreProvider>
  );
}

export default MyApp;
