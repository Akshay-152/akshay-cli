const chalk = require("chalk");
const Table = require("cli-table3");
const { scanAkshayFiles } = require("../utils/scanner");
const { saveScan } = require("../utils/cache");

module.exports = function scanCommand(options) {
  const depth = parseInt(options.depth || 3);
  const files = scanAkshayFiles(process.cwd(), depth);

  if (!files.length) {
    console.log(chalk.yellow("⚠️  No .akshay files found"));
    return;
  }

  // Save for index-based access
  saveScan(files);

  console.log(chalk.cyan("\n📄 Found .akshay files:\n"));

  files.forEach((f, i) => {
    console.log(
      chalk.yellow(`[${i}]`) + " " +
      chalk.green(f.name)
    );
  });

  console.log(
    chalk.green(`\n✅ ${files.length} file(s) cached for quick access`)
  );
};
