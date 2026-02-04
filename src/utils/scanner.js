const fs = require("fs");
const path = require("path");

function scanDir(dir, depth, maxDepth, results) {
  if (depth > maxDepth) return;

  let files;
  try {
    files = fs.readdirSync(dir);
  } catch {
    return;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);

    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch {
      continue;
    }

    if (stat.isDirectory()) {
      scanDir(fullPath, depth + 1, maxDepth, results);
    } else if (file.endsWith(".akshay")) {
      results.push({
        name: file,
        path: fullPath,
        size: (stat.size / 1024).toFixed(2) + " KB",
        modified: stat.mtime
      });
    }
  }
}

function scanAkshayFiles(startDir, maxDepth = 3) {
  const results = [];
  scanDir(startDir, 0, maxDepth, results);
  return results;
}

module.exports = { scanAkshayFiles };
