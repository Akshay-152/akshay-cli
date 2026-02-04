const fs = require("fs");
const chalk = require("chalk");

const KEY = "AKSHAY_LDEF_2026";

function encrypt(text) {
  let out = "";
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(
      text.charCodeAt(i) ^ KEY.charCodeAt(i % KEY.length)
    );
  }
  return Buffer.from(out, "binary").toString("base64");
}

module.exports = function createCommand(name) {
  const file = name.endsWith(".akshay") ? name : `${name}.akshay`;

  if (fs.existsSync(file)) {
    console.log(chalk.red("❌ File already exists"));
    return;
  }

  const data = {
    v: 2,
    blocks: [],
    nextBlockId: 1
  };

  fs.writeFileSync(file, encrypt(JSON.stringify(data)));
  console.log(chalk.green(`✅ Created ${file}`));
};
