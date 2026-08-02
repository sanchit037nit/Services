import React, { useEffect } from "react";
import { FaFlag, FaCheckCircle, FaTrash, FaUsers } from "react-icons/fa";
import { useReportStore } from "../../store/useReportStore";
import StatCard from "../../../components/StatCard";
import { useAuthstore } from "../../store/useAuthstore";
import { useDashboardStore } from "../../store/useDashboardStore";
import {
  ResponsiveContainer, LineChart, BarChart, Bar, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, AreaChart,
  Area, PieChart, Pie, Cell
} from "recharts";

const Dashboard = () => {

  const { dashboard, getDashboardStats, loading } = useDashboardStore();
  const { users, getusers } = useAuthstore();
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const reportData = dashboard?.monthlyReports?.map(item => ({
    month: months[item._id.month - 1],
    Reports: item.count
  })) || [];

  const monthlyPosts = dashboard?.monthlyPosts?.map(item => ({
    month: months[item._id.month - 1],
    Posts: item.count
  })) || [];

  const userGrowth = dashboard?.monthlyUsers?.map(item => ({
    month: months[item._id.month - 1],
    Users: item.count
  })) || [];

  const pieData = [
    { name: "Visible", value: dashboard?.totalPosts - dashboard?.hiddenPosts },
    { name: "Hidden", value: dashboard?.hiddenPosts },
  ];

  // palette-matched chart colors
  const AMBER = "#F5A623";
  const TEAL = "#2DD4BF";
  const VIOLET = "#8B7FD6";
  const RED = "#F87171";
  const GRID = "rgba(255,255,255,0.06)";
  const AXIS = "#5C6370";
  const PIE_COLORS = [TEAL, RED];

  const tooltipStyle = {
    backgroundColor: "#0D1017",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "6px",
    fontSize: "13px",
    fontFamily: "monospace",
    color: "#E6E8EB",
  };

  useEffect(() => {
    getDashboardStats();
    getusers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0B0E14] text-[#8B8FA3] font-mono text-sm">
        Loading dashboard...
      </div>
    );
  }

  const filteredUsers = users.filter((user) => user.role == 'user');

  return (

    <div className="relative min-h-screen w-full bg-[#0B0E14] text-[#E6E8EB] px-8 py-8 font-mono overflow-hidden">

      {/* subtle grid texture, consistent with the rest of the app */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#E6E8EB 1px, transparent 1px), linear-gradient(90deg, #E6E8EB 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">

        <div className="mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-[#8B7FD6]">&gt;</span> dashboard
          </h1>
          <p className="text-[#8B8FA3] text-sm mt-1">
            <span className="text-[#5C6370]">// </span>monitor users, reports and platform activity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">

          <StatCard
            title="Total Reports"
            value={dashboard?.totalReports || 0}
            icon={<FaFlag />}
            accent="violet"
          />

          <StatCard
            title="Pending Reports"
            value={dashboard?.totalReports}
            icon={<FaFlag />}
            accent="amber"
          />

          <StatCard
            title="Removed Posts"
            value={dashboard?.totalPosts}
            icon={<FaTrash />}
            accent="amber"
          />
          <StatCard
            title="Hidden Posts"
            value={dashboard?.hiddenPosts}
            icon={<FaTrash />}
            accent="violet"
          />

          <StatCard
            title="Total Users"
            value={dashboard?.totalUsers}
            icon={<FaUsers />}
            accent="teal"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 h-[400px]">
            <h2 className="text-sm text-[#8B8FA3] tracking-wide mb-5">monthly posts</h2>

            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={monthlyPosts}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                <XAxis dataKey="month" stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <YAxis stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#8B8FA3" }} />
                <Line type="monotone" dataKey="Posts" stroke={TEAL} strokeWidth={2.5} dot={{ fill: TEAL, r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 h-[400px]">
            <h2 className="text-sm text-[#8B8FA3] tracking-wide mb-5">monthly reports</h2>

            <ResponsiveContainer width="100%" height="90%">
              <BarChart data={reportData}>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                <XAxis dataKey="month" stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <YAxis stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "#8B8FA3" }} />
                <Bar dataKey="Reports" radius={[6, 6, 0, 0]} fill={RED} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 h-[400px]">
            <h2 className="text-sm text-[#8B8FA3] tracking-wide mb-5">new users</h2>

            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="userGrowthFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={AMBER} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={AMBER} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={GRID} />
                <XAxis dataKey="month" stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <YAxis stroke={AXIS} tick={{ fontSize: 12, fill: AXIS }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="Users" stroke={AMBER} strokeWidth={2} fill="url(#userGrowthFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 h-[400px]">
            <h2 className="text-sm text-[#8B8FA3] tracking-wide mb-5">posts status</h2>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label={{ fill: "#8B8FA3", fontSize: 12 }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={PIE_COLORS[index]} stroke="#0B0E14" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 xl:col-span-2 mt-2">

            <h2 className="text-sm text-[#8B8FA3] tracking-wide mb-5">recent reports</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-[#5C6370] text-xs">
                    <th className="py-3 font-medium">reporter</th>
                    <th className="py-3 font-medium">post</th>
                    <th className="py-3 font-medium">reason</th>
                    <th className="py-3 font-medium">date</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard?.recentReports?.map((report) => (
                    <tr
                      key={report._id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 flex items-center gap-3">
                        <img
                          src={report.reporter.profilephoto || "/avatar-placeholder.png"}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                          alt="avatar"
                        />
                        <span className="text-[#E6E8EB]">{report.reporter.name}</span>
                      </td>

                      <td className="py-3 text-[#8B8FA3]">
                        {report.post?.doubt}
                      </td>

                      <td className="py-3">
                        <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md text-xs">
                          {report.reason}
                        </span>
                      </td>

                      <td className="py-3 text-[#5C6370] text-xs">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

  );

};

export default Dashboard;