/* Steampunk-route resume data. Intentionally independent of c/resumeData so
   names that must not appear on /steampunk cannot leak into this route's JS
   bundle. Month + year dates are already applied. */

export type SteampunkSkill = { label: string; value: string };
export type SteampunkEvent = {
  date: string;
  title: string;
  company: string;
  companyHref: string;
  bullets: string[];
};
export type SteampunkFooterLink = { label: string; href: string };
export type SteampunkResumeData = {
  header: { name: string; title: string; subtitle: string; nameHref: string };
  skills: SteampunkSkill[];
  experience: SteampunkEvent[];
  education: SteampunkEvent[];
  footer: SteampunkFooterLink[];
};

export const steampunkResumeData: SteampunkResumeData = {
  header: {
    name: "Andrew Solomon",
    title: "Resume",
    subtitle: "Software Developer",
    nameHref: "https://www.linkedin.com/in/andrew-solomon-44550a24/",
  },
  skills: [
    { label: "Salesforce", value: "Apex, LWC, SOQL, SOSL, Trigger Frameworks, Async Apex, fflib, Experience Cloud, OmniStudio, 2GP Packages, Flow" },
    { label: "Design", value: "Figma, SLDS 2, Design Tokens, IBM Carbon Design System" },
    { label: "AI", value: "OpenAI, Anthropic SDK, AI Agents, Harness Engineering, MCP" },
    { label: "Agent", value: "AWS Bedrock, AWS Bedrock AgentCore" },
    { label: "DevOps", value: "GitHub Actions, SonarQube, SFDX, Vercel, Jest, Playwright" },
    { label: "Frontend", value: "TypeScript, React, Next.js, Tailwind, GraphQL, ThreeJs, LWC" },
    { label: "Backend", value: "Node, Java, Java Spring Boot, Supabase, Cloudflare Workers, Vercel Functions, REST APIs, AWS S3, AWS DynamoDB" },
  ],
  experience: [
    {
      date: "Feb 2023 — Dec 2023",
      title: "Senior Salesforce Developer",
      company: "MagMutual",
      companyHref: "https://www.magmutual.com",
      bullets: [
      "Led development of Lightning Web Components platform serving 10,000+ healthcare professionals, improving user engagement by 30%",
      "Architected enterprise Git workflow system with GitHub Actions, reducing deployment time by 40% across 5 development teams",
      "Developed Apex-backed real-time analytics dashboard processing 1M+ daily transactions with 99.9% uptime",
      "Implemented Apex and Jest testing suites achieving 95% code coverage and WCAG 2.1 compliance",
      "Built GraphQL-powered headless CMS integration, reducing content update time by 60%",
      "Designed component library based on IBM Carbon Design System, deployed across 3 customer-facing applications",
      ],
    },
    {
      date: "Apr 2022 — Jan 2023",
      title: "Senior Salesforce Developer",
      company: "Department of Veterans Affairs — PSIP",
      companyHref: "",
      bullets: [
      "Designed and delivered a Salesforce case management system for VA Personnel Security & Investigations Program (PSIP)",
      "Built an Experience Cloud portal for 10,000+ applicants to submit forms and track case status",
      "Architected queue-based sharing and case assignment for 500+ investigators",
      "Implemented Apex-based SSO/JIT provisioning and Queueable permission set orchestration with resilient retry and error handling patterns",
      "Hardened Apex document access and test coverage with Security.stripInaccessible(), CRUD/FLS checks, sharing enforcement, and persona-based testing patterns",
      ],
    },
    {
      date: "May 2021 — Mar 2022",
      title: "Salesforce Developer",
      company: "Department of Veterans Affairs — VBA QMS",
      companyHref: "",
      bullets: [
      "Refactored 15+ test classes to least-privilege, persona-based security testing",
      "Implemented fflib Selector, Domain, and Service patterns with CRUD/FLS enforcement across SOQL query paths",
      "Replaced custom Apex permission checks with FeatureManagement.checkPermission() and modernized Workflow Rules to before-save Flows",
      "Improved Apex test scores by 25-40 points, eliminated MIXED_DML_OPERATION failures via @testSetup, and stabilized tests around least-privilege users",
      ],
    },
    {
      date: "Feb 2019 — Jan 2023",
      title: "Lead Frontend Engineer",
      company: "CodeScience",
      companyHref: "https://www.codescience.com",
      bullets: [
      "Delivered enterprise Salesforce solutions for Fortune 500 clients including RingCentral and Ford, serving 50,000+ daily users",
      "Led UI and Apex architecture for 15+ projects using TypeScript, LWC, service classes, and trigger patterns, establishing core design systems",
      "Core contributor to Salesforce DevOps Center, improving deployment efficiency for 1000+ organizations",
      "Designed Apex integration and orchestration layers for AppExchange-grade managed package features while implementing Redux state management patterns that reduced component complexity by 40%",
      "Mentored team of 8 developers in modern JavaScript practices and Salesforce development",
      ],
    },
    {
      date: "Aug 2018 — Feb 2019",
      title: "Senior JavaScript Developer",
      company: "CNN",
      companyHref: "https://www.cnn.com",
      bullets: [
      "Developed cross-platform applications reaching 2M+ daily users across iOS, Roku, and Samsung devices",
      "Built real-time news delivery system using React and Node, handling 100K+ concurrent users",
      "Reduced application load time by 45% through performance optimization",
      "Led UI development for CNN's streaming platform launch",
      ],
    },
    {
      date: "Jan 2014 — Feb 2018",
      title: "Senior Software Engineer",
      company: "Cox Automotive",
      companyHref: "https://www.coxautoinc.com",
      bullets: [
      "Architected Node microservices processing 500K+ daily automotive transactions",
      "Led team of 6 frontend engineers, developing component library used across 20+ applications",
      "Built React-based auction check-in system deployed to 100+ locations nationwide",
      "Developed full-stack applications using Java Spring Boot, serving 50K+ automotive dealers",
      ],
    },
    {
      date: "Apr 2013 — Nov 2013",
      title: "Lead Frontend Developer",
      company: "Look-Listen",
      companyHref: "https://www.linkedin.com/company/look-listen/",
      bullets: [
      "Led frontend development for 10+ major brands including Alternative Apparel and Matchstic",
      "Implemented responsive design system reducing mobile bounce rate by 35%",
      "Established modern development workflow with Node and Sass, improving team velocity by 50%",
      "Built social media integration platform handling 100K+ daily API calls",
      "Managed AWS infrastructure supporting 1M+ monthly active users",
      ],
    },
    {
      date: "Aug 2010 — Dec 2012",
      title: "Senior Software Developer",
      company: "Paper Tiger",
      companyHref: "https://www.linkedin.com/company/the-monticello-corporation/",
      bullets: [
      "Developed SaaS platform serving 20K+ users with PHP and JavaScript",
      "Implemented Google Docs API integration processing 50K+ documents monthly",
      "Built single-page application improving customer support efficiency by 40%",
      "Designed Ruby on Rails asset pipeline reducing page load times by 60%",
      ],
    },
  ],
  education: [
    {
      date: "Aug 2005 — May 2010",
      title: "B.Sc. Computer Science",
      company: "Albany State University",
      companyHref: "https://www.asurams.edu",
      bullets: [
      "Graduated with 3.8 GPA, focus on algorithms and information security",
      "Led development of security research platform used by 500+ students",
      "Conducted DNA sequencing research using Perl and BioPerl",
      "Published paper on information assurance in undergraduate research journal",
      ],
    },
  ],
  footer: [

  ],
};

export default steampunkResumeData;
