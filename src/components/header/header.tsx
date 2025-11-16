'use client';

import { ArrowUpRight, Heart } from 'lucide-react';
import dynamic from 'next/dynamic';
import { motion } from 'motion/react';

import { Button } from '@/components/ui/button';

import LocaleSwitcher from './locale-switcher';
import { useTranslations } from 'next-intl';
import { Suspense, useState, useEffect } from 'react';
import MobileNav from './mobile-nav';
import Logo from './logo';
import NavigationLink from '../navigation-link';

const NavMenu = dynamic(() => import('./nav-menu').then(mod => mod.NavMenu), {
  ssr: false
});

export default function HeaderClient() {
  const t = useTranslations('Default');
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
          ? 'bg-white/95 shadow-md backdrop-blur-xl'
          : 'bg-white/80 shadow-sm backdrop-blur-md'
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
              className="flex-1"
            >
              <NavMenu className="laptop:flex hidden justify-center" />
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
            <NavigationLink href={'/payment'}>
              <Button className="group from-accent-foreground to-accent-foreground/90 hover:shadow-accent-foreground/20 relative h-11 overflow-hidden rounded-full bg-gradient-to-r px-6 font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl lg:h-12 lg:px-8">
                {/* Animated background shine */}
                <motion.div
                  animate={{
                    x: [-200, 200]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />

                <span className="relative flex items-center gap-2">
                  <Heart className="size-4 fill-current" />
                  {t('Donate_us')}
                  <motion.div
                    animate={{
                      x: [0, 3, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    <ArrowUpRight className="size-4" />
                  </motion.div>
                </span>
              </Button>
            </NavigationLink>

            {/* Language Switcher */}
            <LocaleSwitcher />

            {/* Mobile Menu */}
            <div className="laptop:hidden">
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
