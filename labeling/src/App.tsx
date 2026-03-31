import { useEffect, useMemo } from "react";
import {
  LabelingWorkspace,
  LabelingProviders,
  staticData,
  IDLE_MUTATION,
  useFilterStore,
  useWorkspaceNavigationDetailSelectionStore,
  useToolbarSubMenuItemsStore,
  useExtensionFloatingPanelStore,
  useImageTypeLabelingToolSelectionStore,
  type LabelingDataContextValue,
  type LabelingMutationContextValue,
  type LabelingDatasetContextValue,
  type ExtensionSubMenuItem,
} from "@servantcdh/ez-planet-labeling";
import { createSamExtension, createSamTool } from "@servantcdh/ez-planet-labeling-sam";
import {
  CONTENT_COUNT,
  buildImageElements,
  buildTextElements,
  buildTableElements,
  samplePolicies,
} from "./sampleData";

const DATASET_ID = "dataset-demo-001";
const DATASET_VERSION = "v1";
const POLICY_IDS = samplePolicies.map((p) => p.id);
const NOW = new Date().toISOString();

// Single contentSetId = datasetId (gateway-style)
const CONTENT_SET_ID = DATASET_ID;

// Build all content elements once
const imageElements = buildImageElements(CONTENT_COUNT);
const textElements = buildTextElements(CONTENT_COUNT);
const tableElements = buildTableElements(CONTENT_COUNT);

// Seed filter store before mount
useFilterStore.getState().setFilter({
  policyIds: { operator: "IN", value: POLICY_IDS },
  datasetId: { operator: "EQ", value: DATASET_ID },
  datasetVersion: { operator: "EQ", value: DATASET_VERSION },
});

// ─── Data builders ──────────────────────────────────────────────

function buildPolicyDetails() {
  return samplePolicies.map((p) => ({
    id: p.id,
    basePolicyId: p.id,
    version: "1",
    baseVersion: "1",
    name: p.name,
    exist: true,
    classes: p.classes.map((c) => ({
      name: c.name,
      color: c.color,
      index: c.index,
      attributes: c.attributes ?? null,
    })),
    elements: [],
    tags: [],
    versions: [
      {
        id: `${p.id}-v1`,
        version: "1",
        classCount: p.classes.length,
        elementCount: 0,
        createdBy: "demo",
        createdDate: NOW,
      },
    ],
    zoneId: "demo",
    organizationId: "demo",
    accountId: "demo",
    userId: "demo",
    createdBy: "demo",
    createdDate: NOW,
    modifiedBy: "demo",
    modifiedDate: NOW,
  }));
}

function buildDataset() {
  return {
    id: DATASET_ID,
    orgId: "demo",
    zoneId: "demo",
    accountId: "demo",
    exist: true,
    name: "Labeling Demo Dataset",
    latestVersion: DATASET_VERSION,
    currentVersion: DATASET_VERSION,
    records: "1",
    versionList: [
      {
        version: DATASET_VERSION,
        versionedDate: NOW,
        versionRecords: "1",
      },
    ],
    isLock: false,
    isEditing: false,
    isArchMode: false,
    tags: ["demo"],
    schema: [
      {
        baseInfo: {
          schemaName: "image",
          contentType: "IMAGE",
          contentSize: imageElements.length,
          isRequired: true,
          isPreset: false,
          isVisible: true,
        },
        properties: {},
      },
      {
        baseInfo: {
          schemaName: "text",
          contentType: "CUSTOM",
          contentSize: textElements.length,
          isRequired: false,
          isPreset: false,
          isVisible: true,
        },
        properties: {},
      },
      {
        baseInfo: {
          schemaName: "table",
          contentType: "TABLE",
          contentSize: tableElements.length,
          isRequired: false,
          isPreset: false,
          isVisible: true,
        },
        properties: {},
      },
    ],
    importTransactionId: undefined,
    createdId: "demo",
    createdBy: "demo",
    createdDate: NOW,
    modifiedId: "demo",
    modifiedBy: "demo",
    modifiedDate: NOW,
    schemaTypes: ["IMAGE", "CUSTOM", "TABLE"] as const,
  };
}

/**
 * Single content record with N image elements (gateway-style).
 * contentSetId = datasetId, contents.image = [N items with elementId]
 */
function buildSingleContentRecord() {
  return {
    id: CONTENT_SET_ID,
    contentSetId: CONTENT_SET_ID,
    datasetId: DATASET_ID,
    version: DATASET_VERSION,
    contents: {
      image: imageElements,
      text: textElements,
      table: tableElements,
    },
    summary: {
      image: imageElements.length,
      text: textElements.length,
      table: tableElements.length,
    },
  };
}

// ─── Mutation context (no-ops for demo) ─────────────────────────

const REJECT = () => Promise.reject(new Error("Demo: mutations disabled"));

