import React from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { MdReport } from "react-icons/md";
import { useReportStore } from "../src/store/useReportStore";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ report }) => {
      const navigate = useNavigate();
    const {
        reviewReport,
        deleteReportedPost,
        loading,
    } = useReportStore();

    const handleview = () => {

            navigate("/Homepage/view");

    };

    const handleReject = () => {

        reviewReport(report._id, "reject");

    };

    const handleDelete = () => {

        if (
            window.confirm(
                "Delete this post permanently?"
            )
        ) {

            deleteReportedPost(report.post._id);

        }

    };

    return (

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">

            {/* Header */}

            <div className="flex justify-between items-center">

                <div>

                    <h2 className="text-xl font-semibold text-white">

                        {report.post?.doubt}

                    </h2>

                    <p className="text-gray-400 text-sm mt-1">

                        Posted by{" "}
                        <span className="text-white">

                            {report.post?.createdby?.name}

                        </span>

                    </p>

                </div>

                <div className="flex items-center gap-2 text-red-400">

                    <MdReport size={22} />

                    <span>

                        {report.reportCount || 1} Reports

                    </span>

                </div>

            </div>

            {/* Description */}

            <div className="mt-5">

                <p className="text-gray-300">

                    {report.post?.description}

                </p>

            </div>

            {/* Reasons */}

            <div className="mt-6">

                <h3 className="font-semibold mb-2">

                    Report Reasons

                </h3>

                <div className="space-y-2">

                    {report.reports?.map((item) => (

                        <div
                            key={item._id}
                            className="bg-gray-700 rounded-lg p-3"
                        >

                            <p className="text-sm text-gray-200">

                                <span className="font-semibold">

                                    {item.reportedBy?.name}

                                </span>

                                {" : "}

                                {item.reason}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

            {/* Actions */}

            <div className="flex gap-4 mt-6">

                <button
                    disabled={loading}
                    onClick={handleview}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
                >

                    <FaCheck />

                    View Post

                </button>

                <button
                    disabled={loading}
                    onClick={handleReject}
                    className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-5 py-2 rounded-lg"
                >

                    <FaTimes />

                    Reject Report

                </button>

                <button
                    disabled={loading}
                    onClick={handleDelete}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                >

                    <FaTrash />

                    Delete Post

                </button>

            </div>

        </div>

    );

};

export default ReportCard;