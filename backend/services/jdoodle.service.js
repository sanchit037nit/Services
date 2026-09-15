import axios from "axios";

const JDOODLE_URL = "https://api.jdoodle.com/v1/execute";

const languageMap = {
    cpp: {
        language: "cpp",
        versionIndex: "5",
    },
    c: {
        language: "c",
        versionIndex: "5",
    },
    java: {
        language: "java",
        versionIndex: "5",
    },
    python: {
        language: "python3",
        versionIndex: "4",
    },
    javascript: {
        language: "nodejs",
        versionIndex: "4",
    },
};

export const executeCode = async (
    language,
    code,
    input = ""
) => {

    const languageInfo = languageMap[language];

    console.log(languageInfo);

    if (!languageInfo) {
        throw new Error("Unsupported language");
    }

    try {

        const res = await axios.post(
            JDOODLE_URL,
            {
                clientId: process.env.JDOODLE_CLIENT_ID,
                clientSecret: process.env.JDOODLE_CLIENT_SECRET,

                script: code,

                language: languageInfo.language,
                versionIndex: languageInfo.versionIndex,

                stdin: input,
            }
        );

        console.log("JDoodle response received");

        return res.data;

    } catch (error) {

        console.log("JDoodle error:");

        console.log(
            "Data:",
            error.response?.data
        );

        console.log(
            "Status:",
            error.response?.status
        );

        console.log(
            "Headers:",
            error.response?.headers
        );

        throw error;
    }
};