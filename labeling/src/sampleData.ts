/**
 * Sample data for the labeling demo app.
 *
 * - 5 images (Unsplash, 1280x720 — diverse categories)
 * - 5 text samples (Korean)
 * - 5 number/table data sets
 * - Policies (Object Detection, Classification, Segmentation)
 * - 5 records with contentSetIds
 * - Pre-existing labels for record 2
 */

// ─── Sample Images (5 — diverse categories) ─────────────────────

export const sampleImages: Record<
  string,
  { url: string; width: number; height: number }
> = {
  // 1) Urban street — object detection (cars, people, signs)
  "cs-1": {
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
  },
  // 2) Aerial view — segmentation (buildings, roads, vegetation)
  "cs-2": {
    url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
  },
  // 3) Wildlife — animal detection / classification (sea turtle)
  "cs-3": {
    url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
  },
  // 4) Agriculture / farmland — crop analysis
  "cs-4": {
    url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
  },
  // 5) Industrial / construction — defect detection
  "cs-5": {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
  },
};

// ─── Sample Text (Korean, 5) ───────────────────────────────────

export const sampleTexts: Record<string, string> = {
  "cs-1":
    "도심 거리의 모습입니다. 보행자 도로를 따라 다양한 상점과 카페가 늘어서 있으며, 보행자들이 분주하게 오가고 있습니다. 거리의 양쪽에는 높은 건물과 가로수가 줄지어 있어 도시 특유의 활기를 느낄 수 있습니다.",
  "cs-2":
    "항공 촬영으로 내려다본 지역의 모습입니다. 건물 밀집 지역과 녹지대가 명확히 구분되며, 도로망이 격자 형태로 뻗어 있습니다. 위성 영상 기반의 토지 이용 분류와 건물 탐지에 적합한 데이터입니다.",
  "cs-3":
    "야생 동물의 서식 환경을 촬영한 사진입니다. 자연 서식지에서 활동하는 동물의 모습이 포착되어 있으며, 종 분류 및 개체 수 파악 등의 생태 모니터링 연구에 활용될 수 있습니다.",
  "cs-4":
    "농경지의 전경입니다. 넓은 들판에 작물이 줄지어 심어져 있으며, 작물의 생육 상태와 병해충 피해 여부를 파악할 수 있습니다. 정밀 농업과 수확량 예측을 위한 이미지 분석에 활용됩니다.",
  "cs-5":
    "건설 현장의 모습입니다. 대형 크레인과 중장비가 가동 중이며, 철골 구조물이 세워지고 있습니다. 안전 장비 착용 여부 감시, 장비 상태 점검, 시공 진행률 분석 등에 활용될 수 있습니다.",
};

// ─── Sample Number/Table Data (5) ──────────────────────────────

export interface NumberTableRow {
  hour: string;
  temperature: number;
  humidity: number;
  trafficCount: number;
  airQualityIndex: number;
}

