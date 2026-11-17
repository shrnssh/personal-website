// All site content lives here — edit this file to update the site.

export const profile = {
  name: 'Sharan Seshadri',
  roles: ['Software Engineer', 'Cloud Infrastructure', 'Backend Systems', 'Observability'],
  location: 'Bay Area, CA',
  photo: '/assets/sharan-seshadri.png',
  intro:
    'I design and build scalable, cloud-native systems, with a focus on improving reliability, visibility, and functionality for complex infrastructure.',
  offTheClock:
    "Away from the keyboard you'll find me watching Premier League football (Arsenal since 2007), hiking around the Bay Area, and hanging out with friends and family.",
  socials: {
    linkedin: 'https://www.linkedin.com/in/sharan-seshadri',
    x: 'https://x.com/sharan2510',
    github: 'https://github.com/shrnssh',
  },
}

export type Link = { label: string; href: string }

export type Experience = {
  role: string
  org: string
  orgUrl?: string
  period: string
  location?: string
  /** Earlier titles at the same company, most recent first. */
  previousRoles?: { role: string; period: string }[]
  /** Short one-line summary, used on the home page. */
  summary?: string
  points: (string | { text: string; link: Link })[]
}

export const experience: Experience[] = [
  {
    role: 'Senior Software Engineer',
    org: 'Crusoe',
    orgUrl: 'https://crusoe.ai/',
    period: 'Aug 2026 — Present',
    previousRoles: [{ role: 'Software Engineer', period: 'Mar 2025 — Aug 2026' }],
    summary: "Building and scaling Crusoe's Managed Kubernetes platform, powering GPU-accelerated AI/ML infrastructure.",
    points: [
      {
        text: "Building and scaling Crusoe's {link} platform, powering GPU-accelerated AI/ML infrastructure.",
        link: { label: 'Managed Kubernetes', href: 'https://docs.crusoe.ai/orchestration/cmk/overview/' },
      },
    ],
  },
  {
    role: 'Software Engineer',
    org: 'Juniper Networks',
    orgUrl: 'https://www.juniper.net/us/en.html',
    period: 'Jul 2021 — Mar 2025',
    location: 'Sunnyvale, CA',
    points: [
      {
        text: 'Contributed to visibility features for {link}, a SaaS multi-cloud networking product.',
        link: {
          label: 'Juniper Cloud Interlink (JCI)',
          href: 'https://www.juniper.net/gb/en/company/juniper-innovations/beyond-labs/cloud-interlink.html',
        },
      },
      'Owned the "Application Visibility" component, delivering actionable insights into application performance through metrics such as data consumption trends.',
      'Designed and implemented cost visibility features that aggregate compute and network spend across AWS resources, giving customers detailed cost analysis.',
      'Built a central monitoring system on Thanos for multi-cluster metric aggregation and querying.',
    ],
  },
]

export const education = [
  {
    degree: 'M.S., Electrical and Computer Engineering',
    school: 'Carnegie Mellon University',
    url: 'https://www.cmu.edu/',
    period: '2020 — 2021',
    location: 'Pittsburgh, PA',
  },
  {
    degree: 'B.Tech., Electronics and Communication Engineering',
    school: 'Manipal Institute of Technology',
    url: 'https://www.manipal.edu/mit.html',
    period: '2015 — 2019',
    location: 'Manipal, India',
  },
]

export const skills: Record<string, string[]> = {
  Languages: ['Go', 'Python', 'C++'],
  'Cloud & Infra': ['Kubernetes', 'Helm', 'ArgoCD', 'Docker', 'AWS SDK', 'gRPC', 'REST / API design'],
  Observability: ['Prometheus', 'Thanos', 'Grafana', 'OpenSearch'],
  Tooling: ['Git', 'Bazel', 'PostgreSQL'],
}

export const publications = [
  {
    year: '2021',
    title: 'Beyond Classification: Knowledge Distillation using Multi-Object Impressions',
    venue: 'British Machine Vision Conference (BMVC)',
    url: 'https://arxiv.org/pdf/2110.14215',
  },
  {
    year: '2020',
    title: 'ManufacturingNet: A Machine Learning Toolbox for Engineers',
    venue: 'ML4Eng Workshop @ NeurIPS',
    url: 'https://ml4eng.github.io/camera_readys/52.pdf',
  },
]

export const academic: Experience[] = [
  {
    role: 'Graduate Research Assistant',
    org: 'Carnegie Mellon University',
    orgUrl: 'https://www.cmu.edu/',
    period: 'May 2020 — Aug 2020',
    location: 'Pittsburgh, PA',
    points: [
      'Developed a method to classify abnormal ciliary motion using two-stream convolutional neural networks, improving on the benchmark for binary classification.',
      'Contributed to ManufacturingNet, an open-source Python library of featurization and learning algorithms for data-driven manufacturing problems. Accepted to the NeurIPS 2020 ML4Eng workshop.',
    ],
  },
  {
    role: 'Project Assistant',
    org: 'Indian Institute of Science',
    orgUrl: 'https://www.iisc.ac.in/',
    period: 'Jul 2019 — Dec 2019',
    location: 'Bengaluru, India',
    points: [
      'Implemented a novel approach to data-free deep learning using knowledge distillation for object detection.',
      "Built a baseline that generates an object-detection dataset from a trained model's weights (Pascal VOC), then used it to distill a larger model into a smaller one.",
    ],
  },
]
