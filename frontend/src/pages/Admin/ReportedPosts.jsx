import React, { useEffect } from "react";
import { useReportStore } from "../../store/useReportStore";
import ReportCard from "../../../components/ReportCard";

const ReportedPosts = () => {

    const {

        reportedPosts,

        getReportedPosts,

        loading,

    } = useReportStore();

    useEffect(() => {

        getReportedPosts();

    }, []);

    if (loading) {

        return <h1>Loading...</h1>;

    }

    return (

        <div className="w-full flex flex-col items-center py-12  bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white min-h-screen">

            <h1 className="text-3xl font-bold mb-6">

                Reported Posts

            </h1>

            <div className="space-y-5">

                {reportedPosts.length === 0 ? (

                    <p>No Reports Found</p>

                ) : (

                    reportedPosts.map((report) => (

                        <ReportCard

                            key={report._id}

                            report={report}

                        />

                    ))

                )}

            </div>

        </div>

    );

};

export default ReportedPosts;