export const sampleNumberData: Record<string, NumberTableRow[]> = {
  "cs-1": [
    { hour: "06:00", temperature: 12, humidity: 78, trafficCount: 320, airQualityIndex: 45 },
    { hour: "09:00", temperature: 16, humidity: 65, trafficCount: 1250, airQualityIndex: 62 },
    { hour: "12:00", temperature: 22, humidity: 52, trafficCount: 980, airQualityIndex: 71 },
    { hour: "15:00", temperature: 24, humidity: 48, trafficCount: 870, airQualityIndex: 68 },
    { hour: "18:00", temperature: 20, humidity: 55, trafficCount: 1450, airQualityIndex: 75 },
    { hour: "21:00", temperature: 15, humidity: 70, trafficCount: 620, airQualityIndex: 52 },
  ],
  "cs-2": [
    { hour: "06:00", temperature: 10, humidity: 82, trafficCount: 450, airQualityIndex: 38 },
    { hour: "09:00", temperature: 14, humidity: 70, trafficCount: 1800, airQualityIndex: 55 },
    { hour: "12:00", temperature: 20, humidity: 58, trafficCount: 1350, airQualityIndex: 65 },
    { hour: "15:00", temperature: 23, humidity: 50, trafficCount: 1100, airQualityIndex: 70 },
    { hour: "18:00", temperature: 18, humidity: 60, trafficCount: 2100, airQualityIndex: 80 },
    { hour: "21:00", temperature: 13, humidity: 75, trafficCount: 800, airQualityIndex: 48 },
  ],
  "cs-3": [
    { hour: "06:00", temperature: 8, humidity: 88, trafficCount: 120, airQualityIndex: 30 },
    { hour: "09:00", temperature: 13, humidity: 72, trafficCount: 350, airQualityIndex: 35 },
    { hour: "12:00", temperature: 19, humidity: 55, trafficCount: 280, airQualityIndex: 40 },
    { hour: "15:00", temperature: 21, humidity: 50, trafficCount: 310, airQualityIndex: 38 },
    { hour: "18:00", temperature: 17, humidity: 62, trafficCount: 420, airQualityIndex: 42 },
    { hour: "21:00", temperature: 11, humidity: 80, trafficCount: 180, airQualityIndex: 32 },
  ],
  "cs-4": [
    { hour: "06:00", temperature: 14, humidity: 75, trafficCount: 2200, airQualityIndex: 55 },
    { hour: "09:00", temperature: 18, humidity: 62, trafficCount: 4500, airQualityIndex: 78 },
    { hour: "12:00", temperature: 25, humidity: 45, trafficCount: 3200, airQualityIndex: 85 },
    { hour: "15:00", temperature: 27, humidity: 40, trafficCount: 2800, airQualityIndex: 82 },
    { hour: "18:00", temperature: 22, humidity: 52, trafficCount: 5100, airQualityIndex: 92 },
    { hour: "21:00", temperature: 16, humidity: 68, trafficCount: 1500, airQualityIndex: 60 },
  ],
  "cs-5": [
    { hour: "06:00", temperature: 11, humidity: 80, trafficCount: 180, airQualityIndex: 42 },
    { hour: "09:00", temperature: 15, humidity: 68, trafficCount: 950, airQualityIndex: 58 },
    { hour: "12:00", temperature: 21, humidity: 55, trafficCount: 1600, airQualityIndex: 64 },
    { hour: "15:00", temperature: 23, humidity: 48, trafficCount: 2100, airQualityIndex: 70 },
    { hour: "18:00", temperature: 19, humidity: 58, trafficCount: 2800, airQualityIndex: 76 },
    { hour: "21:00", temperature: 14, humidity: 72, trafficCount: 1200, airQualityIndex: 50 },
  ],
};

// ─── Sample Policies ────────────────────────────────────────────

export interface PolicyClass {
  index: number;
  name: string;
  color: string;
  attributes?: Array<{
    name: string;
    attributeType: "TEXT" | "SELECT" | "CHECKBOX";
    values?: string[];
  }>;
}

export interface Policy {
  id: string;
  name: string;
  inferenceType: string;
  classes: PolicyClass[];
}

export const samplePolicies: Policy[] = [
  {
    id: "policy-objdet",
    name: "Object Detection",
    inferenceType: "OBJECT_DETECTION",
    classes: [
      { index: 0, name: "Car", color: "#e74c3c" },
      { index: 1, name: "Bus", color: "#3498db" },
      { index: 2, name: "Person", color: "#2ecc71" },
      { index: 3, name: "Bicycle", color: "#f39c12" },
      { index: 4, name: "Tree", color: "#27ae60" },
      { index: 5, name: "Building", color: "#8e44ad" },
      { index: 6, name: "Sign", color: "#e67e22" },
    ],
  },
  {
    id: "policy-cls",
    name: "Classification",
    inferenceType: "CLASSIFICATION",
    classes: [
      { index: 0, name: "Urban", color: "#3596b5" },
      { index: 1, name: "Suburban", color: "#52b788" },
      { index: 2, name: "Rural", color: "#a98467" },
    ],
  },
  {
    id: "policy-seg",
    name: "Segmentation",
    inferenceType: "SEGMENTATION",
    classes: [
      { index: 0, name: "Road", color: "#636e72" },
      { index: 1, name: "Sidewalk", color: "#b2bec3" },
      { index: 2, name: "Sky", color: "#74b9ff" },
      { index: 3, name: "Vegetation", color: "#00b894" },
    ],
  },
];

