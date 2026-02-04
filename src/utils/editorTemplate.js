const fs = require("fs");
const path = require("path");

function buildEditorHTML(data) {
  const editorPath = path.join(__dirname, "../../editor/deffe.html");
  let html = fs.readFileSync(editorPath, "utf8");

  // Inject preload data
  const inject = `
<script>
window.__AKSHAY_PRELOAD__ = ${JSON.stringify(data)};
</script>
`;

  html = html.replace("</head>", inject + "\n</head>");

  // Auto-load on startup
  html = html.replace(
    "window.addEventListener('DOMContentLoaded', () => {",
    `
window.addEventListener('DOMContentLoaded', () => {
  if (window.__AKSHAY_PRELOAD__) {
    loadData(window.__AKSHAY_PRELOAD__);
  }
`
  );

  return html;
}

module.exports = { buildEditorHTML };
