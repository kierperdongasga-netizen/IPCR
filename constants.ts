import { TemplateType, SectionType, IPCRForm, IPCRStatus, FormSection, UserRole, CalendarEvent } from './types';

export const SPMS_CALENDAR: CalendarEvent[] = [
  { period: 'Jan-Jun 2026', activity: 'Submission of IPCR for Jan-Jun', deadline: 'July 15, 2026', actors: 'Ratee, Supervisor' },
  { period: 'Jan-Jun 2026', activity: 'Review and Evaluation', deadline: 'July 30, 2026', actors: 'PMT, HRMU' },
  { period: 'Jul-Dec 2026', activity: 'Submission of IPCR for Jul-Dec', deadline: 'January 15, 2027', actors: 'Ratee, Supervisor' },
];

export const ADJECTIVAL_RATING = (score: number) => {
  if (score >= 4.51) return 'Outstanding';
  if (score >= 3.51) return 'Very Satisfactory';
  if (score >= 2.51) return 'Satisfactory';
  if (score >= 1.51) return 'Unsatisfactory';
  return 'Poor';
};

// Seed Data helper
const createRow = (id: string, code: string, indicator: string, target: string, reqMovs: string[]) => ({
  id,
  indicatorCode: code,
  indicator,
  target,
  actualAccomplishment: '',
  sdgTags: [],
  ratingQ: null,
  ratingE: null,
  ratingT: null,
  average: 0,
  remarks: '',
  movs: [],
  requiredMOVChecklist: reqMovs,
});