// ─── Sample Records (5) ────────────────────────────────────────

export interface SampleRecord {
  id: string;
  contentSetId: string;
  label: string;
}

export const sampleRecords: SampleRecord[] = [
  { id: "r-1", contentSetId: "cs-1", label: "city_street_01" },
  { id: "r-2", contentSetId: "cs-2", label: "aerial_view_02" },
  { id: "r-3", contentSetId: "cs-3", label: "wildlife_03" },
  { id: "r-4", contentSetId: "cs-4", label: "farmland_04" },
  { id: "r-5", contentSetId: "cs-5", label: "construction_05" },
];

// ─── Pre-existing Labels for Record 2 ──────────────────────────

export interface SampleLabel {
  id: string;
  labelContextId: string;
  contentSetId: string;
  policyId: string;
  inferenceType: string;
  unitType: string;
  labelValue: unknown;
  isLabeled: boolean;
  createdBy: string;
  createdDate: string;
}

export const sampleLabelsForRecord2: SampleLabel[] = [
  // Bounding box labels (Object Detection)
  {
    id: "label-bb-1",
    labelContextId: "lctx-demo",
    contentSetId: "cs-2",
    policyId: "policy-objdet",
    inferenceType: "OBJECT_DETECTION",
    unitType: "ELEMENT",
    labelValue: {
      className: "Car",
      classIndex: 0,
      coord: [120, 350, 320, 480],
      color: "#e74c3c",
      opacity: 0.6,
      zindex: 1,
    },
    isLabeled: true,
    createdBy: "demo-user",
    createdDate: "2026-03-18T10:30:00Z",
  },
  {
    id: "label-bb-2",
    labelContextId: "lctx-demo",
    contentSetId: "cs-2",
    policyId: "policy-objdet",
    inferenceType: "OBJECT_DETECTION",
    unitType: "ELEMENT",
    labelValue: {
      className: "Person",
      classIndex: 2,
      coord: [500, 280, 560, 450],
      color: "#2ecc71",
      opacity: 0.6,
      zindex: 2,
    },
    isLabeled: true,
    createdBy: "demo-user",
    createdDate: "2026-03-18T10:31:00Z",
  },
  {
    id: "label-bb-3",
    labelContextId: "lctx-demo",
    contentSetId: "cs-2",
    policyId: "policy-objdet",
    inferenceType: "OBJECT_DETECTION",
    unitType: "ELEMENT",
    labelValue: {
      className: "Building",
      classIndex: 5,
      coord: [700, 50, 1050, 400],
      color: "#8e44ad",
      opacity: 0.5,
      zindex: 0,
    },
    isLabeled: true,
    createdBy: "demo-user",
    createdDate: "2026-03-18T10:32:00Z",
  },
  // Classification label (Record-level)
  {
    id: "label-cls-1",
    labelContextId: "lctx-demo",
    contentSetId: "cs-2",
    policyId: "policy-cls",
    inferenceType: "CLASSIFICATION",
    unitType: "CONTENTSET",
    labelValue: {
      className: "Urban",
      classIndex: 0,
    },
    isLabeled: true,
    createdBy: "demo-user",
    createdDate: "2026-03-18T10:33:00Z",
  },
];
