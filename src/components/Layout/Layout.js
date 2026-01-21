import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';
import theme from '../../styles/design-tokens';

const Layout = ({ children, minimal = false, noTopPadding = false }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col min-h-screen bg-brand-cream">
        <Header minimal={minimal} />
        <main className={`flex-grow ${noTopPadding ? '' : 'pt-0'}`}>
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#2D3436',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#D97757',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
