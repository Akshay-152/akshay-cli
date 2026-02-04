const fs = require("fs");
const path = require("path");

const CACHE_FILE = path.join(
  process.env.TEMP || process.env.TMP || process.cwd(),
  "akshay-cache.json"
);

function saveScan(files) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(files, null, 2));
}

function loadScan() {
  if (!fs.existsSync(CACHE_FILE)) return null;
  return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
}

module.exports = { saveScan, loadScan };
