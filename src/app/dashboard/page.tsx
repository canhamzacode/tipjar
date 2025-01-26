import { TipsTable, TipStatistics } from "@/components";


const Tip = () => {
  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <TipStatistics />
      <TipsTable />
    </div>
  );
};

export default Tip;
