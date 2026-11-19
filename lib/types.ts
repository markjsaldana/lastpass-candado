export type Tier = "Primary" | "Secondary" | "Watch";
// IT admin runs the rollout. Security lead is the technical buyer. Business buyer is the owner, CFO, or ops leader.
// MSP is a managed service provider partner. End users decide adoption.
export type Persona = "IT admin" | "Security lead" | "Business buyer" | "MSP" | "End users";
export type Confidence = "Confirmed" | "Likely" | "Rumor";
export type Urgency = "Alert now" | "This week's digest" | "Monthly review";
export type Owner = "Sales" | "SDRs" | "Sales leadership" | "PMM" | "Product" | "Website" | "CS" | "Enablement";
export type SignalStatus = "Alert sent" | "Talk track shipped" | "In review" | "Gap logged" | "Page updated" | "Logged";

export type Competitor = {
  id: string;
  name: string;
  parent: string | null;
  tier: Tier;
  category: string;
  competesFor: Persona[];
  whyTheyWin: string;
  facts: { fact: string; source: string; url?: string }[];
};

export type SourceType =
  | "pricing page"
  | "product updates"
  | "blog"
  | "comparison page"
  | "help center"
  | "careers"
  | "app marketplace"
  | "investor news"
  | "webinar/events"
  | "review themes"
  | "win-loss notes"
  | "call mentions"
  | "mystery-shop calls"
  | "CS notes"
  | "security pages"
  | "release notes";

export type Source = {
  id: string;
  competitorId: string;
  type: SourceType;
  url: string;
  internal: boolean;
  frequency: "Daily" | "Weekly" | "Monthly" | "Continuous";
  lookFor: string;
  snapshot?: string;
};

export type SignalType = {
  id: string;
  label: string;
  description: string;
  example: string;
};

export type Rules = {
  dealImpact: { score: number; label: string }[];
  personas: { id: Persona; needs: string }[];
  urgency: { id: Urgency; when: string }[];
  confidence: { id: Confidence; when: string }[];
  routing: { when: string; to: Owner[]; action: string }[];
};

export type Citation = { label: string; url: string };

export type Signal = {
  id: number;
  weekOf: string;
  date: string;
  competitorId: string;
  sourceId: string;
  type: string;
  change: string;
  whyItMatters: string;
  whatToSay: string;
  personas: Persona[];
  impact: 1 | 2 | 3 | 4 | 5;
  confidence: Confidence;
  urgency: Urgency;
  owners: Owner[];
  status: SignalStatus;
  // Public signals cite the page they came from. Internal ones (calls, win-loss, CS) are sample data.
  citation?: Citation;
};

export type Digest = {
  weekOf: string;
  topForSales: number[];
  trends: { title: string; detail: string; signals: number[] }[];
  winLossQuestions: { question: string; gap: string }[];
};

export type ProofType = "Customer story" | "Demo moment" | "Cost math";

export type Battlecard = {
  competitorId: string;
  updatedOn: string;
  updatedBySignals: { signal: number; section: string; change: string }[];
  quickDismiss: string;
  whereWeWin: { point: string; detail: string; proofType: ProofType; proof: string }[];
  whereTheyWin: { point: string; handle: string }[];
  landmines: string[];
  objections: { objection: string; response: string; sources?: Citation[] }[];
  byPersona: { persona: Persona; theyCareAbout: string; lead: string; avoid: string; proofPoint: string }[];
};

// "unchecked": not verified in the research notes, so the cell makes no claim.
export type MatrixMark = "yes" | "partial" | "no" | "unchecked";

export type Matrix = {
  players: { id: string; name: string }[];
  groups: {
    persona: Persona;
    capabilities: {
      name: string;
      cells: Record<string, { mark: MatrixMark; note: string; url?: string }>;
    }[];
  }[];
  positioning: {
    xAxis: { low: string; high: string };
    yAxis: { low: string; high: string };
    // label: which side of the dot the name sits on. Defaults to right, or left near the right edge.
    points: { id: string; name: string; x: number; y: number; note: string; label?: "top" | "left" | "right" }[];
  };
};

export type RoutingEntry = {
  date: string;
  signal: number;
  destination: string;
  action: string;
  outcome: string;
  kind: "Sales alert" | "Product" | "PMM" | "Website" | "CS" | "Win-loss";
};

