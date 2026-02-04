const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");
const chalk = require("chalk");
const { resolveTarget } = require("../utils/resolve");
const { buildEditorHTML } = require("../utils/editorTemplate");

const KEY = "AKSHAY_LDEF_2026";

function decrypt(base64) {
  // Normalize base64 (browser + node safe)
  let clean = base64
    .toString()
    .trim()
    .replace(/\r?\n|\r/g, "") // remove newlines
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  // Fix missing padding
  while (clean.length % 4 !== 0) {
    clean += "=";
  }

  let binary;
  try {
    binary = Buffer.from(clean, "base64").toString("binary");
  } catch {
    throw new Error("Base64 decode failed");
  }

  let out = "";
  for (let i = 0; i < binary.length; i++) {
    out += String.fromCharCode(
      binary.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length)
    );
  }

  try {
    return JSON.parse(out);
  } catch {
    throw new Error("JSON parse failed");
  }
}





module.exports = function infoCommand(input, options) {
  let filePath;

  try {
    filePath = resolveTarget(input);
  } catch (e) {
    console.log(chalk.red("❌ " + e.message));
    return;
  }

  if (!path.isAbsolute(filePath)) {
    filePath = path.join(process.cwd(), filePath);
  }

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red("❌ File not found"));
    return;
  }

  const encrypted = fs.readFileSync(filePath, "utf8");
  let data;

  try {
    data = decrypt(encrypted);
  } catch {
    console.log(chalk.red("❌ Invalid or corrupted .akshay file"));
    return;
  }

  // ---- OPEN MODE ----
if (options.open) {
  const os = require("os");
  const { exec } = require("child_process");
  const { buildEditorHTML } = require("../utils/editorTemplate");

  const html = buildEditorHTML(data);

  const tempFile = path.join(
    os.tmpdir(),
    `akshay-editor-${Date.now()}.html`
  );

  fs.writeFileSync(tempFile, html, "utf8");

  // Open in default browser (Windows-safe)
  exec(`start "" "${tempFile}"`);

  console.log(chalk.green("🖥️ Opened in Akshay Secure Cloud Editor"));
  console.log(chalk.cyan("🔗 Editor link:"));
  console.log(chalk.gray(`file://${tempFile.replace(/\\/g, "/")}`));
  console.log();
  console.log(chalk.yellow("✏️ Edit freely in the editor"));
  console.log(chalk.yellow("💾 Use “Save File (.akshay)” inside the editor to save changes"));

  return; // IMPORTANT: stop further execution
}


  // ---- DEFAULT (SHOW STRUCTURE) ----
  console.log(chalk.cyan("\n📄 Akshay File"));
  console.log("Blocks:", data.blocks.length);
  data.blocks.forEach((b, i) => {
    console.log(`[${i + 1}] ${b.type}`);
  });
};
