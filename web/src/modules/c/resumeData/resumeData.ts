// AUTO-GENERATED from main.tex by scripts/parse-resume.mjs. Do not edit by hand.

export type MetaItem = { label: string; value: string };
export type SkillItem = { label: string; value: string };
export type CvEvent = {
  date: string;
  title: string;
  company: string;
  companyHref: string;
  bullets: string[];
};
export type FooterLink = { label: string; href: string };
export type Resume = {
  header: { name: string; title: string; subtitle: string; nameHref: string };
  meta: MetaItem[];
  summary: string;
  skills: SkillItem[];
  experience: CvEvent[];
  education: CvEvent[];
  footer: FooterLink[];
};

export const resume: Resume = {
  "header": {
    "name": "Andrew Solomon",
    "title": "Resume",
    "subtitle": "Software Developer",
    "nameHref": "https://www.linkedin.com/in/andrew-solomon-44550a24/"
  },
  "meta": [
    {
      "label": "Location",
      "value": "Atlanta, Georgia"
    },
    {
      "label": "Portfolio",
      "value": "andrewsolomon.dev"
    },
    {
      "label": "Email",
      "value": "andrewsolomon.edu@gmail.com"
    }
  ],
  "summary": "Senior Salesforce Engineer & Technical Lead with 15+ years of software development experience and 20+ full end-to-end Salesforce implementations. Expert in Lightning Web Components, Apex, 2nd-generation packages, and Experience Cloud. Proven track record leading technical teams, establishing engineering standards, and delivering enterprise-scale solutions for Fortune 500 companies and federal agencies, including the VA. Security-first approach with deep expertise in sharing models, persona-based testing, and CRUD/FLS enforcement. Holds an active national security clearance.",
  "skills": [
    {
      "label": "Salesforce",
      "value": "Lightning Web Components (LWC), Apex, Experience Cloud, OmniStudio, 2GP Packages, Flow, SOQL"
    },
    {
      "label": "Design",
      "value": "Figma, SLDS 2, Design Tokens, IBM Carbon Design System, Sass"
    },
    {
      "label": "AI",
      "value": "OpenAI, Claude API, AI Agents, Prompt Engineering, MCP"
    },
    {
      "label": "DevOps",
      "value": "GitHub Actions, SonarQube, SFDX, Vercel, Jest, Playwright"
    },
    {
      "label": "Frontend",
      "value": "TypeScript, React, Next.js, Tailwind CSS, GraphQL, Redux, LWC"
    },
    {
      "label": "Backend",
      "value": "Node, Java, Supabase, Cloudflare Workers, Vercel Functions, REST APIs, AWS S3"
    }
  ],
  "experience": [
    {
      "date": "2024 — Present",
      "title": "Senior Salesforce Engineer / Technical Lead",
      "company": "Thrivent Financial",
      "companyHref": "https://www.thrivent.com",
      "bullets": [
        "Built and scaled 2GP package pipelines across 33+ repositories, managing multiple SFDX projects in parallel across multi-tier environments",
        "Developed Lightning Web Components with GraphQL and built Java-based connected apps for external clients",
        "Architected a Salesforce Bulk API 2.0 + Amazon S3 pipeline that streams large-scale query results to S3 and generates custom object artifacts for downstream packaging and analytics",
        "Owned GitHub Actions workflows and build maintenance; configured reports and dashboards across the platform",
        "Established design alignment mapping between Figma, SLDS 1, and SLDS 2 to standardize tokens across the design system",
        "Established LWC testing standards with a templated Jest guide and introduced Playwright for browser automation and end-to-end coverage",
        "Mentored engineers on AI engineering and modern Node/TypeScript across platform, web, and internal dev tooling",
        "Authored engineering, DevOps, and Salesforce documentation; drove cross-team feedback loops with design and customers in Agile/Kanban"
      ]
    },
    {
      "date": "2023 — 2024",
      "title": "Senior Salesforce Developer",
      "company": "MagMutual",
      "companyHref": "https://www.magmutual.com",
      "bullets": [
        "Led development of Lightning Web Components platform serving 10,000+ healthcare professionals, improving user engagement by 30%",
        "Architected enterprise Git workflow system with GitHub Actions, reducing deployment time by 40% across 5 development teams",
        "Developed real-time analytics dashboard processing 1M+ daily transactions with 99.9% uptime",
        "Implemented Jest testing suite achieving 95% code coverage and WCAG 2.1 compliance",
        "Built GraphQL-powered headless CMS integration, reducing content update time by 60%",
        "Designed component library based on IBM Carbon Design System, deployed across 3 customer-facing applications"
      ]
    },
    {
      "date": "2022 — 2023",
      "title": "Senior Salesforce Developer",
      "company": "Department of Veterans Affairs — PSIP",
      "companyHref": "",
      "bullets": [
        "Designed and delivered a Salesforce case management system for VA Personnel Security & Investigations Program (PSIP)",
        "Built an Experience Cloud portal for 10,000+ applicants to submit forms and track case status",
        "Architected queue-based sharing and case assignment for 500+ investigators",
        "Implemented SSO/JIT provisioning and Queueable-based permission set orchestration",
        "Hardened document access and test coverage with Security.stripInaccessible() and persona-based testing patterns"
      ]
    },
    {
      "date": "2021 — 2022",
      "title": "Salesforce Developer",
      "company": "Department of Veterans Affairs — VBA QMS",
      "companyHref": "",
      "bullets": [
        "Refactored 15+ test classes to least-privilege, persona-based security testing",
        "Implemented fflib Selector patterns with CRUD/FLS enforcement across query paths",
        "Replaced custom permission checks with FeatureManagement.checkPermission() and modernized Workflow Rules to before-save Flows",
        "Improved Apex test scores by 25-40 points and eliminated MIXED_DML_OPERATION failures via @testSetup"
      ]
    },
    {
      "date": "2018 — 2022",
      "title": "Lead Frontend Engineer",
      "company": "CodeScience",
      "companyHref": "https://www.codescience.com",
      "bullets": [
        "Delivered enterprise Salesforce solutions for Fortune 500 clients including RingCentral and Ford, serving 50,000+ daily users",
        "Led UI architecture for 15+ projects using TypeScript and LWC, establishing core design systems",
        "Core contributor to Salesforce DevOps Center, improving deployment efficiency for 1000+ organizations",
        "Implemented Redux state management pattern, reducing component complexity by 40%",
        "Mentored team of 8 developers in modern JavaScript practices and Salesforce development"
      ]
    },
    {
      "date": "2018",
      "title": "Senior JavaScript Developer",
      "company": "CNN",
      "companyHref": "https://www.cnn.com",
      "bullets": [
        "Developed cross-platform applications reaching 2M+ daily users across iOS, Roku, and Samsung devices",
        "Built real-time news delivery system using React and Node, handling 100K+ concurrent users",
        "Reduced application load time by 45% through performance optimization",
        "Led UI development for CNN's streaming platform launch"
      ]
    },
    {
      "date": "2014 — 2018",
      "title": "Senior Software Engineer",
      "company": "Cox Automotive",
      "companyHref": "https://www.coxautoinc.com",
      "bullets": [
        "Architected Node microservices processing 500K+ daily automotive transactions",
        "Led team of 6 frontend engineers, developing component library used across 20+ applications",
        "Built React-based auction check-in system deployed to 100+ locations nationwide",
        "Developed full-stack applications using Java Spring Boot, serving 50K+ automotive dealers"
      ]
    },
    {
      "date": "2013",
      "title": "Lead Frontend Developer",
      "company": "Look-Listen",
      "companyHref": "https://www.linkedin.com/company/look-listen/",
      "bullets": [
        "Led frontend development for 10+ major brands including Alternative Apparel and Matchstic",
        "Implemented responsive design system reducing mobile bounce rate by 35%",
        "Established modern development workflow with Node and Sass, improving team velocity by 50%",
        "Built social media integration platform handling 100K+ daily API calls",
        "Managed AWS infrastructure supporting 1M+ monthly active users"
      ]
    },
    {
      "date": "2010 — 2013",
      "title": "Senior Software Developer",
      "company": "Paper Tiger",
      "companyHref": "https://www.linkedin.com/company/the-monticello-corporation/",
      "bullets": [
        "Developed SaaS platform serving 20K+ users with PHP and JavaScript",
        "Implemented Google Docs API integration processing 50K+ documents monthly",
        "Built single-page application improving customer support efficiency by 40%",
        "Designed Ruby on Rails asset pipeline reducing page load times by 60%"
      ]
    }
  ],
  "education": [
    {
      "date": "2005 — 2010",
      "title": "B.Sc. Computer Science",
      "company": "Albany State University",
      "companyHref": "https://www.asurams.edu",
      "bullets": [
        "Graduated with 3.8 GPA, focus on algorithms and information security",
        "Led development of security research platform used by 500+ students",
        "Conducted DNA sequencing research using Perl and BioPerl",
        "Published paper on information assurance in undergraduate research journal"
      ]
    }
  ],
  "footer": []
};

export default resume;
