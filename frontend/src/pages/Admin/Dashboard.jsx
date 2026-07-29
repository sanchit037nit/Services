import React, { useEffect } from "react";
import { FaFlag, FaCheckCircle, FaTrash, FaUsers } from "react-icons/fa";
import { useReportStore } from "../../store/useReportStore";
import StatCard from "../../../components/StatCard";

const Dashboard = () => {

    const { stats, getReportStats } = useReportStore();

    useEffect(() => {

        getReportStats();

    }, []);

    return (

        <div className="w-full flex flex-col items-center py-12  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">

            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <StatCard
                    title="Total Reports"
                    value={stats.totalReports || 0}
                    icon={<FaFlag />}
                />

                <StatCard
                    title="Pending Reports"
                    value={stats.pendingReports || 0}
                    icon={<FaFlag />}
                />

                <StatCard
                    title="Removed Posts"
                    value={stats.removedPosts || 0}
                    icon={<FaTrash />}
                />

                <StatCard
                    title="Active Users"
                    value={stats.activeUsers || 0}
                    icon={<FaUsers />}
                />

            </div>

        </div>

    );

};

export default Dashboard;