import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Step 1',
      description: 'Log in with your wallet or Reown account to connect with the community.'
    },
    {
      title: 'Step 2',
      description: 'Browse and support your favorite creators by sending tips in Solana.'
    },
    {
      title: 'Step 3',
      description: 'Leave a message of appreciation, and engage with the content creators.'
    }
  ]
  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">How it Works</h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {steps.map((step)=> (
          <div key={step.title} className="flex bg-white py-3 rounded-md flex-col items-center text-black max-w-[250px] px-2 min-h-[220px]">
            <div className="w-16 h-16 bg-gray-800 text-white rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-semibold">{steps.indexOf(step) + 1}</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default HowItWorks;