const MUTATIONS_CTX: LabelingMutationContextValue = {
  batchUpdateLabels: REJECT as never,
  batchUpdateLabelsState: IDLE_MUTATION,
  bulkCreateLabels: REJECT as never,
  bulkCreateLabelsState: IDLE_MUTATION,
  createLabelContext: REJECT as never,
  createLabelContextState: IDLE_MUTATION,
  updateLabelContext: REJECT as never,
  updateLabelContextState: IDLE_MUTATION,
  createLabelStatus: REJECT as never,
  createLabelStatusState: IDLE_MUTATION,
  uploadFileLabel: REJECT as never,
  uploadFileLabelState: IDLE_MUTATION,
  copyLabels: REJECT as never,
  copyLabelsState: IDLE_MUTATION,
  createValidResult: REJECT as never,
  createValidResultState: IDLE_MUTATION,
  updateValidResult: REJECT as never,
  updateValidResultState: IDLE_MUTATION,
  bulkDeleteValidResults: REJECT as never,
  bulkDeleteValidResultsState: IDLE_MUTATION,
  onMutationSuccess: () => {},
};

// ─── Provider data hook ─────────────────────────────────────────

function useProviderData() {
  const contentRecord = useMemo(() => buildSingleContentRecord(), []);

  const dataCtx = useMemo<LabelingDataContextValue>(
    () => ({
      policiesBatch: staticData(buildPolicyDetails()),
      labelContext: staticData({
        id: "lctx-demo",
        datasetId: DATASET_ID,
        datasetVersion: DATASET_VERSION,
        policyIds: POLICY_IDS,
        enable: true,
        organizationId: "demo",
        accountId: "demo",
        zoneId: "demo",
        userId: "demo",
        inLabeling: false,
        isLabeled: false,
        createdBy: "demo",
        createdDate: NOW,
        modifiedBy: "demo",
        modifiedDate: NOW,
      }),
      labelContextStatus: staticData({
        labelContextId: "lctx-demo",
        datasetId: DATASET_ID,
        contentSets: [
          {
            contentSetId: CONTENT_SET_ID,
            totalCount: imageElements.length + textElements.length + tableElements.length,
            contentSetStatus: [],
          },
        ],
      }),
      labelContextInLabeling: staticData({ inLabeling: false }),
      labelContextEnable: staticData({ enable: true }),
      labelSearch: staticData({
        list: [],
        totalCount: 0,
        filter: {
          labelContextId: { operator: "EQ", value: "lctx-demo" },
        },
      }),
      previousLabelContexts: staticData([]),
      validResultSearch: staticData({
        list: [],
        totalCount: 0,
        filter: {},
      }),
    }),
    [],
  );

  const datasetCtx = useMemo<LabelingDatasetContextValue>(
    () => ({
      datasetDetail: staticData(buildDataset()),
      datasetContents: staticData({
        code: 200,
        message: "OK",
        data: { list: [contentRecord], totalCount: 1 },
      }),
      datasetContentDetail: staticData(contentRecord),
    }),
    [contentRecord],
  );

  return { dataCtx, datasetCtx };
}

// ─── Seed selection store ──────────────────────────────────────

function useSeedSelectionStore() {
  const setSelectionSnapshot = useWorkspaceNavigationDetailSelectionStore(
    (s) => s.setSelectionSnapshot,
  );

  useEffect(() => {
    const firstElement = imageElements[0];
    setSelectionSnapshot({
      columns: ["fileName", "endpointUrl"],
      rows: imageElements.map((el) => ({
        elementId: el.elementId,
        fileName: el.fileName,
        endpointUrl: el.endpointUrl,
      })),
      recordName: CONTENT_SET_ID,
      columnName: "image",
      contentType: "IMAGE",
      contentSetId: CONTENT_SET_ID,
      schemaName: "image",
      elementId: firstElement.elementId,
      selectedRows: [0],
    });
  }, [setSelectionSnapshot]);
}

// ─── App ────────────────────────────────────────────────────────

export default function App() {
  useSeedSelectionStore();

  const { dataCtx, datasetCtx } = useProviderData();

  // SAM extension
  // Flatten all policy classes for SAM CLIP classification
  const allPolicyClasses = useMemo(
    () =>
      samplePolicies.flatMap((p) =>
        p.classes.map((c) => ({ index: c.index, name: c.name, color: c.color }))
      ),
    []
  );
  const extensions = useMemo(
    () => [createSamExtension({ policyClasses: allPolicyClasses })],
    [allPolicyClasses]
  );

  // Register SAM toolbar submenu item
  useEffect(() => {
    const items: ExtensionSubMenuItem[] = [
      {
        id: "demo-sam",
        iconType: "icon-seg-anything" as any,
        name: "Segment Anything",
        shortcut: { key: "s", label: "S" },
        onClick: () => {
          const toolStore = useImageTypeLabelingToolSelectionStore.getState();
          const panelStore = useExtensionFloatingPanelStore.getState();
          toolStore.setTool(createSamTool());
          panelStore.openPanel("demo-sam");
        },
      },
    ];
    useToolbarSubMenuItemsStore.getState().setItems(items);
    return () => {
      useToolbarSubMenuItemsStore.getState().clearItems();
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <LabelingProviders
        data={dataCtx}
        mutations={MUTATIONS_CTX}
        dataset={datasetCtx}
      >
        <LabelingWorkspace extensions={extensions} theme="gunpla" />
      </LabelingProviders>
    </div>
  );
}
