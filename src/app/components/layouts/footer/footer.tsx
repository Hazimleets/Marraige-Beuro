"use client";

import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { label: "Home", href: "/" },
      { label: "Search Proposals", href: "/proposal-search-form" },
      { label: "Add Proposal", href: "/proposal-add-form" },
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
    services: [
      { label: "Matrimonial Services", href: "#" },
      { label: "Matchmaking", href: "#" },
      { label: "Profile Verification", href: "#" },
      { label: "Privacy Protection", href: "#" },
    ],
    contact: [
      { icon: <FaPhone />, text: "+92 111 0565400" },
      { icon: <FaWhatsapp />, text: "+92 222 7699800" },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-rose-50 via-white to-rose-50 pt-16 pb-8 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-rose-800 mb-4">
              NTU Marriage Bureau
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Your trusted partner in finding meaningful relationships. We
              connect hearts with care and confidentiality.
            </p>
            <div className="flex space-x-5">
              <a
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-all duration-300 hover:scale-110"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-all duration-300 hover:scale-110"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="#"
                className="text-rose-400 hover:text-rose-600 transition-all duration-300 hover:scale-110"
              >
                <FaWhatsapp size={22} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-rose-800 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-rose-800 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-600 hover:text-rose-600 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-rose-300 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-serif font-semibold text-rose-800 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {footerLinks.contact.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-4 text-gray-600 group"
                >
                  <span className="text-rose-500 group-hover:text-rose-600 transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="group-hover:text-rose-600 transition-colors duration-300">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-rose-100 pt-8">
          <p className="text-center text-gray-600 font-light">
            © {currentYear} Apna rights hi ha ! no tension | All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
