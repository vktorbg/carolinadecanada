import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout/Layout';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl md:text-8xl font-display font-bold text-brand-terracotta mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-charcoal mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-neutral-600 mb-8">
            Oops! The recipe you're looking for seems to have disappeared from the kitchen.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-brand-terracotta text-white font-semibold rounded-lg hover:bg-brand-earth transition-all duration-300 hover:shadow-lg"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => {
  return (
    <>
      <title>404: Page Not Found | Carolina de Canadá</title>
    </>
  );
};
