"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Search, Handshake } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative md:h-[550px] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/du1slvjl7/image/upload/v1748685451/m-slider_lks5ql.png"
            alt="Hero background"
            fill
            priority
            className="md:object-cover"
            sizes="100vw"
            quality={100}
          />
        </div>
        <div className="relative z-10 text-center bg-transparent p-8 rounded-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight"
          >
            Find Your Perfect Match
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-white mb-8 max-w-2xl mx-auto font-light"
          >
            Join our trusted marriage bureau to find your life partner. We
            connect hearts with care and confidentiality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link
              href="/proposal-add-form"
              className="px-8 py-3.5 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              Add Your Proposal
            </Link>
            <Link
              href="/proposal-search-form"
              className="px-8 py-3.5 bg-white text-rose-600 rounded-full font-medium hover:bg-rose-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 border-2 border-rose-200"
            >
              Search Proposals
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-rose-900 mb-16">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-100"
            >
              <div className="mb-6">
                <Heart className="w-12 h-12 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-rose-800">
                Add Proposal
              </h3>
              <p className="text-rose-600 leading-relaxed">
                Create your profile and let others find you. We ensure your
                privacy and security.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-100"
            >
              <div className="mb-6">
                <Search className="w-12 h-12 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-rose-800">
                Search Proposals
              </h3>
              <p className="text-rose-600 leading-relaxed">
                Browse through verified profiles and find your perfect match.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-rose-100"
            >
              <div className="mb-6">
                <Handshake className="w-12 h-12 text-rose-500" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-3 text-rose-800">
                Expert Guidance
              </h3>
              <p className="text-rose-600 leading-relaxed">
                Get professional support and guidance throughout your journey.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold text-rose-900 mb-10">
            Ready to Start Your Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/about"
              className="px-8 py-3.5 bg-white text-rose-600 rounded-full font-medium hover:bg-rose-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 border-2 border-rose-200"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-rose-600 text-white rounded-full font-medium hover:bg-rose-700 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
