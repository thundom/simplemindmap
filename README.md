# Simple Mindmap

A zero-dependency, single-file interactive mind map editor. Build and reorganize hierarchical maps, collapse branches, customize colors, import and export Markdown, back up data as JSON, and create polished PDF documents. The app includes a substantial HRIS operating model as a ready-to-use example.

## Try it online

**<https://thundom.github.io/simplemindmap/>**

Explore the [product launch page](launch.html), use the ready-to-post [LinkedIn launch copy](LINKEDIN-LAUNCH.md), or see [CHANGELOG.md](CHANGELOG.md) for the complete version history.

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
| Persistent map tabs | Keep several mind maps open at once. Saving binds the current map to its own tab, `+` opens a new map without replacing the previous one, and open tabs return after a reload. Double-click a tab label to give it a persistent custom name. |
| Flexible storage | The desktop app saves each map as an individual `.json` file in a folder you choose. The web app stores maps in the browser. |
| Locked read-only sharing | Select Share to generate and copy a URL containing a compressed snapshot of the map. Recipients can view, collapse and export it, while editing, saving and adding it to My maps remain disabled. |
| Standalone read-only HTML | Download the current map as one interactive HTML file from Share. It works offline and supports pan, zoom, fit, node centring, expand, collapse and printing, without any editing or saving controls. |
| New maps | Open a blank mind map in a new tab without replacing or closing the maps already open. |
| Fast editing | Double-click a node to edit its text. Press Tab to add a child, Enter to add a sibling, or Delete to remove a node. |
| Canvas-based drag and drop | Drag any node at any depth. Drop near another node to change its parent or order, or drop into blank canvas space to promote it to a main branch. |
| Canvas navigation | Drag blank canvas space to pan instead of using the scrollbars; Space-drag or middle-drag works anywhere. Zoom with the toolbar or `Ctrl`+wheel, fit the full map to the screen, centre the selected node, or reset the view. Arrow keys move between visible nodes. |
| Two-sided layout | Drop a branch anywhere on the left or right side of the root to choose its direction. Left and right main branches coexist in a radial, snowflake-like map. |
| Undo and history | Every move, rename, add, delete, colour, and collapse action is recorded in a visible session history. Use the Undo button, select a history entry, or press `Ctrl+Z`. |
| Collapsible branches | Collapse any node to hide its descendants and display the hidden-node count. Expanding and collapsing use smooth animations. |
| Branch colors | Choose from a 10-color palette. A top-level color applies to its entire branch, while individual descendants can override it. |
| Markdown export | Export a standard Markdown nested list with a `# Heading` followed by indented `- ` list items. |
| JSON backup | Create a complete backup that preserves content, colors, and collapsed states. |
| Import | Import Markdown (`.md` or `.txt`) or a JSON backup created by Simple Mindmap. |
| PDF export | Generate a structured, print-ready A4 document and save it as a PDF from the print dialog. |
| Built-in example | Load the included English HRIS operating model to explore employee master data, organisation structures, lifecycle events, time, compensation, security, integrations and reporting. |
| Multilingual interface | Switch between Chinese, English, and Japanese from the top-left toolbar. All interface text and messages change together. |
| Responsive interface | The toolbar, panels, saved-map drawer, touch controls and canvas spacing adapt to desktop, tablet and phone screen sizes. |
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
