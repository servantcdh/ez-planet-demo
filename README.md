# EZ Planet Demo

Interactive demos for **EZ Planet** libraries.

## Labeling Workspace

Multi-content-type annotation editor ([`@servantcdh/ez-planet-labeling`](https://www.npmjs.com/package/@servantcdh/ez-planet-labeling))

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/servantcdh/ez-planet-demo/tree/master/labeling)

```bash
cd labeling && npm install && npm run dev
```

### Segment Anything (SAM) Extension

The labeling demo includes a browser-based SAM extension powered by [`@servantcdh/ez-planet-labeling-sam`](https://www.npmjs.com/package/@servantcdh/ez-planet-labeling-sam). No backend server required — all inference runs locally in the browser.

**Models:**
- **SlimSAM-77** (`Xenova/slimsam-77-uniform`, q8) — lightweight image segmentation (~10-15 MB)
- **CLIP ViT-B/16** (`Xenova/clip-vit-base-patch16`, q8) — zero-shot classification (~85 MB)

Models are downloaded from Hugging Face Hub on first use and cached in the browser's Cache Storage.

**Modes:**
- **Interactive** — Left click (positive point), Right click (negative point), Drag (bounding box)
- **Auto** — Grid-based "segment everything" with configurable density (8x8 ~ 32x32), followed by automatic CLIP classification against policy classes

**Runtime:**
- WebGPU preferred, WASM fallback
- Image encoding: ~2-4s (WebGPU)
- Interactive decode: ~50-100ms per click
- Auto segment: depends on grid size (~30s for 16x16 with WebGPU)
- CLIP classification: ~1-2s per segment

**Usage in your own app:**

```bash
npm install @servantcdh/ez-planet-labeling @servantcdh/ez-planet-labeling-sam
```

```tsx
import { LabelingWorkspace, LabelingProviders, useToolbarSubMenuItemsStore,
         useExtensionFloatingPanelStore, useImageTypeLabelingToolSelectionStore
} from "@servantcdh/ez-planet-labeling";
import { createSamExtension, createSamTool } from "@servantcdh/ez-planet-labeling-sam";

// Register extension
const extensions = [createSamExtension({ policyClasses: [...] })];

// Register toolbar button
useToolbarSubMenuItemsStore.getState().setItems([{
  id: "demo-sam",
  iconType: "icon-seg-anything",
  name: "Segment Anything",
  shortcut: { key: "s", label: "S" },
  onClick: () => {
    useImageTypeLabelingToolSelectionStore.getState().setTool(createSamTool());
    useExtensionFloatingPanelStore.getState().openPanel("demo-sam");
  },
}]);

// Pass to workspace
<LabelingProviders data={...} mutations={...} dataset={...}>
  <LabelingWorkspace extensions={extensions} />
</LabelingProviders>
```

## Cosmos Canvas

3D MLOps universe navigation ([`@servantcdh/ez-planet-cosmos`](https://www.npmjs.com/package/@servantcdh/ez-planet-cosmos))

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/servantcdh/ez-planet-demo/tree/master/cosmos)

```bash
cd cosmos && npm install && npm run dev
```

## License

Demo code is provided for reference purposes only. The underlying libraries are proprietary — see their respective LICENSE files.
