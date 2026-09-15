import { executeCode } from "../services/jdoodle.service.js";

export const runCode = async (req, res) => {
    try {
        const { language, code, input } = req.body;

        const result = await executeCode(
            language,
            code,
            input
        );

        console.log(result);

        res.json({
            success: true,
            result,
        });

    } catch (err) {

        console.log("Run code error:", err);

        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};