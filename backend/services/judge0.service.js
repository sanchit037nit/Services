import axios from "axios";

const JUDGE0_URL = "http://localhost:2358";

const languageMap = {
  cpp: 54,
  c: 50,
  java: 62,
  python: 71,
  javascript: 63,
};

export const executeCode = async (language, code, input = "") => {
  const languageId = languageMap[language];
  console.log(languageId);


  if (!languageId) {
    throw new Error("Unsupported language");
  }

try {
  const res = await axios.post(
    `${JUDGE0_URL}/submissions?base64_encoded=false&wait=false`,
    {
      source_code: code,
      stdin: input,
      language_id: languageId,
    }
  );

  console.log("Response received");
  return res.data.token;

} catch(error) {
  console.log("Judge0 error:");
console.log("Data:", error.response?.data);
  console.log("Headers:", error.response?.headers);
}
};

export const getResult = async (token) => {
  const { data } = await axios.get(
    `${JUDGE0_URL}/submissions/${token}?base64_encoded=false`
  );
  console.log(data)
  return data;
};