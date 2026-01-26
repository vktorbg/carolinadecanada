import React, { useState, useEffect } from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { Menu, X, Search, Instagram } from 'lucide-react';
import LanguageToggle from './LanguageToggle';

const Header = ({ minimal = false }) => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(minimal);

  useEffect(() => {
    if (minimal) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.recipes'), path: '/recipes' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.resources'), path: '/resources' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/90 backdrop-blur-md py-3 shadow-soft border-b border-neutral-100'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Search - Left Side (Desktop) */}
          <div className="hidden lg:flex items-center w-1/4">
            <button className="text-brand-charcoal hover:text-brand-terracotta transition-colors">
              <Search size={22} />
            </button>
          </div>

          {/* Logo - Center */}
          <div className="flex-1 lg:w-2/4 flex justify-center">
            <Link
              to="/"
              className="group flex flex-col items-center"
            >
              <span className={`font-display font-medium text-brand-charcoal transition-all duration-500 ${scrolled ? 'text-2xl' : 'text-3xl md:text-4xl'
                }`}>
                Carolina <span className="text-brand-terracotta italic font-accent-script">de</span> Canadá
              </span>
              <div className={`h-0.5 bg-brand-terracotta transition-all duration-500 origin-center ${scrolled ? 'w-0' : 'w-12 group-hover:w-24 mt-1'
                }`} />
            </Link>
          </div>

          {/* Right Side - Language Toggle */}
          <div className="flex items-center justify-end lg:w-1/4">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
          </div>
        </div>

        {/* Navigation Links - Centered Row (Desktop Only) */}
        {!scrolled && (
          <nav className="hidden lg:flex items-center justify-center space-x-12 mt-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-500 hover:text-brand-terracotta transition-colors relative group"
                activeClassName="text-brand-terracotta"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-terracotta transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        )}

        {/* Scrolled Navigation - Subtle version */}
        {scrolled && (
          <nav className="hidden lg:flex items-center justify-center space-x-8 mt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 hover:text-brand-terracotta transition-colors"
                activeClassName="text-brand-terracotta"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
