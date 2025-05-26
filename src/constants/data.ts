import { PersonalInfo, Experience, TechStack, Project, Certification, LifeEvent } from '@/types';

export const personalInfo: PersonalInfo = {
  name: 'Glorious Satria',
  title: 'Software Engineer | Backend & Full-Stack Developer',
  email: 'glorioussatria@gmail.com',
  linkedin: 'https://linkedin.com/in/gloriousatria',
  github: 'https://github.com/satriadhm',
  location: 'Indonesia',
  bio: 'Passionate Software Engineer with expertise in full-stack development, solution architecture, and scientific implementation. Currently building innovative solutions for laboratory automation and educational technology.',
  profileImage: '/profile.png'
};

export const roles = [
  'Software Engineer',
  'Backend Developer',
  'Full-Stack Developer',
  'Project Manager',
  'AI Integration Enthusiast',
];

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

export const lifeEvents: LifeEvent[] = [
  {
    id: 'granada-life-2024',
    year: '2024',
    title: 'Granada Chronicles',
    subtitle: 'Living the Andalusian Dream as an Exchange Student',
    description: 'An immersive documentary series following my daily life in the enchanting city of Granada, Spain. From morning coffee at local cafés to evening strolls through the historic Albaicín, experience the authentic Spanish lifestyle through the eyes of an international student.',
    location: 'Granada, Spain',
    type: 'lifestyle',
    images: [
      '/images/journey/granada-life-hero.jpg',
      '/images/journey/granada-morning-coffee.jpg',
      '/images/journey/granada-alhambra-sunset.jpg',
      '/images/journey/granada-tapas-night.jpg',
      '/images/journey/granada-flamenco-show.jpg',
      '/images/journey/granada-friends-plaza.jpg',
      '/images/journey/granada-university-life.jpg',
      '/images/journey/granada-albaicin-walk.jpg'
    ],
    rating: 9.8,
    category: 'Spanish Chronicles',
    highlight: true
  },
  {
    id: 'culturise-granada-2024',
    year: '2024',
    title: 'Culturise: St.Cruz Stories',
    subtitle: 'Cultural Fusion at Granada\'s International Dormitory',
    description: 'A vibrant cultural celebration series documenting the incredible Culturise event at St.Cruz dormitory. Watch as students from around the world unite to share their heritage through food, music, dance, and traditions.',
    location: 'St.Cruz Dorm, Granada',
    type: 'cultural',
    images: [
      '/images/journey/culturise-hero.jpg',
      '/images/journey/culturise-preparation.jpg',
      '/images/journey/culturise-indonesian-booth.jpg',
      '/images/journey/culturise-international-food.jpg',
      '/images/journey/culturise-traditional-dance.jpg',
      '/images/journey/culturise-group-photo.jpg',
      '/images/journey/culturise-night-celebration.jpg'
    ],
    rating: 9.5,
    category: 'Cultural Moments',
    highlight: true
  },
  {
    id: 'asean-night-2024',
    year: '2024',
    title: 'ASEAN Night: The Performance',
    subtitle: 'Rocking the Stage with My Band in Granada',
    description: 'A concert documentary capturing an unforgettable night where music transcended borders. Follow the behind-the-scenes preparation, nervous energy, and electrifying performance as my band takes the stage at ASEAN Night.',
    location: 'Granada, Spain',
    type: 'music',
    images: [
      '/images/journey/asean-night-hero.jpg',
      '/images/journey/asean-night-rehearsal.jpg',
      '/images/journey/asean-night-backstage.jpg',
      '/images/journey/asean-night-performance.jpg',
      '/images/journey/asean-night-crowd.jpg',
      '/images/journey/asean-night-band-photo.jpg',
      '/images/journey/asean-night-celebration.jpg'
    ],
    rating: 9.7,
    category: 'Musical Performances',
    highlight: true
  },
  {
    id: 'paris-adventure-2024',
    year: '2024',
    title: 'Paris in One Day',
    subtitle: 'The Ultimate Parisian Adventure from Dawn to Dusk',
    description: 'An ambitious travel documentary following an incredible 24-hour journey through the City of Light. From sunrise at the Eiffel Tower to midnight along the Seine, experience the whirlwind adventure of seeing Paris\' greatest treasures.',
    location: 'Paris, France',
    type: 'travel',
    images: [
      '/images/journey/paris-hero.jpg',
      '/images/journey/paris-eiffel-sunrise.jpg',
      '/images/journey/paris-louvre-museum.jpg',
      '/images/journey/paris-notre-dame.jpg',
      '/images/journey/paris-cafe-breakfast.jpg',
      '/images/journey/paris-seine-sunset.jpg',
      '/images/journey/paris-montmartre.jpg'
    ],
    rating: 9.4,
    category: 'Euro Adventures',
    highlight: true
  },
  {
    id: 'austria-adventure-2024',
    year: '2024',
    title: 'Austrian Alpine Magic',
    subtitle: 'One Day in Austria\'s Breathtaking Landscapes',
    description: 'A stunning visual journey through Austria\'s magnificent alpine scenery and charming villages. This travel special captures the essence of Austrian culture, from traditional coffee houses in Salzburg to panoramic mountain views.',
    location: 'Austria',
    type: 'adventure',
    images: [
      '/images/journey/austria-hero.jpg',
      '/images/journey/austria-salzburg-old-town.jpg',
      '/images/journey/austria-alpine-views.jpg',
      '/images/journey/austria-traditional-cafe.jpg',
      '/images/journey/austria-mountain-lake.jpg',
      '/images/journey/austria-village-charm.jpg'
    ],
    rating: 9.2,
    category: 'Euro Adventures'
  },
  {
    id: 'interlaken-adventure-2024',
    year: '2024',
    title: 'Swiss Paradise: Interlaken',
    subtitle: 'Adventure Capital of Switzerland in 24 Hours',
    description: 'An adrenaline-pumping adventure series set in the heart of the Swiss Alps. Experience the thrill of paragliding over turquoise lakes, exploring charming mountain villages, and witnessing some of the most spectacular alpine scenery on Earth.',
    location: 'Interlaken, Switzerland',
    type: 'adventure',
    images: [
      '/images/journey/interlaken-hero.jpg',
      '/images/journey/interlaken-paragliding.jpg',
      '/images/journey/interlaken-lake-view.jpg',
      '/images/journey/interlaken-jungfrau.jpg',
      '/images/journey/interlaken-village.jpg',
      '/images/journey/interlaken-adventure-sports.jpg'
    ],
    rating: 9.6,
    category: 'Euro Adventures',
    highlight: true
  },
  {
    id: 'munich-adventure-2024',
    year: '2024',
    title: 'Munich Memories',
    subtitle: 'Bavarian Culture and City Charm in One Day',
    description: 'A delightful cultural exploration of Munich\'s rich Bavarian heritage. From traditional beer gardens and historic architecture to modern city life, this travel documentary showcases the perfect blend of old and new that makes Munich uniquely charming.',
    location: 'Munich, Germany',
    type: 'cultural',
    images: [
      '/images/journey/munich-hero.jpg',
      '/images/journey/munich-marienplatz.jpg',
      '/images/journey/munich-beer-garden.jpg',
      '/images/journey/munich-neuschwanstein.jpg',
      '/images/journey/munich-old-town.jpg',
      '/images/journey/munich-traditional-food.jpg'
    ],
    rating: 8.9,
    category: 'Euro Adventures'
  },
  {
    id: 'milan-summer-2024',
    year: '2024',
    title: 'Milan Summer Vibes',
    subtitle: 'Fashion Capital Adventures Under the Italian Sun',
    description: 'A stylish summer adventure through Milan\'s fashion districts, hidden gems, and vibrant neighborhoods. This travel series captures the essence of Italian summer living, from morning espresso rituals to evening aperitivo culture.',
    location: 'Milan, Italy',
    type: 'lifestyle',
    images: [
      '/images/journey/milan-hero.jpg',
      '/images/journey/milan-duomo-cathedral.jpg',
      '/images/journey/milan-fashion-district.jpg',
      '/images/journey/milan-aperitivo-time.jpg',
      '/images/journey/milan-brera-district.jpg',
      '/images/journey/milan-summer-streets.jpg'
    ],
    rating: 9.1,
    category: 'Summer Escapes',
    highlight: true
  },
  {
    id: 'lake-como-summer-2024',
    year: '2024',
    title: 'Lake Como Dreams',
    subtitle: 'Italian Riviera Paradise and Luxury Living',
    description: 'A breathtaking summer escape to one of Italy\'s most romantic destinations. This luxury travel series showcases the stunning beauty of Lake Como, from villa gardens and boat rides to lakeside dining and sunset views.',
    location: 'Lake Como, Italy',
    type: 'travel',
    images: [
      '/images/journey/como-hero.jpg',
      '/images/journey/como-boat-ride.jpg',
      '/images/journey/como-villa-gardens.jpg',
      '/images/journey/como-bellagio-town.jpg',
      '/images/journey/como-sunset-dinner.jpg',
      '/images/journey/como-mountain-views.jpg',
      '/images/journey/como-luxury-hotels.jpg'
    ],
    rating: 9.8,
    category: 'Summer Escapes',
    highlight: true
  }
];


