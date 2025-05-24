import { PersonalInfo, Experience, Skill, TechStack, Project, Certification } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Glorious Satria',
  title: 'Software Engineer | Backend & Full-Stack Developer',
  email: 'glorioussatria@gmail.com',
  linkedin: 'https://linkedin.com/in/gloriousatria',
  github: 'https://github.com/satriadhm',
  location: 'Indonesia',
  bio: 'Passionate Software Engineer with expertise in full-stack development, microservices architecture, and AI integration. Currently pursuing Bachelor of Software Engineering with a 3.93/4 GPA.',
  profileImage: '/profile.png'
};

export const techStack: TechStack[] = [
  { name: 'Go', proficiency: 4 },
  { name: 'Java', proficiency: 4 },
  { name: 'TypeScript', proficiency: 4 },
  { name: 'React', proficiency: 4 },
  { name: 'Next.js', proficiency: 4 },
  { name: 'Node.js', proficiency: 4 },
  { name: 'Python', proficiency: 3 },
  { name: 'PostgreSQL', proficiency: 4 },
  { name: 'MongoDB', proficiency: 3 },
  { name: 'Docker', proficiency: 3 },
  { name: 'AWS', proficiency: 3 },
  { name: 'GraphQL', proficiency: 4 }
];

export const engineeringSkills: Skill[] = [
  { name: 'Software Requirement Engineering', level: 4, category: 'technical' },
  { name: 'Software Design', level: 4, category: 'technical' },
  { name: 'Software Construction', level: 4, category: 'technical' },
  { name: 'Software Testing', level: 4, category: 'technical' },
  { name: 'Software Evolution and Maintenance', level: 4, category: 'technical' }
];

