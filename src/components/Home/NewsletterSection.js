import React, { useState } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
// import { db, collection, addDoc, serverTimestamp } from '../../firebase';

const NewsletterSection = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      toast.error(t('home.newsletter.invalidEmail'));
      return;
    }

    setLoading(true);

    try {
      // Firebase is disabled by user request
      console.log('Newsletter subscription (Firebase disabled):', email, i18n.language);
      toast.success(t('home.newsletter.success'));
      setEmail('');

      /* 
      if (typeof window !== 'undefined' && db) {
        await addDoc(collection(db, 'newsletterSubscribers'), {
          email,
          language: i18n.language,
          subscribedAt: serverTimestamp(),
          status: 'active'
        });
        toast.success(t('home.newsletter.success'));
        setEmail('');
      } 
      */
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(t('home.newsletter.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-brand-sage to-brand-earth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="p-4 bg-white/20 rounded-full">
              <Mail size={40} className="text-white" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            {t('home.newsletter.title')}
          </h2>
          <p className="text-white/90 text-lg mb-8">
            {t('home.newsletter.subtitle')}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('home.newsletter.placeholder')}
              className="flex-1 px-6 py-4 rounded-lg border-2 border-transparent focus:border-white focus:outline-none text-brand-charcoal"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-brand-terracotta text-white font-semibold rounded-lg hover:bg-brand-earth transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? t('home.newsletter.subscribing') : t('home.newsletter.subscribe')}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
