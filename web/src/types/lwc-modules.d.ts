// LWC namespace modules. LWR resolves `c/*` at runtime; TS needs an ambient
// declaration so typed imports from other modules work.

declare module 'c/resumeData' {
  const resume: import('../modules/c/resumeData/resumeData').Resume;
  export default resume;
  export type {
    Resume,
    MetaItem,
    SkillItem,
    CvEvent,
    FooterLink,
  } from '../modules/c/resumeData/resumeData';
}