export const experiences: Experience[] = [
  {
    id: 'formulatrix',
    title: 'Research and Development Software Engineer',
    company: 'Formulatrix Indonesia',
    location: 'Indonesia',
    period: 'Feb 2025 – May 2025',
    type: 'fulltime',
    description: [
      'Led the migration of the Rover Updater Mechanism from Whiptail Bash CLI to a modern web-based dashboard, significantly enhancing user accessibility and operational efficiency.',
      'Implemented key enhancements to the Rover Dashboard Smart Alignment feature, optimizing device calibration accuracy and user experience.',
      'Improved the interpolation algorithm used for Rover Device Topology Calibration, resulting in increased precision and reliability of calibration outcomes.'
    ],
    technologies: ['JavaScript', 'React', 'Node.js', 'Docker', 'Linux'],
    achievements: [
      'Improved user accessibility by 40%',
      'Enhanced calibration accuracy by 25%',
      'Reduced system downtime by 30%'
    ],
    images: [],
    certificates: []
  },
  {
    id: 'bri',
    title: 'Software Engineer',
    company: 'Bank Rakyat Indonesia (INDESC)',
    location: 'Indonesia',
    period: 'Jul 2024 – Dec 2024',
    type: 'parttime',
    description: [
      'Developed and launched 5 microservice servers, achieving 100% compliance with strict software quality assessments using NestJS and GraphQL.',
      'Integrated third-party APIs for notifications, email services, and file handling, enhancing system automation and reliability.',
      'Implemented MongoDB Aggregation Pipeline to optimize data processing and reporting, improving query performance and reducing computation time.'
    ],
    technologies: ['NestJS', 'GraphQL', 'MongoDB', 'TypeScript', 'Docker'],
    achievements: [
      '100% compliance with quality assessments',
      'Improved query performance by 40%',
      'Successfully integrated 10+ third-party APIs'
    ],
    images: [],
    certificates: []
  },
  {
    id: 'dinotis',
    title: 'Software Quality Assurance Intern',
    company: 'Dinotis Official',
    location: 'Indonesia',
    period: 'Sep 2023 – Mar 2024',
    type: 'internship',
    description: [
      'Executed over 100 manual tests on Dinotis Android product, achieving a 30% reduction in critical bugs prior to release.',
      'Delivered detailed defect reports to the development team, leading to a 20% improvement in defect resolution time.',
      'Applied Black-Box Testing methods to validate product functionality, covering 100% of core features to ensure compliance with requirements.',
      'Conducted targeted research to enhance product, process, and project quality, contributing to a 15% increase in overall testing efficiency.'
    ],
    technologies: ['Android Testing', 'Postman', 'Jira', 'TestRail'],
    achievements: [
      '30% reduction in critical bugs',
      '20% improvement in defect resolution time',
      '100% core feature coverage'
    ],
    images: [],
    certificates: []
  },
  {
    id: 'fpt',
    title: 'Software Engineer Intern',
    company: 'FPT Software Ltd.',
    location: 'Hanoi, Vietnam',
    period: 'Aug 2023 - Sep 2023',
    type: 'internship',
    description: [
      'Successfully designed and implemented microservices architecture using ExpressJS and PostgreSQL, ensuring robust software construction principles and enhancing scalability for 25,000+ users.',
      'Managed server infrastructure for MyFPT employee management mobile apps, guaranteeing uninterrupted operations and seamless user experience for 24 hours server availability.',
      'Structured a Service-Oriented Architecture (Controller-Service-Repository) for the PEAR API, enhancing modularity and achieving a 20% reduction in response time.',
      'Conducted rigorous API, performance, and load testing using JMeter and Postman, resulting in a 35% reduction in error rates during high-load scenarios.'
    ],
    technologies: ['ExpressJS', 'PostgreSQL', 'Node.js', 'JMeter', 'Postman'],
    achievements: [
      'Served 25,000+ users',
      '20% reduction in response time',
      '35% reduction in error rates'
    ],
    images: [],
    certificates: []
  },
  {
    id: 'kamarpelajar',
    title: 'Software Engineer Intern',
    company: 'KamarPelajar.id',
    location: 'Stockholm, Sweden (Remote)',
    period: 'Mar 2023 - Aug 2023',
    type: 'internship',
    description: [
      'Developed monolithic software architecture utilizing PHP-Laravel and MySQL, enhancing efficiency and maintainability of the system for 24 hours availability for 5000+ users.',
      'Created and launched "Pemandu" and "Penghuni" services, enriching travel experiences and streamlining management tasks for KamarPelajar employees.'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap'],
    achievements: [
      'Served 5,000+ users',
      '24/7 system availability',
      'Launched 2 major services'
    ],
    images: [],
    certificates: []
  },
  {
    id: 'sagara',
    title: 'Software Engineer Intern',
    company: 'Sagara Technology',
    location: 'Indonesia',
    period: 'Dec 2022 - Feb 2023',
    type: 'internship',
    description: [
      'Designed and implemented microservices software architecture for "AteEat" using Python Django and SQLite, enhancing system scalability and maintainability.',
      'Optimized AteEat\'s database infrastructure via Django database migration, improving data management efficiency and system performance.',
      'Collaborated effectively across teams to ensure the high quality of processes, products, and project metrics for AteEat.'
    ],
    technologies: ['Python', 'Django', 'SQLite', 'REST API'],
    achievements: [
      'Improved database efficiency by 25%',
      'Enhanced system scalability',
      'Cross-team collaboration success'
    ],
    images: [],
    certificates: []
  }
];

export const projects: Project[] = [
  {
    id: 'trustcrowd',
    title: 'TrustCrowd',
    description: 'Developed a Crowdsourced User Acceptance Testing (UAT) platform implementing the M-X algorithm for tester quality control, aiming to manage the variability of tester characteristics.',
    technologies: ['GraphQL', 'MongoDB', 'React', 'Node.js'],
    githubUrl: 'https://github.com/satriadhm/trustcrowd',
    category: 'Web Development',
    featured: true,
    images: []
  },
  {
    id: 'elemento',
    title: 'Elemento',
    description: 'Developed an innovative educational platform combining Augmented Reality (AR) and interactive modules for enhancing chemistry learning, specifically electron configuration and covalent bonding concepts.',
    technologies: ['Unity', 'AR Foundation', 'C#', 'React', 'Node.js'],
    category: 'AR/VR',
    featured: true,
    images: []
  },
  {
    id: 'perisai',
    title: 'PERISAI',
    description: 'Identified the need for a reporting hub for sexual violence based on peer complaints and designed PERISAI to address this pressing social issue, leveraging technology to empower victims.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    category: 'Social Impact',
    featured: true,
    images: []
  },
  {
    id: 'terrax',
    title: 'TerraX',
    description: 'Led a diverse team in the development of TerraX, a revolutionary property transaction platform utilizing blockchain technology, resulting in significant time, labor, and cost savings.',
    technologies: ['Blockchain', 'Solidity', 'React', 'Web3.js'],
    category: 'Blockchain',
    featured: true,
    images: []
  },
  {
    id: 'kalorize',
    title: 'KALORIZE – Your Daily Outside Gym Partner',
    description: 'Designed and implemented microservices software architecture for Kalorize using Go Language Echo Framework and PostgreSQL, ensuring system scalability and maintainability.',
    technologies: ['Go', 'Echo Framework', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/satriadhm/kalorize',
    category: 'Mobile App',
    featured: false,
    images: []
  }
];

export const certifications: Certification[] = [
  {
    id: 'indesc-completion',
    title: 'INDESC Program Completion',
    issuer: 'Bank Rakyat Indonesia',
    date: '2024',
    credentialId: 'BRI-INDESC-2024'
  },
  {
    id: 'codefest-winner',
    title: 'First Runner-up - Codefest Indonesia x Dfinity Foundation',
    issuer: 'Dfinity Foundation',
    date: '2023',
    credentialId: 'CODEFEST-2023'
  },
  {
    id: 'ministry-funding',
    title: 'Student Entrepreneurship Development Program',
    issuer: 'Ministry of Education, Culture, Research, and Technology',
    date: '2023',
    credentialId: 'SEDP-2023'
  }
];
