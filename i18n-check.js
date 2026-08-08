/**
 * Build-time guard: every locale must define exactly the same keys as English,
 * with the same arity for parameterised strings. Run with `npm test`.
 */
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

// Evaluate just the dictionary literal out of the bundle.
const start = script.indexOf("var I18N = {");
if (start < 0) {
  console.error("i18n-check: could not find the I18N dictionary");
  process.exit(1);
}
const tail = script.slice(start);
const end = tail.indexOf("\n  };");
const source = tail.slice(0, end + 5).replace(/^var I18N = /, "");
const I18N = eval("(" + source.replace(/;$/, "") + ")");

const locales = Object.keys(I18N);
const base = "en";
let failed = 0;

function report(msg) {
  console.error("i18n-check: " + msg);
  failed++;
}

if (!I18N[base]) report("missing base locale '" + base + "'");

const baseKeys = Object.keys(I18N[base]).sort();
locales.forEach((loc) => {
  const keys = Object.keys(I18N[loc]).sort();
  baseKeys.forEach((k) => {
    if (!(k in I18N[loc])) report(loc + " is missing key '" + k + "'");
  });
  keys.forEach((k) => {
    if (!(k in I18N[base])) report(loc + " has extra key '" + k + "' not in " + base);
  });
  baseKeys.forEach((k) => {
    const a = I18N[base][k], b = I18N[loc][k];
    if (b === undefined) return;
    if (typeof a !== typeof b) {
      report(loc + "." + k + " is " + typeof b + " but " + base + "." + k + " is " + typeof a);
    } else if (typeof a === "function" && a.length !== b.length) {
      report(loc + "." + k + " takes " + b.length + " args but " + base + " takes " + a.length);
    } else if (typeof a === "string" && !b.trim()) {
      report(loc + "." + k + " is empty");
    }
  });
});

// Every data-i18n reference in the markup must resolve to a real key.
const refs = new Set();
html.replace(/data-i18n(?:-title)?="([^"]+)"/g, (_m, k) => refs.add(k));
refs.forEach((k) => {
  if (!(k in I18N[base])) report("markup references unknown key '" + k + "'");
});

if (failed) {
  console.error("i18n-check: " + failed + " problem(s)");
  process.exit(1);
}
console.log(
  "i18n-check: OK — " + locales.length + " locales (" + locales.join(", ") + "), " +
  baseKeys.length + " keys, " + refs.size + " markup references"
);
