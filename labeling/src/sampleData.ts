/**
 * Sample data for the labeling demo app.
 *
 * Gateway-style structure: a single dataset record containing
 * multiple content elements (image, text, table) — like portal-gateway-web.
 */

// ─── Configuration ─────────────────────────────────────────────

/** Number of content elements to generate per schema in the single record */
export const CONTENT_COUNT = 7000;

// ─── Base Images (cycled for large content sets) ───────────────

const BASE_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
    label: "city_street",
  },
  {
    url: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
    label: "aerial_view",
  },
  {
    url: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
    label: "wildlife",
  },
  {
    url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
    label: "farmland",
  },
  {
    url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1280&h=720&fit=crop",
    width: 1280,
    height: 720,
    label: "construction",
  },
];

// ─── Base Texts (cycled for large content sets) ────────────────

const BASE_TEXTS = [
  "도심 거리의 모습입니다. 보행자 도로를 따라 다양한 상점과 카페가 늘어서 있으며, 보행자들이 분주하게 오가고 있습니다.",
  "항공 촬영으로 내려다본 지역의 모습입니다. 건물 밀집 지역과 녹지대가 명확히 구분되며, 도로망이 격자 형태로 뻗어 있습니다.",
  "야생 동물의 서식 환경을 촬영한 사진입니다. 자연 서식지에서 활동하는 동물의 모습이 포착되어 있습니다.",
  "농경지의 전경입니다. 넓은 들판에 작물이 줄지어 심어져 있으며, 작물의 생육 상태와 병해충 피해 여부를 파악할 수 있습니다.",
  "건설 현장의 모습입니다. 대형 크레인과 중장비가 가동 중이며, 철골 구조물이 세워지고 있습니다.",
];

// ─── Base Table Rows (cycled for large content sets) ───────────

const BASE_TABLE_ROWS = [
  { hour: "06:00", temperature: 12, humidity: 78, trafficCount: 320, airQualityIndex: 45 },
  { hour: "09:00", temperature: 16, humidity: 65, trafficCount: 1250, airQualityIndex: 62 },
  { hour: "12:00", temperature: 22, humidity: 52, trafficCount: 980, airQualityIndex: 71 },
  { hour: "15:00", temperature: 24, humidity: 48, trafficCount: 870, airQualityIndex: 68 },
  { hour: "18:00", temperature: 20, humidity: 55, trafficCount: 1450, airQualityIndex: 75 },
  { hour: "21:00", temperature: 15, humidity: 70, trafficCount: 620, airQualityIndex: 52 },
];

// ─── Content Element Builders (gateway-style) ──────────────────

export interface ImageElement {
  elementId: string;
  fileName: string;
  imageWidth: number;
  imageHeight: number;
  endpointUrl: string;
}

export interface TextElement {
  elementId: string;
  value: string;
}

export interface TableElement {
  elementId: string;
  hour: string;
  temperature: string;
  humidity: string;
  trafficCount: string;
  airQualityIndex: string;
}

export function buildImageElements(count: number): ImageElement[] {
  const elements: ImageElement[] = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_IMAGES[i % BASE_IMAGES.length];
    const idx = String(i + 1).padStart(4, "0");
    elements.push({
      elementId: `img-${idx}`,
      fileName: `${base.label}_${idx}.jpg`,
      imageWidth: base.width,
      imageHeight: base.height,
      endpointUrl: base.url,
    });
  }
  return elements;
}

export function buildTextElements(count: number): TextElement[] {
  const elements: TextElement[] = [];
  for (let i = 0; i < count; i++) {
    const idx = String(i + 1).padStart(4, "0");
    elements.push({
      elementId: `txt-${idx}`,
      value: BASE_TEXTS[i % BASE_TEXTS.length],
    });
  }
  return elements;
}

export function buildTableElements(count: number): TableElement[] {
  const elements: TableElement[] = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_TABLE_ROWS[i % BASE_TABLE_ROWS.length];
    const idx = String(i + 1).padStart(4, "0");
    elements.push({
      elementId: `tbl-${idx}`,
      hour: base.hour,
      temperature: String(base.temperature + (i % 10)),
      humidity: String(base.humidity - (i % 5)),
      trafficCount: String(base.trafficCount + i * 10),
      airQualityIndex: String(base.airQualityIndex + (i % 8)),
    });
  }
  return elements;
}

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
