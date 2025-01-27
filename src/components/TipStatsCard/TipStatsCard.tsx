import React from "react";

interface TipStatsCardProps {
  title: string;
  value: string | number;
  gradientFrom: string;
  gradientTo: string;
}

const TipStatsCard: React.FC<TipStatsCardProps> = ({ title, value, gradientFrom, gradientTo }) => {
  return (
    <div className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white p-6 rounded-lg`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default TipStatsCard;