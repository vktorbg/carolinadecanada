import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.recipes'), path: '/recipes' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.resources'), path: '/resources' },
  ];

  return (
    <footer className="bg-brand-charcoal text-white py-12 border-t border-neutral-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo / Brand */}
          <Link to="/" className="text-2xl font-display font-bold text-brand-terracotta hover:opacity-90 transition-opacity">
            Carolina de Canadá
          </Link>

          {/* Navigation Links in one line */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-neutral-400 hover:text-brand-terracotta transition-colors text-sm font-medium uppercase tracking-widest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <div className="text-neutral-500 text-xs tracking-wide">
            © {currentYear} Carolina de Canadá. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

