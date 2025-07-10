// utils/pathUtil.js
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Move one level up from /utils to project root
const rootDir = path.resolve(__dirname, "..");

export default rootDir;
