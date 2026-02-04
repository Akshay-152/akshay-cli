#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");
const path = require("path");

// Commands
const scan = require("../src/commands/scan");
const info = require("../src/commands/info");
const openCmd = require("../src/commands/open");
const list = require("../src/commands/list");
const create = require("../src/commands/create");

// Banner
console.log(
  chalk.cyan(figlet.textSync("Akshay CLI", { horizontalLayout: "full" }))
);

// Project marker
if (fs.existsSync(path.join(process.cwd(), ".absync"))) {
  console.log(chalk.green("✅ Akshay Project detected (.absync found)\n"));
} else {
  console.log(chalk.yellow("⚠️  No .absync file (working globally)\n"));
}

let commandHandled = false;

program
  .name("akshay")
  .version("2.0.0")
  .description("Akshay CLI – Manage .akshay files");

/* ---------------- COMMANDS ---------------- */

program.command("scan")
  .description("Scan directory for .akshay files")
  .option("-d, --depth <number>", "Scan depth", "3")
  .action((opts) => {
    commandHandled = true;
    scan(opts);
  });

program.command("list")
  .description("List .akshay files in current directory")
  .action(() => {
    commandHandled = true;
    list();
  });


program.on("command:*", () => {
  // prevent commander from exiting
});



program.command("info <file>")
  .description("Show information about a .akshay file")
  .option("--decrypt", "Decrypt preview")
  .option("--open", "Open visually in editor")
  .action((file, opts) => {
    commandHandled = true;
    info(file, opts);
  });

program.command("open <file>")
  .description("Open .akshay file in editor")
  .action((file) => {
    commandHandled = true;
    openCmd(file);
  });

program.command("create <name>")
  .description("Create a new .akshay file")
  .action((name) => {
    commandHandled = true;
    create(name);
  });

/* ---------------- PARSE ONCE ---------------- */
program
  .allowUnknownOption(true)
  .exitOverride(); // <-- CRITICAL

try {
  program.parse(process.argv);
} catch (err) {
  // Ignore unknown command errors – we handle them below
}

/* ---------------- INDEX SHORTCUT ROUTER ---------------- */

if (commandHandled) {
  process.exit(0);
}

const target = process.argv[2];

// akshay akshay[0] --open
if (/^akshay\[\d+\]$/.test(target)) {
  info(target, {
    decrypt: process.argv.includes("--decrypt"),
    open: process.argv.includes("--open")
  });
  process.exit(0);
}

// akshay demo --open
if (
  target &&
  !target.startsWith("-") &&
  !["scan", "list", "info", "open", "create"].includes(target)
) {
  info(target, {
    decrypt: process.argv.includes("--decrypt"),
    open: process.argv.includes("--open")
  });
  process.exit(0);
}



/* ---------------- DEFAULT HELP ---------------- */

if (!process.argv.slice(2).length) {
  program.help();
}
