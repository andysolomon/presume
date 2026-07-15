/* Full résumé data — trimmed from web/src/modules/c/resumeData/resumeData.ts.
   Loaded as a raw <script type="text/babel"> — no module import/export. */
const resumeData = {
  header: {
    name: 'Andrew Solomon',
    title: 'Resume',
    subtitle: 'Software Developer',
    nameHref: 'https://www.linkedin.com/in/andrew-solomon-44550a24/',
  },
  meta: [
    { label: 'Location', value: 'Atlanta, Georgia' },
    { label: 'Portfolio', value: 'andrewsolomon.dev', href: 'https://andrewsolomon.dev' },
    { label: 'Email', value: 'andrewsolomon.edu@gmail.com', href: 'mailto:andrewsolomon.edu@gmail.com' },
  ],
  summary:
    'Senior Salesforce Engineer & Technical Lead with 15+ years of software development experience and 20+ full end-to-end Salesforce implementations. Deep Apex specialist across trigger frameworks, asynchronous processing, batch integrations, fflib patterns, governor-limit optimization, and enterprise test architecture. Expert in Lightning Web Components, Apex, 2nd-generation packages, and Experience Cloud. Proven track record leading technical teams, establishing engineering standards, and delivering enterprise-scale solutions for Fortune 500 companies and federal agencies, including the VA. Security-first approach with deep expertise in sharing models, persona-based testing, CRUD/FLS enforcement, and least-privilege Apex design. Holds an active national security clearance.',
  skills: [
    { label: 'Salesforce', value: 'Apex, LWC, SOQL, SOSL, Trigger Frameworks, Async Apex, fflib, Experience Cloud, OmniStudio, 2GP Packages, Flow' },
    { label: 'Design', value: 'Figma, SLDS 2, Design Tokens, IBM Carbon Design System, Sass' },
    { label: 'AI', value: 'OpenAI, Claude API, AI Agents, Prompt Engineering, MCP' },
    { label: 'DevOps', value: 'GitHub Actions, SonarQube, SFDX, Vercel, Jest, Playwright' },
    { label: 'Frontend', value: 'TypeScript, React, Next.js, Tailwind CSS, GraphQL, Redux, LWC' },
    { label: 'Backend', value: 'Node, Java, Supabase, Cloudflare Workers, Vercel Functions, REST APIs, AWS S3' },
  ],
  experience: [
    {
      date: '2024 — Present',
      title: 'Senior Salesforce Engineer / Technical Lead',
      company: 'Thrivent Financial',
      companyHref: 'https://www.thrivent.com',
      bullets: [
        'Built and scaled 2GP package pipelines across 33+ repositories, managing multiple SFDX projects in parallel across multi-tier environments',
        'Developed Lightning Web Components with GraphQL and Apex service layers that integrate with Java-based connected apps for external clients',
        'Architected a Salesforce Bulk API 2.0 + Amazon S3 pipeline that streams large-scale query results to S3 and generates custom object artifacts',
        'Established Apex and LWC testing standards, including dependency-isolated unit tests, templated Jest guidance, and Playwright automation',
      ],
    },
    {
      date: '2023 — 2024',
      title: 'Senior Salesforce Developer',
      company: 'MagMutual',
      companyHref: 'https://www.magmutual.com',
      bullets: [
        'Led development of a Lightning Web Components platform serving 10,000+ healthcare professionals, improving engagement by 30%',
        'Architected an enterprise Git workflow with GitHub Actions, reducing deployment time by 40% across 5 teams',
        'Designed a component library based on IBM Carbon Design System, deployed across 3 customer-facing applications',
      ],
    },
    {
      date: '2022 — 2023',
      title: 'Senior Salesforce Developer',
      company: 'Department of Veterans Affairs — PSIP',
      companyHref: '',
      bullets: [
        'Designed and delivered a Salesforce case management system for the VA Personnel Security & Investigations Program',
        'Built an Experience Cloud portal for 10,000+ applicants to submit forms and track case status',
        'Hardened Apex document access with Security.stripInaccessible(), CRUD/FLS checks, and persona-based testing',
      ],
    },
    {
      date: '2018 — 2022',
      title: 'Lead Frontend Engineer',
      company: 'CodeScience',
      companyHref: 'https://www.codescience.com',
      bullets: [
        'Delivered enterprise Salesforce solutions for Fortune 500 clients including RingCentral and Ford, serving 50,000+ daily users',
        'Core contributor to Salesforce DevOps Center, improving deployment efficiency for 1000+ organizations',
        'Mentored a team of 8 developers in modern JavaScript practices and Salesforce development',
      ],
    },
  ],
  education: [
    {
      date: '2005 — 2010',
      title: 'B.Sc. Computer Science',
      company: 'Albany State University',
      companyHref: 'https://www.asurams.edu',
      bullets: [
        'Graduated with 3.8 GPA, focus on algorithms and information security',
        'Led development of a security research platform used by 500+ students',
      ],
    },
  ],
  footer: [
    { label: 'linkedin.com/in/andysolomon', href: 'https://www.linkedin.com/in/andrew-solomon-44550a24/' },
    { label: 'github.com/andysolomon', href: 'https://github.com/andysolomon' },
  ],
};

/* Résumé screen — the full andrewsolomon.dev résumé, composed from primitives.
   Depends on the DS bundle globals being present on window. */
function ResumeScreen({ ns }) {
  const { TitleBlock, MetaRow, SectionHeader, CVEvent, Footer, Hairline, Link } = ns;
  const d = resumeData;

  return (
    <main className="resume-sheet" aria-label="Andrew Solomon — Résumé">
      <TitleBlock name={d.header.name} title={d.header.title} subtitle={d.header.subtitle} nameHref={d.header.nameHref} />

      <div className="alt-row">
        <Link href="#" variant="eyebrow">View government experience</Link>
        <Link href="#" variant="eyebrow">View Salesforce Tech Lead resume</Link>
      </div>

      <section className="meta-block">
        {d.meta.map((m) => (
          <MetaRow key={m.label} label={m.label} value={m.value} href={m.href} />
        ))}
        <Hairline spacing="md" />
      </section>

      <section>
        <SectionHeader>Summary</SectionHeader>
        <p className="prose">{d.summary}</p>
      </section>

      <section>
        <SectionHeader>Technical Skills</SectionHeader>
        <ul className="skills">
          {d.skills.map((s) => (
            <li key={s.label}>
              <span className="skill-label">{s.label}</span> {s.value}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <SectionHeader>Experience</SectionHeader>
        {d.experience.map((e, i) => (
          <CVEvent key={i} title={e.title} company={e.company} companyHref={e.companyHref} date={e.date} bullets={e.bullets} />
        ))}
      </section>

      <section>
        <SectionHeader>Education</SectionHeader>
        {d.education.map((e, i) => (
          <CVEvent key={i} title={e.title} company={e.company} companyHref={e.companyHref} date={e.date} bullets={e.bullets} />
        ))}
      </section>

      <Footer links={d.footer} />
    </main>
  );
}

Object.assign(window, { ResumeScreen, resumeData });