export type Kpi = {
  name: string;
  why: string;
  measure: string;
  target: string;
};

// Sample pipeline numbers, to show how contribution would be reported.
export type PipelineRow = {
  competitorId: string;
  opps: number;
  pipeline: number;
  won: number;
  lost: number;
  winRateBefore: number;
  winRateAfter: number;
};

export type RoutingLog = {
  entries: RoutingEntry[];
  kpis: Kpi[];
  pipeline: { quarter: string; note: string; rows: PipelineRow[] };
};

export type Region = "West" | "Southwest" | "Midwest" | "Southeast" | "Northeast" | "Canada";
// Employees: under 50, 50 to 249, 250 to 500.
export type CompanySize = "Under 50" | "50 to 249" | "250 to 500";
export type UseCase =
  | "SSO rollout"
  | "Directory sync"
  | "Compliance & audit"
  | "MSP"
  | "Shared credentials"
  | "Offboarding"
  | "Adoption";
export type ReferenceStatus = "Available" | "Limited" | "Resting";
export type ReferenceFormat = "Reference call" | "Peer email" | "Site visit" | "Webinar";

export type Customer = {
  id: string;
  name: string;
  industry: string;
  size: CompanySize;
  region: Region;
  hq: string;
  // [longitude, latitude] of the HQ city, for the references map.
  coords: [number, number];
  // Team size as the customer describes it, e.g. "140 employees, 2 in IT".
  team: string;
  useCases: UseCase[];
  competitor: { id: string; outcome: "Switched from" | "Chose over" } | null;
  // null: a customer with a case study who hasn't agreed to take reference calls.
  reference: {
    status: ReferenceStatus;
    contactRole: string;
    personas: Persona[];
    formats: ReferenceFormat[];
    lastUsed: string;
    goodFor: string;
  } | null;
};

export type CaseStudy = {
  id: string;
  customerId: string;
  title: string;
  visibility: "Public" | "Internal only";
  useCases: UseCase[];
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  quote: { text: string; role: string };
};

// What the deal assistant demo pulls out of one sample call transcript.
// Concern and resource numbers in `addresses` and `form` are 1-based ranks;
// `objection` and an objection resource's `ref` index the objections on the
// battlecard for the prospect's competitor.
export type DealResource = {
  kind: "caseStudy" | "reference" | "objection";
  ref: string;
  addresses: number[];
  why: string;
};

// A follow-up email draft. `resource` is the 1-based rank of a resource to link.
export type DemoEmail = {
  to: string;
  subject: string;
  paragraphs: { text: string; resource?: number; linkText?: string }[];
  signoff: string;
};

export type TranscriptDemo = {
  file: { name: string; path: string; source: string; duration: string; speakers: number };
  prospect: {
    name: string;
    industry: string;
    size: CompanySize;
    region: Region;
    personas: Persona[];
    competitorId: string;
    stage: string;
    nextStep: string;
  };
  parsing: string[];
  concerns: { concern: string; quote: string; speaker: string; at: string; mentions: number; objection?: number }[];
  resources: DealResource[];
  // One technical question answered twice: plain for the business buyer, precise for the security lead.
  techQuestion: {
    ask: string;
    plain: { audience: string; text: string };
    precise: { audience: string; text: string };
    gap: string;
    sources: Citation[];
  };
  email: DemoEmail;
  form: {
    fields: { label: string; value: string }[];
    concerns: number[];
    resources: number[];
    missed: string;
    email: DemoEmail;
  };
};

// The weekly "so what": what this week's signals mean for each audience.
export type SoWhatItem = { title: string; detail: string; action: string; signals: number[] };

export type SoWhat = {
  weekOf: string;
  headline: string;
  audiences: { id: string; label: string; who: string; summary: string; items: SoWhatItem[] }[];
};

// Win-loss program: sample interviews coded against a fixed set of reasons.
export type WinLossInterview = {
  id: string;
  company: string;
  size: CompanySize;
  industry: string;
  competitorId: string;
  outcome: "Won" | "Lost";
  role: string;
  daysAfter: number;
  primaryReason: string;
  codes: string[];
  quote: string;
  action: string;
};

export type WinLoss = {
  codes: { id: string; label: string; group: "Product" | "Trust" | "Price" | "Sales process" | "Rollout" }[];
  interviews: WinLossInterview[];
};