export const SEED_TEMPLATES: Record<TemplateType, Partial<IPCRForm>> = {
  [TemplateType.Teaching_Instructor]: {
    sections: [
      {
        id: 'ti_s1',
        title: 'Strategic Priority (MFO 1: Higher Education Services)',
        type: SectionType.MFO,
        weight: 0.60,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('ti_r1', 'MFO1-01', 'Classes conducted/handled according to schedule', '100% of classes conducted', ['Daily Time Record (DTR)', 'Certificate of Service', 'Class Record']),
          createRow('ti_r2', 'MFO1-02', 'Students rated Satisfactory or higher', '90% of students', ['Grading Sheets (signed by Dean)', 'Summary of Grades']),
          createRow('ti_r3', 'MFO1-03', 'Instructional Materials developed/produced', '1 IM approved/used', ['Copy of IM', 'Certificate of Utilization', 'Approval Sheet from IM Committee']),
          createRow('ti_r4', 'MFO1-04', 'Syllabi prepared/revised', '100% of subjects handled', ['Approved Course Syllabi', 'Endorsement from Dept Chair']),
        ]
      },
      {
        id: 'ti_s2',
        title: 'Core Functions (MFO 3: Research Services)',
        type: SectionType.MFO,
        weight: 0.20,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('ti_r5', 'MFO3-01', 'Research outputs presented in regional/national conferences', '1 Research Output', ['Certificate of Presentation', 'Program/Invitation', 'Abstract of Paper']),
          createRow('ti_r6', 'MFO3-02', 'Research outputs published in refereed journals', '1 Publication (Optional for Inst I)', ['Copy of Journal/Article', 'Acceptance Letter']),
        ]
      },
      {
        id: 'ti_s3',
        title: 'Core Functions (MFO 4: Extension Services)',
        type: SectionType.MFO,
        weight: 0.10,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('ti_r7', 'MFO4-01', 'Extension activities conducted/implemented', '1 Activity', ['Approved Extension Proposal', 'Activity Report', 'Attendance Sheets', 'Photo Documentation']),
          createRow('ti_r8', 'MFO4-02', 'Number of persons trained weighted by length of training', '30 Persons', ['Attendance Sheets', 'Summary of Evaluation']),
        ]
      },
      {
        id: 'ti_s4',
        title: 'Support Functions',
        type: SectionType.Support,
        weight: 0.10,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('ti_r9', 'SUP-01', 'Attendance to University flag raising ceremonies', '80% Attendance', ['Logbook/DTR', 'HR Certification']),
          createRow('ti_r10', 'SUP-02', 'Attendance to Department/College Meetings', '100% Attendance', ['Minutes of Meeting', 'Attendance Log']),
        ]
      }
    ]
  },
  [TemplateType.Teaching_AssocProf]: { 
    sections: [
        {
        id: 'tap_s1',
        title: 'Strategic Priority (MFO 1: Higher Education Services)',
        type: SectionType.MFO,
        weight: 0.50,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('tap_r1', 'MFO1-01', 'Classes conducted/handled', '100% of classes', ['DTR', 'Class Record']),
          createRow('tap_r2', 'MFO1-02', 'Mentorship of graduate/undergraduate students', '5 students advised', ['Appointment as Adviser', 'Thesis/Dissertation Approval Sheet']),
        ]
      },
      {
        id: 'tap_s2',
        title: 'Core Functions (MFO 3: Research Services)',
        type: SectionType.MFO,
        weight: 0.30,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('tap_r3', 'MFO3-01', 'Research outputs published in international refereed journals', '1 Publication', ['Journal Copy', 'ISSN/DOI']),
          createRow('tap_r4', 'MFO3-02', 'Externally funded research project', '1 Project', ['MOA/MOU', 'Notice to Proceed', 'Project Proposal']),
        ]
      },
       {
        id: 'tap_s3',
        title: 'Core Functions (MFO 4: Extension Services)',
        type: SectionType.MFO,
        weight: 0.10,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('tap_r5', 'MFO4-01', 'Extension program managed/implemented', '1 Program', ['Program Report', 'Impact Assessment']),
        ]
      },
      {
        id: 'tap_s4',
        title: 'Support Functions',
        type: SectionType.Support,
        weight: 0.10,
        averageRating: 0,
        weightedRating: 0,
        rows: [
            createRow('tap_r6', 'SUP-01', 'Involvement in Accreditation', 'Task Force Member', ['Office Order', 'Certificate of Appearance']),
        ]
      }
    ] 
  },
  [TemplateType.Teaching_COS]: { 
     sections: [
      {
        id: 'cos_s1',
        title: 'Strategic Priority (Higher Education)',
        type: SectionType.MFO,
        weight: 0.90,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('cos_r1', 'MFO1-01', 'Classes conducted', '100% conducted', ['DTR', 'Accomplishment Report']),
          createRow('cos_r2', 'MFO1-02', 'Grades submitted on time', '72 hours after exams', ['Received Copy of Grading Sheets']),
        ]
      },
      {
        id: 'cos_s2',
        title: 'Support Functions',
        type: SectionType.Support,
        weight: 0.10,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('cos_r3', 'SUP-01', 'Attendance to required meetings', '100% Attendance', ['Minutes', 'Attendance Sheet']),
        ]
      }
     ] 
  },
  [TemplateType.NonTeaching]: {
    sections: [
      {
        id: 'nt1',
        title: 'Core Functions',
        type: SectionType.Core,
        weight: 0.70,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('nt_r1', 'CORE-01', 'Timely processing of incoming communications', '100% within 3 days', ['Logbook', 'Routing Slip', 'Document Tracking System']),
          createRow('nt_r2', 'CORE-02', 'Maintenance of office filing system', '0 missing files', ['Index of Files', 'Photos of Filing Cabinet']),
          createRow('nt_r3', 'CORE-03', 'Preparation of periodic reports', 'Submitted 1 day before deadline', ['Received Copy of Reports', 'Email thread']),
        ]
      },
      {
        id: 'nt2',
        title: 'Support Functions',
        type: SectionType.Support,
        weight: 0.30,
        averageRating: 0,
        weightedRating: 0,
        rows: [
          createRow('nt_r4', 'SUP-01', 'Attendance in flag ceremony', '100%', ['Biometric Records']),
          createRow('nt_r5', 'SUP-02', 'Office cleanliness and sanitation', 'Maintained daily', ['Inspection Report', 'Photos']),
        ]
      }
    ]
  }
};
