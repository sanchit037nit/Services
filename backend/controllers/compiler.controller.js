import {executeCode,getResult,} from "../services/judge0.service.js";

export const runCode = async (req, res) => {
  try {
    const { language, code, input } = req.body;
    
      const token = await executeCode(language, code, input);
      console.log(token)

    res.json({
      success: true,
      token,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const { token } = req.params;

    const result = await getResult(token);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};