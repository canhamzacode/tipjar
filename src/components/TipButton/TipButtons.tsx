import React from 'react';
import { FaRegHandshake, FaArrowCircleUp } from 'react-icons/fa';

interface ITipButtonProps {
  sendTip: () => void;
  receiveTip: () => void;
}

const TipButtons = ({ sendTip, receiveTip }:ITipButtonProps) => {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      <button onClick={sendTip} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-r transition-all duration-300 hover:border-purple-600 text-base flex items-center gap-2">
        <FaArrowCircleUp className="text-xl" />
        <span>Send Tip</span>
      </button>
      <button onClick={receiveTip} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gradient-to-r transition-all duration-300 hover:border-purple-600 text-base flex items-center gap-2">
        <FaRegHandshake className="text-xl" />
        <span>Receive Tip</span>
      </button>
    </div>
  );
};

export default TipButtons;
