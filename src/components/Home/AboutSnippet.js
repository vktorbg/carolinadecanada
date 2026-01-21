import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';

const AboutSnippet = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-brand-cream/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        {/* Image Column with Scrapbook effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-4/12 flex justify-center lg:justify-start"
                        >
                            <div className="relative p-3 bg-white shadow-xl rotate-1 group hover:rotate-0 transition-transform duration-500 max-w-[340px]">
                                <div className="overflow-hidden aspect-[4/5] rounded-sm">
                                    <img
                                        src="/images/profile.jpg"
                                        alt="Carolina de Canadá"
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                </div>
                                {/* Subtle caption */}
                                <div className="pt-3 text-center">
                                    <p className="font-accent-script text-xl text-brand-terracotta">Carolina</p>
                                </div>

                                {/* Tape decoration */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-brand-terracotta/20 backdrop-blur-sm -rotate-2" />
                            </div>
                        </motion.div>

                        {/* Content Column */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full lg:w-8/12"
                        >
                            <span className="text-brand-terracotta font-accent-script text-4xl mb-6 block">
                                Hola, soy Carolina
                            </span>

                            <h2 className="text-4xl md:text-5xl font-display font-medium text-brand-charcoal mb-8 leading-tight">
                                {t('home.about.title')}
                            </h2>

                            <div className="space-y-6 text-lg text-neutral-600 font-light leading-relaxed mb-10">
                                <p>
                                    {t('home.about.text')}
                                </p>
                                {/* Additional personal touch text if exists or just decorative line */}
                                <div className="h-px w-24 bg-brand-terracotta/20" />
                            </div>

                            <div className="flex items-center gap-8">
                                <Link
                                    to="/about"
                                    className="px-8 py-3 border-2 border-brand-charcoal text-brand-charcoal font-bold hover:bg-brand-charcoal hover:text-white transition-all duration-300"
                                >
                                    {t('home.about.link')}
                                </Link>

                                <div className="hidden sm:block">
                                    <p className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-1">Sígueme</p>
                                    <div className="flex gap-4 text-brand-charcoal">
                                        {/* Placeholder social icons or text */}
                                        <span className="text-xs font-bold hover:text-brand-terracotta cursor-pointer">IG</span>
                                        <span className="text-xs font-bold hover:text-brand-terracotta cursor-pointer">YT</span>
                                        <span className="text-xs font-bold hover:text-brand-terracotta cursor-pointer">FB</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSnippet;
