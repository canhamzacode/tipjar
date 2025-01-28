import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Made with ❤️ by <Link href="https://x.com/canhamzacode" className="font-semibold">Hamza (CanHamzaCode)</Link>
        </p>
        <p className="text-xs mt-2">
          &copy; {new Date().getFullYear()} Tip Jar. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
