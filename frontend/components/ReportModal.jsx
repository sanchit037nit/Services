import { useState } from "react";

const reasons = [
    "Spam",
    "Abusive",
    "Not Coding Related",
    "Duplicate"
];

const ReportModal = ({
    open,
    onClose,
    onSubmit
}) => {

    const [reason, setReason] = useState("");

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">

            <div className="bg-[#1e1e1e] rounded-xl w-[420px] p-6 shadow-xl">

                <h2 className="text-2xl font-semibold text-white">

                    Report Post

                </h2>

                <p className="text-gray-400 mt-2">

                    Help us keep Codezy focused on programming.

                </p>

                {/* Radio Buttons */}

                <div className="mt-5 space-y-3">

                    {reasons.map((item) => (

                        <label
                            key={item}
                            className="flex items-center gap-3 cursor-pointer text-white"
                        >

                            <input
                                type="radio"
                                value={item}
                                checked={reason === item}
                                onChange={(e) => setReason(e.target.value)}
                            />

                            {item}

                        </label>

                    ))}

                </div>

                {/* Buttons */}

                <div className="flex justify-end gap-3 mt-8">

                    <button
                        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
                        onClick={() => {

                            setReason("");

                            onClose();

                        }}
                    >

                        Cancel

                    </button>

                    <button
                        disabled={!reason}
                        className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50"
                        onClick={() => {

                            onSubmit(reason);

                            setReason("");

                        }}
                    >

                        Submit

                    </button>

                </div>

            </div>

        </div>

    );

};

export default ReportModal;