import React from 'react';
import { FaRegHandshake, FaArrowCircleUp } from 'react-icons/fa';

interface ITipButtonProps {
  onClick: () => void;
}

const TipButtons = ({onClick}:ITipButtonProps) => {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      <button onClick={onClick} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-600 transition-all duration-300">
        <FaArrowCircleUp className="text-xl" />
        <span>Send Tip</span>
      </button>
      <button className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 text-lg font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 transition-all duration-300">
        <FaRegHandshake className="text-xl" />
        <span>Receive Tip</span>
      </button>
    </div>
  );
};

export default TipButtons;
