import React from 'react';
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { motion } from 'framer-motion';

const AboutSnippet = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 lg:py-16 bg-brand-cream/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                        {/* Image Column with Scrapbook effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-4/12 flex justify-center lg:justify-start"
                        >
                            <div className="relative p-3 bg-white shadow-xl rotate-1 group hover:rotate-0 transition-transform duration-500 max-w-[280px]">
                                <div className="overflow-hidden aspect-[4/5] rounded-sm">
                                    <img
                                        src="/images/profile.jpeg"
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
                            <span className="text-brand-terracotta font-accent-script text-3xl mb-4 block">
                                {t('home.about.greeting')}
                            </span>

                            <h2 className="text-3xl md:text-4xl font-display font-medium text-brand-charcoal mb-6 leading-tight">
                                {t('home.about.title')}
                            </h2>

                            <div className="space-y-4 text-base text-neutral-600 font-light leading-relaxed mb-8">
                                <p>
                                    {t('home.about.text')}
                                </p>
                                {/* Additional personal touch text if exists or just decorative line */}
                                <div className="h-px w-24 bg-brand-terracotta/20" />
                            </div>

                            <div>
                                <Link
                                    to="/about"
                                    className="px-8 py-3 border-2 border-brand-charcoal text-brand-charcoal font-bold hover:bg-brand-charcoal hover:text-white transition-all duration-300"
                                >
                                    {t('home.about.link')}
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSnippet;
