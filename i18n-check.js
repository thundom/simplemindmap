/**
 * Build-time guard: every locale must define exactly the same keys as English,
 * with the same arity for parameterised strings. Run with `npm test`.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const script = html.match(/<script>([\s\S]*)<\/script>/)[1];

// Evaluate just the dictionary literal out of the bundle.
const start = script.indexOf("var I18N = {");
if (start < 0) {
  console.error("i18n-check: could not find the I18N dictionary");
  process.exit(1);
}
const tail = script.slice(start);
const end = tail.indexOf("\n  var LANG_STORE");
if (end < 0) {
  console.error("i18n-check: could not find the end of the locale setup");
  process.exit(1);
}
const localeContext = {};
vm.runInNewContext(tail.slice(0, end), localeContext);
const I18N = localeContext.I18N;

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

// The bundled HRIS sample is public-facing content and must remain English.
const defaultStart = script.indexOf("var DEFAULT = [");
if (defaultStart < 0) {
  report("could not find the bundled DEFAULT sample");
} else {
  const defaultTail = script.slice(defaultStart).replace(/^var DEFAULT = /, "");
  const defaultEnd = defaultTail.indexOf("\n  ]];");
  if (defaultEnd < 0) {
    report("could not parse the bundled DEFAULT sample");
  } else {
    const sampleSource = defaultTail.slice(0, defaultEnd + "\n  ]];".length).replace(/;\s*$/, "");
    const sample = eval("(" + sampleSource + ")");
    const sampleText = JSON.stringify(sample);
    const cjk = sampleText.match(/[\u3040-\u30ff\u3400-\u9fff\uf900-\ufaff]/g) || [];
    if (cjk.length) report("bundled DEFAULT sample contains " + cjk.length + " CJK character(s)");
    if (sample[0] !== "HRIS Operating Model") report("bundled sample has an unexpected title");
    const countSampleNodes = (node) => 1 + (node[1] || []).reduce((sum, child) => sum + countSampleNodes(child), 0);
    if (countSampleNodes(sample) !== 170) report("bundled sample does not contain the expected 170 nodes");
    if ((sample[1] || []).length !== 7) report("bundled sample does not contain the expected 7 primary branches");
  }
}

// Exercise the exact legacy-sample detector used by the app. The fixture has
// the original 95-node fingerprint; a single user-added node must disable the
// migration so edited maps remain untouched.
const migrationStart = script.indexOf("var legacySampleMigrationEnabled");
const migrationEnd = script.indexOf("  lang = detectLang();", migrationStart);
if (migrationStart < 0 || migrationEnd < 0) {
  report("could not find the legacy sample migration");
} else {
  const context = { localStorage: { getItem: () => null } };
  vm.runInNewContext(script.slice(migrationStart, migrationEnd), context);
  const legacy = {
    text: "EBA Compliance Rule Library",
    children: [
      { text: "A. 规则来源与优先级", children: [] },
      { text: "National Employment Standards (NES)", children: [] }
    ]
  };
  while (context.plainNodeCount(legacy) < 95) {
    legacy.children.push({ text: "Legacy sample node", children: [] });
  }
  if (!context.isUntouchedLegacySample(legacy)) {
    report("legacy 95-node bundled sample is not recognised for migration");
  }
  legacy.children.push({ text: "User-created node", children: [] });
  if (context.isUntouchedLegacySample(legacy)) {
    report("an edited legacy map would be migrated unexpectedly");
  }
}

if (failed) {
  console.error("i18n-check: " + failed + " problem(s)");
  process.exit(1);
}
console.log(
  "i18n-check: OK — " + locales.length + " locales (" + locales.join(", ") + "), " +
  baseKeys.length + " keys, " + refs.size + " markup references, 170-node English HRIS sample"
);
