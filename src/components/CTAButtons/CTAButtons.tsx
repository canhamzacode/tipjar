import Link from 'next/link';
import React from 'react';

const CTAButtons = () => {
  return (
    <div className="flex justify-center space-x-6 mb-12 mt-6">
      {/* Get Started Button */}
      <Link href="/dashboard" className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 transition-all duration-300">
        Get Started
      </Link>

      {/* Learn More Button */}
      <button className="bg-transparent border-2 border-purple-600 text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
        Learn More
      </button>
    </div>
  );
};

export default CTAButtons;
