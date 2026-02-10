export enum UserRole {
  Ratee = 'Ratee',
  Supervisor = 'Supervisor',
  Dean = 'Dean',
  VP = 'VP',
  President = 'President',
  HRMU = 'HRMU',
  PMT = 'PMT',
}

export enum IPCRStatus {
  Draft = 'Draft',
  Submitted = 'Submitted', // To Supervisor/Dean
  Returned = 'Returned',
  SignedBySupervisor = 'SignedBySupervisor',
  Endorsed = 'Endorsed', // To VP/President
  Approved = 'Approved', // By VP/President
  Locked = 'Locked', // Evaluation Period
  Accomplished = 'Accomplished', // Submitted for Eval
  Evaluated = 'Evaluated', // By Committee
  Finalized = 'Finalized', // Stored in HRMU
}

export enum TemplateType {
  Teaching_Instructor = 'Teaching_Instructor', // Instructor / Asst Prof
  Teaching_AssocProf = 'Teaching_AssocProf', // Assoc Prof / Prof
  Teaching_COS = 'Teaching_COS',
  NonTeaching = 'NonTeaching',
}

export enum SectionType {
  MFO = 'MFO',
  Support = 'Support',
  Strategic = 'Strategic',
  Priority = 'Priority',
  Core = 'Core',
}

export interface User {
  id: string;
  googleId?: string; // Simulated Google ID
  email: string;
  name: string;
  role: UserRole;
  position: string;
  office: string;
  category: 'Teaching' | 'Non-Teaching';
}

export interface MOVFile {
  id: string;
  name: string;
  type: string; // e.g., 'Certificate', 'Report'
  size: number;
  url: string;
  s3Path: string; // Full stored path
  uploadedBy: string;
  uploadedAt: string;
  checklistTag?: string; // Links to specific requirement
}

export interface MOVLog {
    id: string;
    fileId?: string;
    action: 'UPLOAD' | 'DELETE' | 'REPLACE';
    actor: string;
    timestamp: string;
    details: string;
}

export interface IndicatorRow {
  id: string;
  indicatorCode?: string; // Added for folder structure
  indicator: string;
  target: string;
  actualAccomplishment: string;
  sdgTags: string[];
  ratingQ: number | null;
  ratingE: number | null;
  ratingT: number | null;
  average: number;
  remarks: string;
  movs: MOVFile[];
  requiredMOVChecklist: string[]; // Read-only from template
  isFixedVolume?: boolean; // For special efficiency rule
}

export interface FormSection {
  id: string;
  title: string;
  type: SectionType;
  weight: number;
  rows: IndicatorRow[];
  averageRating: number;
  weightedRating: number;
}

export interface IPCRForm {
  id: string;
  userId: string;
  userName: string;
  position: string;
  office: string;
  periodStart: string;
  periodEnd: string;
  year: number;
  templateType: TemplateType;
  status: IPCRStatus;
  sections: FormSection[];
  finalRating: number;
  adjectivalRating: string;
  createdAt: string;
  updatedAt: string;
  auditLogs?: MOVLog[]; // Add audit logs to form structure
  approvals: {
    supervisor?: { name: string; date: string; signed: boolean };
    vp?: { name: string; date: string; signed: boolean };
    president?: { name: string; date: string; signed: boolean };
  };
}

export interface CalendarEvent {
  period: string;
  activity: string;
  deadline: string;
  actors: string;
}