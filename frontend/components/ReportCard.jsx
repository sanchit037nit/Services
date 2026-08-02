import React from "react";
import { FaEye, FaTimes, FaTrash } from "react-icons/fa";
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
    if (window.confirm("Delete this post permanently?")) {
      deleteReportedPost(report.post._id);
    }
  };

  return (

    <div className="bg-[#10141F] border border-white/10 rounded-lg p-6 font-mono">

      {/* Header */}
      <div className="flex justify-between items-start gap-4 flex-wrap">

        <div>
          <h2 className="text-base font-semibold text-[#E6E8EB]">
            {report.post?.doubt}
          </h2>

          <p className="text-[#5C6370] text-xs mt-1">
            posted by{" "}
            <span className="text-[#8B8FA3]">
              {report.post?.createdby?.name}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-md shrink-0">
          <MdReport size={16} />
          <span className="text-xs font-semibold">
            {report.reportCount || 1} reports
          </span>
        </div>

      </div>

      {/* Description */}
      <p className="text-[#8B8FA3] text-sm leading-relaxed mt-4">
        {report.post?.description}
      </p>

      {/* Reasons */}
      <div className="mt-5">
        <h3 className="text-xs text-[#8B8FA3] tracking-wide mb-2">
          report reasons
        </h3>

        <div className="space-y-2">
          {report.reports?.map((item) => (
            <div
              key={item._id}
              className="bg-[#0B0E14] border border-white/10 rounded-md p-3"
            >
              <p className="text-sm text-[#E6E8EB]">
                <span className="font-semibold text-[#8B7FD6]">
                  {item.reportedBy?.name}
                </span>
                <span className="text-[#5C6370]"> — </span>
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-6 flex-wrap">

        <button
          disabled={loading}
          onClick={handleview}
          className="flex items-center gap-2 border border-[#8B7FD6]/30 text-[#8B7FD6] hover:bg-[#8B7FD6]/10 px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <FaEye className="w-3.5 h-3.5" />
          View post
        </button>

        <button
          disabled={loading}
          onClick={handleReject}
          className="flex items-center gap-2 border border-[#F5A623]/30 text-[#F5A623] hover:bg-[#F5A623]/10 px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <FaTimes className="w-3.5 h-3.5" />
          Reject report
        </button>

        <button
          disabled={loading}
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-50"
        >
          <FaTrash className="w-3.5 h-3.5" />
          Delete post
        </button>

      </div>

    </div>

  );
};

export default ReportCard;