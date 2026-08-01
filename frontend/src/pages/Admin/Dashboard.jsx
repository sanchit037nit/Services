import React, { useEffect } from "react";
import { FaFlag, FaCheckCircle, FaTrash, FaUsers } from "react-icons/fa";
import { useReportStore } from "../../store/useReportStore";
import StatCard from "../../../components/StatCard";
import { useAuthstore } from "../../store/useAuthstore";
import { useDashboardStore } from "../../store/useDashboardStore";
import { ResponsiveContainer, LineChart, BarChart, Bar,Line,CartesianGrid,XAxis,YAxis,Tooltip,Legend,AreaChart,
 Area, PieChart, Pie, Cell } from "recharts";



const Dashboard = () => {

    const { dashboard, getDashboardStats, loading } = useDashboardStore();
    const { users, getusers } = useAuthstore();
    const months = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const reportData =dashboard?.monthlyReports?.map(item => ({
    month: months[item._id.month-1],
    Reports: item.count
})) || [];
    
    const monthlyPosts =dashboard?.monthlyPosts?.map(item => ({

month: months[item._id.month - 1],

Posts: item.count

})) || [];
    
const userGrowth =dashboard?.monthlyUsers?.map(item=>({

month:months[item._id.month-1],

Users:item.count

})) || [];
    
    const pieData = [

{

name:"Visible",

value:dashboard?.totalPosts-dashboard?.hiddenPosts

},

{

name:"Hidden",

value:dashboard?.hiddenPosts

}

];
    const COLORS = ["#10B981", "#EF4444"];
    
    useEffect(() => {

        getDashboardStats();
        getusers()

    }, []);

    if (loading) {

    return (

        <div className="flex justify-center items-center min-h-screen text-white">

            Loading Dashboard...

        </div>

    );

    }
    
        const filteredUsers = users.filter((user) => user.role=='user');
    return (

<div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-8 py-8">

<div className="mb-8">
    <h1 className="text-4xl font-bold">
        Dashboard
    </h1>

    <p className="text-gray-400 mt-2">
        Monitor users, reports and platform activity
    </p>
</div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">

                <StatCard
                    title="Total Reports"
                    value={dashboard?.totalReports || 0}
                    icon={<FaFlag />}
                />

                <StatCard
                    title="Pending Reports"
                    value={dashboard?.totalReports}
                    icon={<FaFlag />}
                />

                <StatCard
                    title="Removed Posts"
                   value={dashboard?.totalPosts}
                    icon={<FaTrash />}
                />
                <StatCard
                    title="Hidden Posts"
                   value={dashboard?.hiddenPosts}
                    icon={<FaTrash />}
                />

                <StatCard
                    title="Total Users"
                    value={dashboard?.totalUsers}
                    icon={<FaUsers />}
                />
            </div>

            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-xl h-[420px]">

<h2 className="text-xl font-semibold mb-5">

Monthly Posts

</h2>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={monthlyPosts}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line

type="monotone"

dataKey="Posts"

stroke="#3B82F6"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

                </div>
                
               <div className="bg-gray-800 rounded-2xl p-6 shadow-xl h-[420px]">
    <h2 className="text-xl font-semibold mb-4">
        Monthly Reports
    </h2>

    <ResponsiveContainer width="100%" height={300}>

        <BarChart data={reportData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="month"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>

            <Bar
                dataKey="Reports"
                radius={[8,8,0,0]}
                fill="#EF4444"
            />

        </BarChart>

    </ResponsiveContainer>

</div>

               <div className="bg-gray-800 rounded-2xl p-6 shadow-xl h-[420px]">

<h2 className="text-xl font-semibold mb-4">

New Users

</h2>

<ResponsiveContainer width="100%" height={300}>

<AreaChart data={userGrowth}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Area

type="monotone"

dataKey="Users"

stroke="#3B82F6"

fill="#3B82F6"

/>

</AreaChart>

</ResponsiveContainer>

                </div>
                
                <div className="bg-gray-800 rounded-2xl p-6 shadow-xl h-[420px]">

<h2 className="text-xl font-semibold mb-4">

Posts Status

</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie

data={pieData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>

{

pieData.map((entry,index)=>(

<Cell

key={index}

fill={COLORS[index]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

                </div>
<div className="bg-gray-800 rounded-2xl p-6 shadow-xl mt-10">

    <h2 className="text-2xl font-semibold mb-6">
        Recent Reports
    </h2>

    <div className="overflow-x-auto">

        <table className="w-full text-left">

            <thead>

                <tr className="border-b border-gray-700">

                    <th className="py-3">Reporter</th>

                    <th className="py-3">Post</th>

                    <th className="py-3">Reason</th>

                    <th className="py-3">Date</th>

                </tr>

            </thead>

            <tbody>

                {dashboard?.recentReports?.map((report) => (

                    <tr
                        key={report._id}
                        className="border-b border-gray-700 hover:bg-gray-700 transition"
                    >

                        <td className="py-3 flex items-center gap-3">

                            <img
                                src={
                                    report.reporter.profilephoto ||
                                    "/avatar-placeholder.png"
                                }
                                className="w-10 h-10 rounded-full"
                            />

                            {report.reporter.name}

                        </td>

                        <td className="py-3">

                            {report.post?.doubt}

                        </td>

                        <td>

                            <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full">

                                {report.reason}

                            </span>

                        </td>

                        <td>

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

    );

};

export default Dashboard;