'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

import { Suspense, useEffect, useState } from 'react';
import NavigationLink from '../navigation-link';
import DonateBtn from './donate-btn';
import LocaleSwitcher from './locale-switcher';
import Logo from './logo';
import MobileNav from './mobile-nav';

const NavMenu = dynamic(() => import('./nav-menu').then(mod => mod.NavMenu), {
  ssr: false
});

export default function HeaderClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/100 shadow-md backdrop-blur-xl'
          : 'bg-white/100 shadow-sm backdrop-blur-md'
      }`}
    >
      <nav className="border-b border-gray-100">
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-8 px-4 sm:px-6 lg:h-24 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavigationLink href={'/'} className="group cursor-pointer">
              <Logo className="h-[70px] w-[120px] transition-transform duration-300 group-hover:scale-105 lg:h-[80px] lg:w-[140px]" />
            </NavigationLink>
          </motion.div>

          {/* Desktop Menu */}
          <Suspense fallback="Loading.....">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-1 justify-center"
            >
              <NavMenu className="slaptop:flex hidden justify-center" />
            </motion.div>
          </Suspense>

          {/* Right Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center gap-3 lg:gap-4"
          >
            {/* Donate Button */}
            <div className="hidden sm:block">
              <DonateBtn />
            </div>

            {/* Language Switcher */}
            <LocaleSwitcher />

            {/* Mobile Menu */}
            <div className="slaptop:hidden">
              <MobileNav />
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Decorative bottom line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="via-accent-foreground/30 h-0.5 w-full origin-center bg-gradient-to-r from-transparent to-transparent"
      />
    </header>
  );
}
