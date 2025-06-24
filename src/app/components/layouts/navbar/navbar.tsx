"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Search Proposals', href: '/proposal-search-form' },
    { label: 'Add Proposal', href: '/proposal-add-form' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <nav className="bg-white shadow-2xl border-b border-rose-200 w-full z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="md:text-2xl font-serif font-bold text-rose-800 hover:text-rose-600 transition-colors duration-300">
              NTU Marriage Bureau
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-rose-700 hover:text-rose-500 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-rose-50 hover:shadow-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              type="text"
              icon={isOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={toggleMenu}
              className="text-rose-700 hover:text-rose-500 transition-colors duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-rose-50 to-rose-100"
          >
            <div className="px-4 pt-3 pb-4 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 rounded-full text-base font-medium text-rose-700 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
