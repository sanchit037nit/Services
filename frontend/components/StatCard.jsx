import React from "react";

const StatCard = ({ title, value, icon }) => {

    return (

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-400">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                </div>

                <div className="text-3xl text-blue-400">

                    {icon}

                </div>

            </div>

        </div>

    );

};

export default StatCard;