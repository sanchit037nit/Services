import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const dirCodes = path.join(process.cwd(), "temp", "codes");
const dirInputs = path.join(process.cwd(), "temp", "inputs");


if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}

if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
}

export const generateCodeFile = async (language, code) => {

    const extension = {
        cpp: "cpp",
        c: "c",
        python: "py",
        javascript: "js",
        java: "java",
    };

    const fileName = `${uuid()}.${extension[language]}`;

    const filePath = path.join(dirCodes, fileName);

    await fs.promises.writeFile(filePath, code);

    return filePath;
};

export const generateInputFile = async (input) => {

    const fileName = `${uuid()}.txt`;

    const filePath = path.join(dirInputs, fileName);

    await fs.promises.writeFile(filePath, input);

    return filePath;
};