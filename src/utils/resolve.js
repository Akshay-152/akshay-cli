const path = require("path");
const { loadScan } = require("./cache");

function resolveTarget(input) {
  // Matches akshay[0]
  const match = input.match(/^akshay\[(\d+)\]$/);
  if (!match) return input;

  const index = Number(match[1]);
  const cache = loadScan();

  if (!cache || !cache[index]) {
    throw new Error("Invalid index or no scan cache found. Run `akshay scan` first.");
  }

  return cache[index].path;
}

module.exports = { resolveTarget };