export const experiences: Experience[] = [
  {
    id: 'formulatrix',
    title: 'Research and Development Software Engineer',
    company: 'Formulatrix Indonesia',
    location: 'Indonesia',
    period: 'Feb 2025 – Present',
    type: 'fulltime',
    description: [
      'Formulatrix is a global leader in laboratory automation solutions, revolutionizing scientific research through innovative robotics and software systems. My journey here began as a Graduate Intern, where I quickly demonstrated my capabilities and was offered a full-time position as an R&D Software Engineer.',
      'In this role, I spearheaded the transformation of critical laboratory automation systems. My primary achievement was leading the complete migration of the Rover Updater Mechanism from a legacy Whiptail Bash CLI system to a modern, intuitive web-based dashboard. This wasn\'t just a technical upgrade—it was about making complex laboratory equipment more accessible to researchers worldwide.',
      'Working on the Rover Dashboard Smart Alignment feature, I implemented key enhancements that directly impacted the precision of scientific instruments. Every line of code I wrote contributed to more accurate research outcomes in laboratories around the globe. The improved interpolation algorithm I developed for Rover Device Topology Calibration became a cornerstone of the system\'s reliability.',
      'Collaborating with cross-functional teams of engineers, product managers, and quality assurance specialists, I ensured that every solution met the stringent industry standards required for laboratory automation systems. This experience taught me the critical importance of precision in scientific software development.'
    ],
    technologies: ['Dotnet', 'C#', 'C++', 'Docker', 'Linux', 'Bash'],
    achievements: [
      'Improved user accessibility by 40%',
      'Enhanced calibration accuracy by 25%',
      'Reduced system downtime by 30%',
      'Successfully migrated legacy CLI to modern web dashboard'
    ],
    images: [
      '/images/formulatrix-dashboard.jpg',
      '/images/formulatrix-rover.jpg',
      '/images/formulatrix-team.jpg'
    ],
    certificates: [
      '/certificates/formulatrix-completion.pdf',
      '/certificates/formulatrix-excellence.pdf'
    ]
  },
  {
    id: 'bri',
    title: 'Software Engineer',
    company: 'Bank Rakyat Indonesia (INDESC)',
    location: 'Indonesia',
    period: 'Jul 2024 – Dec 2024',
    type: 'parttime',
    description: [
      'Bank Rakyat Indonesia (BRI) is Indonesia\'s largest bank and one of the oldest financial institutions in the country, serving millions of customers across the archipelago. I joined BRI through an outsourcing project specifically focused on revamping their digital infrastructure and modernizing their web platforms.',
      'As part of the INDESC (Indonesia Digital Economy and Society Convergence) initiative, I was entrusted with developing and launching five critical microservice servers that formed the backbone of BRI\'s digital transformation. Working with cutting-edge technologies like NestJS and GraphQL, I ensured that every service achieved 100% compliance with the bank\'s strict software quality assessments—a testament to the rigorous standards required in financial technology.',
      'The integration of third-party APIs became a fascinating challenge, connecting various external services for notifications, email systems, and file handling. Each integration required careful consideration of security protocols and data integrity, fundamental aspects of banking software. My implementation of MongoDB Aggregation Pipelines revolutionized how the bank processed and reported data, significantly improving system performance.',
      'Throughout this project, I participated in comprehensive code reviews and maintained the high coding standards that financial institutions demand. This experience deepened my understanding of enterprise-level software development and the critical role technology plays in Indonesia\'s financial ecosystem.'
    ],
    technologies: ['NestJS', 'GraphQL', 'MongoDB', 'TypeScript', 'Docker', 'JWT', 'Redis'],
    achievements: [
      '100% compliance with quality assessments',
      'Improved query performance by 40%',
      'Successfully integrated 10+ third-party APIs',
      'Reduced API response time by 35%',
      'Maintained 99.9% uptime for all microservices'
    ],
    images: [
      '/images/bri-architecture.jpg',
      '/images/bri-dashboard.jpg',
      '/images/bri-team.jpg',
      '/images/bri-presentation.jpg'
    ],
    certificates: [
      '/certificates/bri-main.pdf',
      '/certificates/bri-kredit.pdf',
    ]
  },
  {
    id: 'dinotis',
    title: 'Software Quality Assurance Intern',
    company: 'Dinotis Official',
    location: 'Indonesia',
    period: 'Sep 2023 – Mar 2024',
    type: 'internship',
    description: [
      'Dinotis Official is an innovative Indonesian startup focused on developing cutting-edge mobile applications and digital solutions. My journey with Dinotis began when I participated in their intensive bootcamp laboratory program, where my performance and dedication caught the attention of their development team, leading to an internship opportunity.',
      'During this transformative six-month internship, I immersed myself in the world of software quality assurance, becoming the guardian of product reliability. I meticulously executed over 100 manual tests on Dinotis\'s flagship Android product, each test serving as a critical checkpoint to ensure users would have a seamless experience.',
      'My approach to quality assurance went beyond simple bug detection. I crafted detailed defect reports that served as roadmaps for the development team, helping them understand not just what was broken, but why it mattered and how to fix it efficiently. Applying Black-Box Testing methodologies, I systematically validated every core feature, ensuring 100% coverage and compliance with product requirements.',
      'The research component of my role allowed me to contribute to the continuous improvement of Dinotis\'s development processes. I analyzed patterns in defects, identified bottlenecks in the testing pipeline, and proposed solutions that enhanced overall efficiency. This experience taught me that quality assurance is not just about finding problems—it\'s about preventing them and building better systems.'
    ],
    technologies: ['Android Testing', 'Postman', 'Jira', 'TestRail', 'Selenium', 'Appium'],
    achievements: [
      '30% reduction in critical bugs',
      '20% improvement in defect resolution time',
      '100% core feature coverage',
      'Created 200+ test cases',
      'Improved testing efficiency by 15%'
    ],
    images: [
    ],
    certificates: [
      '/certificates/dinotis-qa-internship.pdf',
    ]
  },
  {
    id: 'fpt',
    title: 'Software Engineer Intern',
    company: 'FPT Software Ltd.',
    location: 'Hanoi, Vietnam',
    period: 'Aug 2023 - Sep 2023',
    type: 'internship',
    description: [
      'FPT Software is one of the largest technology corporations in Vietnam and a leading provider of software outsourcing services globally. Being selected for their Global Internship Program 2023 was a remarkable achievement—I was among the fortunate 2% chosen from over 8,000 applicants worldwide, representing the cream of international talent.',
      'Living and working in Hanoi for two months provided me with an invaluable cross-cultural experience while tackling complex technical challenges. I was entrusted with designing and implementing a robust microservices architecture using ExpressJS and PostgreSQL, creating systems capable of serving over 25,000 users with unwavering reliability.',
      'My responsibilities extended to managing the server infrastructure for MyFPT, the company\'s comprehensive employee management mobile application ecosystem. Ensuring 24/7 server availability wasn\'t just about uptime—it was about supporting the daily operations of thousands of FPT employees across multiple countries. I architected a Service-Oriented Architecture following the Controller-Service-Repository pattern for the PEAR API, which became a model for modularity and efficiency.',
      'The rigorous testing phase involved comprehensive API, performance, and load testing using industry-standard tools like JMeter and Postman. This systematic approach to quality assurance resulted in dramatically improved system reliability. Working alongside Vietnamese and international colleagues broadened my perspective on global software development practices and cross-cultural collaboration in technology.'
    ],
    technologies: ['ExpressJS', 'PostgreSQL', 'Node.js', 'JMeter', 'Postman', 'Docker', 'Git'],
    achievements: [
      'Served 25,000+ users',
      '20% reduction in response time',
      '35% reduction in error rates',
      '24/7 server availability',
      'Successfully integrated with mobile apps'
    ],
    images: [
      '/images/fpt-office.jpg',
      '/images/fpt-hanoi.jpg',
      '/images/fpt-team.jpg',
      '/images/fpt-project.jpg'
    ],
    certificates: [
      '/certificates/fpt-internship-completion.pdf',
    ]
  },
  {
    id: 'kamarpelajar',
    title: 'Software Engineer Intern',
    company: 'KamarPelajar.id',
    location: 'Stockholm, Sweden (Remote)',
    period: 'Mar 2023 - Aug 2023',
    type: 'internship',
    description: [
      'KamarPelajar.id is an innovative Swedish-Indonesian startup that bridges the gap between international students and quality accommodation solutions. This unique company operates at the intersection of education, technology, and hospitality, helping students find their perfect home away from home.',
      'Working remotely with this Stockholm-based team for six months taught me the art of distributed collaboration across continents and time zones. Despite the 6-hour time difference, I successfully integrated with their agile development processes and contributed to their mission of making student life easier worldwide.',
      'I developed a comprehensive monolithic software architecture using PHP-Laravel and MySQL, creating a robust foundation that supported over 5,000 users with 24/7 availability. The system I built wasn\'t just functional—it was scalable and maintainable, designed to grow with the company\'s expanding user base.',
      'Two major services emerged from my work: "Pemandu" (Guide) and "Penghuni" (Resident), each designed to address specific pain points in the student accommodation journey. Pemandu enriched the travel and exploration experience for students, while Penghuni streamlined management tasks for KamarPelajar employees. My implementation of responsive web design principles ensured that students could access these services seamlessly across all devices, whether they were using a smartphone while traveling or a laptop while studying.'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Bootstrap', 'Git', 'REST API'],
    achievements: [
      'Served 5,000+ users',
      '24/7 system availability',
      'Launched 2 major services',
      'Successfully worked remotely across time zones',
      'Improved system efficiency by 25%'
    ],
    images: [
      '/images/kamarpelajar-dashboard.jpg',
      '/images/kamarpelajar-services.jpg',
      '/images/kamarpelajar-remote-work.jpg'
    ],
    certificates: [
      '/certificates/kamarpelajar-internship.pdf',
    ]
  },
  {
    id: 'sagara',
    title: 'Software Engineer Intern',
    company: 'Sagara Technology',
    location: 'Indonesia',
    period: 'Dec 2022 - Feb 2023',
    type: 'internship',
    description: [
      'Sagara Technology is a forward-thinking Indonesian technology company specializing in innovative software solutions and digital transformation services. My journey with Sagara began through their competitive Student Trainee program, where I was selected to work on real-world projects while developing my professional skills.',
      'This three-month intensive program served as my introduction to professional software development, where I was entrusted with designing and implementing the complete microservices architecture for "AteEat," an innovative food ordering and management platform. Using Python Django and SQLite, I created a system that balanced functionality with scalability.',
      'The technical challenges I encountered were both educational and practical. Optimizing AteEat\'s database infrastructure through Django database migrations taught me the importance of data management efficiency and system performance optimization. Each migration was carefully planned and executed to ensure zero downtime and improved system responsiveness.',
      'Working in Sagara\'s collaborative environment, I learned the value of cross-team coordination and agile development methodologies. Every sprint brought new challenges and learning opportunities, from code reviews that sharpened my technical skills to project planning sessions that broadened my understanding of software development lifecycle. This foundational experience at Sagara set the stage for my subsequent achievements in the technology industry.'
    ],
    technologies: ['Python', 'Django', 'SQLite', 'REST API', 'Git', 'Postman'],
    achievements: [
      'Improved database efficiency by 25%',
      'Enhanced system scalability',
      'Cross-team collaboration success',
      'Delivered project on time and within scope'
    ],
    images: [
      '/images/sagara-ateeat.jpg',
      '/images/sagara-team.jpg',
      '/images/sagara-architecture.jpg'
    ],
    certificates: [
      '/certificates/sagara-internship-completion.pdf',
    ]
  }
];

export const projects: Project[] = [
  {
    id: 'terrax',
    title: 'TerraX',
    description: 'Led a diverse team in the development of TerraX, a revolutionary property transaction platform utilizing blockchain technology, resulting in significant time, labor, and cost savings. Winner of Codefest Indonesia x Dfinity Foundation 2023.',
    technologies: ['Blockchain', 'Solidity', 'React', 'Web3.js', 'Smart Contracts'],
    githubUrl: 'https://github.com/satriadhm/terrax',
    category: 'Blockchain',
    featured: true,
    images: ['/images/projects/terrax-showcase.png'],
    achievements: ['First Runner-up Codefest Indonesia 2023', 'Blockchain-based property transactions', 'Smart contract implementation']
  },
  {
    id: 'elemento',
    title: 'Elemento',
    description: 'Developed an innovative educational platform combining Augmented Reality (AR) and interactive modules for enhancing chemistry learning, specifically electron configuration and covalent bonding concepts. Seamless integration with Golang + Laravel backend.',
    technologies: ['Unity', 'AR Foundation', 'C#', 'React', 'Node.js', 'Laravel', 'Golang'],
    githubUrl: 'https://github.com/elemento-learning',
    category: 'AR/VR',
    featured: true,
    images: ['/images/projects/elemento-showcase.png'],
    achievements: ['Ministry funding recipient', 'AR-based learning platform', 'Interactive chemistry modules']
  },
  {
    id: 'perisai',
    title: 'PERISAI',
    description: 'Identified the need for a reporting hub for sexual violence based on peer complaints and designed PERISAI to address this pressing social issue, leveraging technology to empower victims and create safer environments.',
    technologies: ['Kotlin', 'Android', 'React', 'Node.js', 'MongoDB', 'Socket.io'],
    githubUrl: 'https://github.com/satriadhm/perisai-kotlin',
    liveUrl: 'https://telkomuniversity-ac-id.webpkgcache.com/doc/-/s/telkomuniversity.ac.id/memberantas-kekerasan-seksual-di-kota-salatiga-dengan-perisai/',
    category: 'Social Impact',
    featured: true,
    images: ['/images/projects/perisai-showcase.png'],
    achievements: ['Published research collaboration', 'Mobile app for social safety', 'Integrated reporting system']
  },
  {
    id: 'earthstock',
    title: 'EarthStock Solution',
    description: 'Implemented VGG16 Machine Learning Model with ReforestTree Data to create an innovative solution for environmental monitoring and reforestation tracking using satellite imagery and AI-powered analysis.',
    technologies: ['Python', 'TensorFlow', 'VGG16', 'Machine Learning', 'Satellite Imagery', 'React', 'Flask API'],
    githubUrl: 'https://github.com/satriadhm/ess',
    liveUrl: 'https://github.com/satriadhm/ess-api-v2',
    category: 'Machine Learning',
    featured: true,
    images: ['/images/projects/earthstock-showcase.png'],
    achievements: ['Machine Learning implementation', 'Environmental impact tracking', 'Satellite data processing']
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

export const categories = [
  'Trending Now',
  'Spanish Chronicles',
  'Euro Adventures', 
  'Summer Escapes',
  'Cultural Moments',
  'Musical Performances'
];