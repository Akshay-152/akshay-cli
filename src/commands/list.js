const chalk = require("chalk");
const fs = require("fs");

module.exports = function listCommand() {
  const files = fs.readdirSync(process.cwd())
    .filter(f => f.endsWith(".akshay"));

  if (!files.length) {
    console.log(chalk.yellow("⚠️  No .akshay files in current directory"));
    return;
  }

  console.log(chalk.cyan("\n📄 .akshay files:\n"));
  files.forEach(f => console.log(" • " + chalk.green(f)));
};
