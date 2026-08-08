# Simple Mindmap

A zero-dependency, single-file interactive mind map editor. Build and reorganize hierarchical maps, collapse branches, customize colors, import and export Markdown, back up data as JSON, and create polished PDF documents. The app includes an Australian Enterprise Agreement (EBA) compliance rule library as a ready-to-use example.

## Try it online

**<https://thundom.github.io/simplemindmap/>**

Open the page and start working immediately. Your maps are stored locally in your browser with `localStorage`; there is no server, account, or sign-in requirement.

## Windows desktop app

Download the latest build from [Releases](../../releases):

- `Simple Mindmap-Setup-x.x.x.exe` — installer with a selectable installation directory
- `Simple Mindmap-Portable-x.x.x.exe` — portable version that runs without installation

Pushing a `v*` tag, such as `v1.0.0`, automatically builds and publishes both Windows packages through GitHub Actions.

## Local development and packaging

```bash
npm install
npm start        # Run the app in an Electron desktop window
npm run dist     # Build the Windows installer and portable app in dist/
```

Do not want to install Node.js? Open `index.html` directly. The complete web application lives in that single file.

## Features

| Feature | Description |
| --- | --- |
| Map library | A side drawer lists saved maps with their name, modification time, and node count. Open, rename, or delete any map. |
| Flexible storage | The desktop app saves each map as an individual `.json` file in a folder you choose. The web app stores maps in the browser. |
| Read-only sharing | Generate a shareable URL containing a compressed copy of the entire map. Recipients can view and export it without changing it or adding it to their library. |
| New maps | Clear the canvas and begin with a single root node. A double confirmation prevents accidental data loss. |
| Fast editing | Double-click a node to edit its text. Press Tab to add a child, Enter to add a sibling, or Delete to remove a node. |
| Drag and drop | Drop onto the center of a node to make it the parent, or onto the upper or lower edge to insert before or after it. |
| Two-sided layout | Drop a top-level branch beside the left or right side of the root node to choose its direction and create a radial, snowflake-like map. |
| Collapsible branches | Collapse any node to hide its descendants and display the hidden-node count. Expanding and collapsing use smooth animations. |
| Branch colors | Choose from a 10-color palette. A top-level color applies to its entire branch, while individual descendants can override it. |
| Markdown export | Export a standard Markdown nested list with a `# Heading` followed by indented `- ` list items. |
| JSON backup | Create a complete backup that preserves content, colors, and collapsed states. |
| Import | Import Markdown (`.md` or `.txt`) or a JSON backup created by Simple Mindmap. |
| PDF export | Generate a structured, print-ready A4 document and save it as a PDF from the print dialog. |
| Built-in example | Load the included EBA compliance rule library to explore the app with a substantial sample map. |
| Multilingual interface | Switch between Chinese, English, and Japanese from the top-left toolbar. All interface text and messages change together. |
| Automatic theme | The interface follows the system light or dark color scheme. |

## Markdown format

```markdown
# Mind Map Title

- First branch
  - Child node
    - Grandchild node
- Another branch
```

Indentation is detected automatically, so two spaces, four spaces, and tabs are all supported. Markdown stores content only; use a JSON backup to preserve colors and collapsed states.

## Localization

Interface copy is stored in the `I18N` dictionary in `index.html`, with Chinese, English, and Japanese translations kept side by side. On first launch, the app selects a language from the browser locale and remembers the user's choice afterward.

Run the localization check after changing interface text. It verifies that every locale has the same keys and placeholder counts and that every translation key referenced by the page exists:

```bash
npm test
```

The same check runs automatically in GitHub Actions on every push.

## License

[MIT](LICENSE)
