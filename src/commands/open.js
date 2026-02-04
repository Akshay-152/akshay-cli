const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const chalk = require("chalk");

module.exports = function openCommand(file) {
  if (!file.endsWith(".akshay")) file += ".akshay";

  const filePath = path.join(process.cwd(), file);

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("❌ File not found"));
    return;
  }

  exec(`start "" "${filePath}"`, err => {
    if (err) {
      console.log(chalk.red("❌ Failed to open file"));
    }
  });
};
