import React from "react";

const StatCard = ({ title, value, icon, accent = "amber" }) => {

  const accents = {
    amber: "text-[#F5A623] bg-[#F5A623]/10 border-[#F5A623]/20",
    teal: "text-[#2DD4BF] bg-[#2DD4BF]/10 border-[#2DD4BF]/20",
    violet: "text-[#8B7FD6] bg-[#8B7FD6]/10 border-[#8B7FD6]/20",
  };

  return (
    <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 font-mono">
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className="text-xs text-[#8B8FA3] tracking-wide">{title}</p>
          <h2 className="text-3xl font-bold mt-2 text-[#E6E8EB]">{value}</h2>
        </div>

        <div className={`w-11 h-11 flex items-center justify-center rounded-md border text-lg shrink-0 ${accents[accent]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;