import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContestStore } from "../store/useContestStore";
import { motion } from "framer-motion";

export default function Contests() {
  const { contests, fetchContests, isLoading } = useContestStore();

  useEffect(() => {
    fetchContests();
  }, [fetchContests]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-transparent">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-ring loading-lg text-[#F5A623]"></span>
          <p className="text-[#8B8FA3] font-mono animate-pulse tracking-widest uppercase text-xs">Scanning the globe for contests...</p>
        </div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#fdf6e3] dark:bg-[#10141F] text-[#0f172a] dark:text-[#E6E8EB] p-6 md:p-10 font-mono transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight flex items-center justify-center md:justify-start gap-3">
              <span className="text-[#F5A623] drop-shadow-[0_0_15px_rgba(245,166,35,0.4)]">🏆</span> 
              <span className="bg-gradient-to-r from-[#F5A623] to-[#FF7B00] bg-clip-text text-transparent">
                Contest Arenas
              </span>
            </h1>
            <p className="text-[#64748b] dark:text-[#8B8FA3] max-w-2xl text-sm leading-relaxed">
              Global competitive programming hubs. Strategize before the event, discuss solutions live, and learn from top-tier developers worldwide.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="px-6 py-4 rounded-2xl bg-white/40 dark:bg-[#1A1F2C]/60 border border-white/20 dark:border-white/10 backdrop-blur-xl shadow-lg">
              <p className="text-xs text-[#64748b] dark:text-[#8B8FA3] uppercase tracking-wider font-semibold mb-1">Total Arenas</p>
              <p className="text-4xl font-black text-[#F5A623]">{contests.length}</p>
            </div>
          </div>
        </motion.div>
        
        {/* Contests Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {contests.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="inline-block p-6 rounded-full bg-black/5 dark:bg-white/5 mb-4">
                <span className="text-4xl">🏜️</span>
              </div>
              <p className="text-lg text-[#8B8FA3] font-semibold">No upcoming contests found.</p>
              <p className="text-sm text-[#8B8FA3]/70 mt-2">The arenas are quiet... for now.</p>
            </div>
          ) : (
            contests.map((contest) => (
              <motion.div 
                key={contest._id} 
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-3xl bg-white dark:bg-[#1A1F2C] border border-[#e2e8f0] dark:border-white/5 shadow-xl hover:shadow-2xl hover:shadow-[#F5A623]/20 overflow-hidden transition-all duration-300 flex flex-col"
              >
                {/* Glowing Top Banner */}
                <div className={`h-2 w-full transition-all duration-500 ${contest.status === 'ACTIVE' ? 'bg-gradient-to-r from-red-500 to-pink-500 group-hover:h-3' : 'bg-gradient-to-r from-[#F5A623] to-[#FF7B00] group-hover:h-3'}`}></div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-3 mb-6">
                    <h2 className="text-xl font-black leading-tight line-clamp-2 text-[#0f172a] dark:text-white">
                      {contest.contestName}
                    </h2>
                    <span className={`shrink-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1 ${
                      contest.status === 'ACTIVE' 
                        ? 'bg-red-500/10 text-red-500 border border-red-500/30' 
                        : 'bg-[#F5A623]/10 text-[#F5A623] border border-[#F5A623]/30'
                    }`}>
                      {contest.status === 'ACTIVE' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-1"></span>}
                      {contest.status === 'ACTIVE' ? 'Live' : 'Upcoming'}
                    </span>
                  </div>
                  
                  <div className="space-y-4 mb-8 flex-1">
                    {/* Platform Tag */}
                    <div className="inline-flex items-center gap-2 bg-[#f8fafc] dark:bg-black/20 px-3 py-2 rounded-xl border border-black/5 dark:border-white/5">
                      <div className="w-6 h-6 rounded-full bg-[#8B7FD6]/20 text-[#8B7FD6] flex items-center justify-center font-bold text-xs">
                        {contest.platform.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-[#64748b] dark:text-[#A0AEC0]">{contest.platform}</span>
                    </div>

                    {/* Timeline */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748b] font-semibold uppercase tracking-wider">Starts</span>
                        <span className="font-bold text-[#0f172a] dark:text-white">
                          {new Date(contest.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span className="opacity-50 text-[10px]">{new Date(contest.startTime).toLocaleDateString()}</span>
                        </span>
                      </div>
                      <div className="w-full h-px bg-[#e2e8f0] dark:bg-white/10"></div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#64748b] font-semibold uppercase tracking-wider">Ends</span>
                        <span className="font-bold text-[#0f172a] dark:text-white">
                          {new Date(contest.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} <span className="opacity-50 text-[10px]">{new Date(contest.endTime).toLocaleDateString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <Link 
                    to={`/contests/${contest._id}/chat`} 
                    className="block w-full text-center py-4 rounded-2xl bg-transparent border-2 border-[#F5A623] text-[#F5A623] font-black uppercase tracking-widest text-xs hover:bg-[#F5A623] hover:text-white dark:hover:text-[#10141F] hover:shadow-[0_0_20px_rgba(245,166,35,0.4)] transition-all duration-300 transform active:scale-95 mt-auto"
                  >
                    Enter Arena
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
