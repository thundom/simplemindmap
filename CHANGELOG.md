# Version history

All notable Simple Mindmap releases are listed here.

## v1.8.1 — 2026-08-13

- Added high-visibility orange-red one-file app download buttons beside the product title and on the Launch page.
- Enabled one-finger canvas panning from both nodes and blank canvas space on touch devices while preserving precise desktop node dragging.
- Made the View ribbon the default on phone and touch-first layouts so pan, zoom, Fit and Center controls are immediately available.
- Rewrote download calls to action around the portable one-file benefit and added an explicit text link to the product overview on the GitHub homepage.
- Clarified the Launch page journey with separate “Test Simple Mindmap” and “Download the one-file app” actions.
- Made downloaded HTML copies start in English and replaced the highlighted download prompt with a neutral “Download another copy of the app” action.

## v1.8.0 — 2026-08-10

- Added an Office-style ribbon with grouped File, Edit, View, Format, Share and Help tabs, polished vector icons and a full-width focus toggle.
- Added a draggable floating tool rail that docks on either side, opens at mid-screen height and automatically collapses when inactive.
- Added a floating editable outline that shows the complete hierarchy and supports direct node renaming, creation, deletion and selection.
- Added embedded or URL-based images on any node, including captions and preservation in JSON backups and read-only HTML exports.
- Added separate clickable node hyperlinks with custom labels, preserved in backups and read-only HTML snapshots.
- Added nine display templates: Classic, Ocean, Forest, Sunset, Violet, Monochrome, Soft Rounded, Executive and Midnight.
- Added six interchangeable structural layouts: Logic, Mind Map, Reverse Logic, Organisation Chart, Fishbone and Reverse Fishbone.
- Added selectable labelled cross-node relationship arrows without changing the underlying hierarchy; vector endpoints remain attached to node borders through pan, zoom and layout changes.
- Added English-first Simplified Chinese, Traditional Chinese, Vietnamese and Japanese interface support.
- Added dynamic map statistics, improved responsive scaling and recalculated relationship geometry after Fit, zoom, reset, collapse and undo.
- Simplified distribution to the editable standalone HTML application and interactive read-only HTML exports; Windows installer and portable executable packaging were removed.
- Replaced the low-resolution README card with a scalable high-definition SVG and corrected every connector in the Launch preview.
- Replaced the Launch navigation mark with the official six-branch Simple Mindmap icon.
- Standardised the author and MIT copyright holder as Frank Liu while retaining `thundom` as the public GitHub identity.

## v1.7.1 — 2026-08-10

- Enabled the public GitHub Pages site with GitHub Actions as its deployment source, fixing the Web app link.
- Replaced the GitHub README hero with the compact rounded brand card selected for the project homepage.
- Replaced the Windows application icon with a matching six-branch Simple Mindmap brand mark.

## v1.7.0 — 2026-08-10

- Added a safe one-time migration for the untouched 95-node mixed-language EBA sample stored by older installations.
- Ensured the web app, Windows application and standalone HTML application all load the same 170-node English HRIS operating model.
- Added a build-time check that prevents CJK text from being added to the bundled sample.
- Expanded the GitHub README into a complete branded product overview with positioning, use cases, privacy guidance, edition comparison and controls.
- Added a corrected 1200 × 627 brand image with a topologically valid six-branch mind map and updated the Open Graph preview.

## v1.6.0 — 2026-08-10

- Added a polished English product launch page for public sharing and LinkedIn promotion.
- Added a dedicated 1200 × 627 social preview image and Open Graph metadata.
- Replaced the mixed-language EBA example with a 170-node English HRIS operating model.
- Distributed the HRIS sample across both sides of the centre node to demonstrate the radial layout immediately.
- Updated the README and GitHub Pages package so all public-facing project documentation is English.

## v1.5.0 — 2026-08-09

- Added drag-to-pan canvas navigation, including touch, Space-drag, and middle-mouse dragging.
- Added zoom controls and pointer-centred `Ctrl`+wheel zooming.
- Added Fit to screen, Center selected node, and Reset view controls.
- Added keyboard navigation between visible nodes plus `F`, `C`, `0`, `+`, and `-` view shortcuts.
- Added the same navigation module to standalone interactive read-only HTML exports.

## v1.4.0 — 2026-08-09

- Added persistent custom tab names: double-click a tab label to rename it without changing the centre node.
- Added standalone interactive read-only HTML export to the Share panel.
- Exported read-only HTML files work offline and allow branch expansion, collapse, and printing without exposing editing or saving controls.
- Added this version history and linked it from the README.

## v1.3.0 — 2026-08-09

- Added persistent multi-map tabs with independent Save behavior.
- Added new-map tabs that do not replace maps already open.
- Preserved open tabs and unsaved tab state across reloads.
- Kept saved maps in My maps when their tabs are closed.
- Added automatic standalone HTML application assets to the release workflow.

## v1.2.0 — 2026-08-09

- Added locked read-only share links with preview and clearer recipient guidance.
- Added responsive desktop, tablet, and phone layouts with larger touch targets.
- Added automatic centre-node positioning after initial load and screen rotation.
- Added canvas-based node dragging, two-sided root branches, Undo, modification history, and corrected connector lines.

## v1.1.0 — 2026-08-08

- Added the saved-map library and desktop folder-based JSON storage.
- Added the first read-only sharing workflow.
- Added browser-only storage guidance and desktop installer/portable releases.

## v1.0.0 — 2026-08-08

- Initial Simple Mindmap release.
- Included collapsible branches, colours, Markdown and JSON import/export, PDF output, multilingual UI, and the EBA compliance sample.
