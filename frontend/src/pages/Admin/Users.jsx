import React, { useEffect, useState } from "react";
import {
    FaUsers,
    FaSearch,
    FaTrash,
    FaUserShield,
    FaUserSlash,
    FaUserCheck,
    FaEye,
} from "react-icons/fa";
import { useAuthstore } from '../../store/useAuthstore'

const Users = () => {

    // const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const {getusers ,users,statusupdate} = useAuthstore()

    useEffect(() => {
        getusers()
    }, []);

        const handlestatusupdate= async(id) => {
            await statusupdate(id)
             await getusers();
    }

    const filteredUsers = users.filter((user) =>
       ( user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ) &&
        user.role=='user'
    );



    return (

        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">

            {/* Heading */}

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-3xl font-bold flex items-center gap-3">

                        <FaUsers />

                        Users Management

                    </h1>

                    <p className="text-gray-400 mt-2">

                        Manage all registered users.

                    </p>

                </div>

            </div>

            {/* Statistics */}

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mb-8">

                <div className="bg-gray-800 rounded-xl p-5">

                    <p className="text-gray-400">

                        Total Users

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {users.filter(u => u.role === "user").length}

                    </h2>

                </div>

                <div className="bg-gray-800 rounded-xl p-5">

                    <p className="text-gray-400">

                        Active

                    </p>

                    <h2 className="text-3xl font-bold text-green-400 mt-2">

                        {users.filter(u => u.status === "Active" && u.role === "user").length}

                    </h2>

                </div>

                <div className="bg-gray-800 rounded-xl p-5">

                    <p className="text-gray-400">

                        Blocked

                    </p>

                    <h2 className="text-3xl font-bold text-red-400 mt-2">

                        {users.filter(u => u.status === "Blocked").length}

                    </h2>

                </div>

                <div className="bg-gray-800 rounded-xl p-5">

                    <p className="text-gray-400">

                        Admins

                    </p>

                    <h2 className="text-3xl font-bold text-yellow-400 mt-2">

                        {users.filter(u => u.role === "Admin").length}

                    </h2>

                </div>

            </div>

            {/* Search */}

            <div className="relative mb-6">

                <FaSearch className="absolute top-3.5 left-4 text-gray-400" />

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-gray-800 rounded-lg pl-11 pr-4 py-3 outline-none border border-gray-700 focus:border-blue-500"
                />

            </div>

            {/* Table */}

            <div className="overflow-x-auto rounded-xl">

                <table className="w-full">

                    <thead className="bg-gray-800">

                        <tr>

                            <th className="p-4 text-left">

                                Name

                            </th>

                            <th className="p-4 text-left">

                                Email

                            </th>

                            <th className="p-4 text-left">

                                Role

                            </th>



                            <th className="p-4 text-left">

                                Status

                            </th>

                            <th className="p-4 text-left">

                                Joined

                            </th>

                            <th className="p-4 text-center">

                                Actions

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map((user) => (

                            <tr
                                key={user._id}
                                className="border-b border-gray-800 hover:bg-gray-900 transition"
                            >

                                <td className="p-4 font-medium">

                                    {user.name}

                                </td>

                                <td className="p-4 text-gray-400">

                                    {user.email}

                                </td>

                                <td className="p-4">

                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        user.role === "Admin"
                                            ? "bg-yellow-500/20 text-yellow-400"
                                            : "bg-blue-500/20 text-blue-400"
                                    }`}>

                                        {user.role}

                                    </span>

                                </td>



                                <td className="p-4">

                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                        user.status === "Active"
                                            ? "bg-green-500/20 text-green-400"
                                            : "bg-red-500/20 text-red-400"
                                    }`}>

                                        {user.status}

                                    </span>

                                </td>

                                <td className="p-4">

                                    {new Date(user.createdAt).toLocaleDateString()}

                                </td>

                                <td className="p-4">

                                    <div className="flex justify-center gap-3">

                                        <button
                                            className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700"
                                            title="View"
                                        >

                                            <FaEye />

                                        </button>

                                        {user.status === "Active" ? (

                                            <button
                                                className="p-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
                                                title="Block User"
                                                onClick={() => handlestatusupdate(user._id)}
                                            >

                                                <FaUserSlash />

                                            </button>

                                        ) : (

                                            <button
                                                className="p-2 rounded-lg bg-green-600 hover:bg-green-700"
                                                    title="Unblock User"
                                                    onClick={() => handlestatusupdate(user._id)}
                                            >

                                                <FaUserCheck />

                                            </button>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {filteredUsers.length === 0 && (

                    <div className="text-center py-10 text-gray-500">

                        No users found.

                    </div>

                )}

            </div>



            <div className="flex justify-between items-center mt-8">

                <p className="text-gray-400">

                    Showing {filteredUsers.length} users

                </p>



            </div>

        </div>

    );

};

export default Users;