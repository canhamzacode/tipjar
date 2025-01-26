import React from 'react';
import { CTAButtons } from '../CTAButtons';
import { HowItWorks } from '../HowItWorks';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="container max-w-[900px] mx-auto py-20 px-4 sm:px-6 lg:px-8 z-10 text-center flex flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-4">
        Tip Jar - Direct Crypto Tips for Content Creators
      </h1>
      <p className="text-lg sm:text-xl mb-8">
        Support your favorite content creators, streamers, and developers with easy crypto tips. No middlemen, just gratitude in the form of crypto.
      </p>
      <Image src="/images/jar.png" alt="" width={400} height={500} />
      <CTAButtons />
      <HowItWorks />
    </div>
  );
};

export default Hero;
