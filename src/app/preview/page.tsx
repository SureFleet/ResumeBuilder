import { ResumeView } from '@/components/ResumeView'
import type { Resume } from '@/lib/schema'

const sampleData: Resume = {
  name: 'Jay Kishor Dwivedi',
  title: 'Mobile Architect/Lead Android Developer',
  email: 'jaidwivedi20@gmail.com',
  phone: '+91 8600227438',
  location: 'Hyderabad, India',

  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jaydwivedi' },
    { label: 'GitHub', url: 'https://github.com/jaydwivedi' },
    { label: 'Portfolio', url: 'https://jaydwivedi.github.io' },
  ],

  summary:
    'Mobile Architect with 11+ years building scalable Android and cross-platform apps across HR, Sports, fintech, and healthcare domains. Expert in Kotlin, Jetpack Compose, React Native, and Flutter. Proven leader in modernizing legacy systems, driving AI-assisted development, and accelerating delivery cycles by 30-40%.',

  expertise: [
    'Team Leadership & Mentorship',
    'Clean Architecture & MVVM',
    'Cross-Platform Development',
    'CI/CD & DevOps',
    'AI-Powered Development',
    'Performance Optimization',
    'Agile & Solution Design',
    'R&D & Innovation',
  ],

  skills: [
    {
      category: 'Languages',
      skills: ['Kotlin', 'Java', 'JavaScript', 'TypeScript', 'Python(Basic)', 'Dart(Basic)'],
    },
    {
      category: 'Mobile Development',
      skills: ['Android SDK', 'Jetpack Compose', 'React Native & Expo', 'Flutter &FlutterFlow', 'Xamarin'],
    },
    {
      category: 'Architecture & Design',
      skills: ['MVVM', 'Clean Architecture', 'Hilt', 'Koin', 'DI', 'Solution Design'],
    },
    {
      category: 'Backend & Data',
      skills: ['Room', 'SQLite', 'PostgreSQL', 'Supabase', 'GraphQL', 'REST APIs', 'Retrofit', 'Coroutines', 'RxJava'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['CI/CD (Jenkins, Bitrise)', 'GitHub/Bitbucket', 'Jira', 'SonarQube', 'AWS Monitoring', 'Firebase Crashlytics', 'FCM'],
    },
    {
      category: 'Testing & Quality',
      skills: ['JUnit', 'Mockito', 'NUnit/XUnit', 'Unit Testing', 'Test Automation', 'Code Review'],
    },
    {
      category: 'Cloud & AI',
      skills: ['Firebase (Auth, FCM, Crashlytics)', 'Google APIs', 'AI Tools (Gemini, ChatGPT, Claude, GitHub Copilot)', 'Multi-agent Systems'],
    },
    {
      category: 'Additional Technologies',
      skills: ['WebRTC', 'TensorFlow', 'Vision APIs', 'Google Maps', 'JSON/XML', 'Contour'],
    },
  ],

  experience: [
    {
      company: 'Coforge Limited',
      location: 'Hyderabad',
      role: 'Sr. Technical Lead',
      startDate: 'Jan 2024',
      endDate: 'Present',
      bullets: [
        'Led HCM (Zenefits) Android app development using Kotlin, Jetpack Compose, and Coroutines; improved UI efficiency.',
        'Built TriNet HR Platform with React Native and Expo; ensured seamless cross-platform experience.',
        'Developed YourPeople3 backend in Python; implemented push notifications with FCM and migrated from legacy API to V1.',
        'Built Banking apps and dashboards using Flutter and FlutterFlow; reduced delivery time with low-code approach.',
        'Integrated AI tools (GitHub Copilot, Gemini 2.5, ChatGPT, Claude) for code generation and productivity.',
        'Participated in R&D, architecture discussions, and cross-platform module development in Agile environment.',
        'Managed workflows in JIRA; handled Git repositories, code merges, and CI/CD pipelines.',
      ],
    },
    {
      company: 'Nityo Technology',
      location: 'Gurgaon',
      role: 'Sr. Android Developer',
      startDate: 'Mar 2023',
      endDate: 'Dec 2023',
      bullets: [
        'Architected critical modules for The Straits Times app (Kotlin, Compose); increased user engagement.',
        'Attended weekly R&D meetings; contributed to cross-platform teams.',
        'Managed Jira for Agile task tracking.',
        'Handled Git management, code merging, and CI/CD.',
        'Analyzed requirements and developed new modules.',
      ],
    },
    {
      company: 'Riktam Technology',
      location: 'Hyderabad',
      role: 'Lead Android Developer',
      startDate: 'Jul 2022',
      endDate: 'Feb 2023',
      bullets: [
        'Led Universal Tennis App team; managed sprint planning, code merges, and CI/CD (Jenkins).',
        'Conducted weekly R&D meetings; contributed to cross-platform development.',
        'Used Jira for Agile task tracking.',
        'Analyzed requirements; developed modules with real-time analytics and Google Maps.',
      ],
    },
    {
      company: 'T-Systems ICT',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Jun 2021',
      endDate: 'Jul 2022',
      bullets: [
        'Worked as Technical Lead; led One App and Mesh Setup App development.',
        'Managed Git server, code merging, and CI/CD.',
        'Conducted weekly R&D meetings; contributed to cross-platform teams.',
        'Developed internal SDK demos; enhanced cloud connectivity with APIs.',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Aug 2018',
      endDate: 'Jun 2021',
      bullets: [
        'Worked as Technical Lead; guided Mybpost app as Solution Designer.',
        'Part of TCS DI Architecture group; handled code/document review and release sign-off.',
        'Provided solutions for project challenges; led technology adaptation initiatives.',
        'Architected features, analyzed requirements, and ensured timely releases.',
        'Distributed modules; handled sprint planning on Confluence and Jira.',
        'Managed Git server and code merging; conducted weekly R&D meetings.',
      ],
    },
    {
      company: 'Borm Bruckmeier InfoTech',
      location: 'Pune',
      role: 'Sr. Android Developer',
      startDate: 'Feb 2014',
      endDate: 'Jul 2018',
      bullets: [
        'Worked in R&D; analyzed requirements and developed new modules.',
        'Tracked latest Android releases; checked compatibility issues.',
        'Created Java desktop app for generating medical algorithms and interactive tools.',
        'Mapped client requirements; implemented solutions with improvements.',
        'Conducted weekly R&D meetings.',
      ],
    },
  ],

  education: [
    {
      school: 'IPS Academy, Indore',
      degree: 'MCA – Master of Computer Applications',
      location: 'Indore',
      startDate: '2011',
      endDate: '2014',
      details: [],
    },
    {
      school: 'Dr. VSICS, Kanpur',
      degree: 'BCA – Bachelor of Computer Applications',
      location: 'Kanpur',
      startDate: '2008',
      endDate: '2011',
      details: [],
    },
  ],

  projects: [
    {
      name: 'HCM (Zenefits) Android App',
      role: 'Sr. Technology Specialist',
      description: 'HR management app with FCM push notifications; migrated legacy modules to V1 API.',
      technologies: ['Kotlin', 'Java', 'Compose', 'Coroutines', 'FCM', 'Python', 'Flask', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'TriNet HR Platform App',
      role: 'Sr. Technology Specialist',
      description: 'Cross-platform HR solution with modular components and seamless backend integration.',
      technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'Banking App, Dashboard & Configurator',
      role: 'Sr. Developer',
      description: 'Banking dashboard with workflow automation and real-time visualization using low-code tools.',
      technologies: ['Flutter', 'FlutterFlow', 'Firebase', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'YourPeople3 (Zenefits Backend)',
      role: 'Sr. Technology Specialist',
      description: 'Backend modernization with FCM push notifications; migrated legacy APIs to V1.',
      technologies: ['Python', 'Flask', 'FCM', 'REST APIs', 'Git', 'Jira', 'Agile'],
    },
    {
      name: 'The Straits Times',
      role: 'Developer / Technical Lead (Team: 8)',
      description: 'Digital news platform with Compose architecture; implemented unit testing and CI/CD.',
      technologies: ['Kotlin', 'Compose', 'Firebase Auth', 'Retrofit', 'MVVM', 'Koin', 'Mockito', 'Bitbucket', 'Jira', 'Bitrise', 'SQLite', 'Room', 'Coroutines'],
    },
    {
      name: 'Universal Tennis App',
      role: 'Developer / Technical Lead (Team: 4)',
      description: 'Tennis platform with leagues and analytics; managed feature design and CI/CD.',
      technologies: ['Kotlin', 'Firebase', 'Google Maps', 'Retrofit', 'MVVM', 'Dagger Hilt', 'Mockito', 'Jira', 'GIT', 'Jenkins', 'SQLite', 'Room', 'Coroutines'],
    },
  ],

  languages: ['English', 'Hindi'],

  certifications: [
    'Digital Mobile Computing: Android Foundation',
    'Process Agile Way of Working Foundation',
    'Adobe Qualified, Adobe Experience Platform',
  ],

  community: [
    'LinkedIn: Active profile and networking',
    'Stack Overflow: Active contributor',
    'GitHub: Portfolio with live apps and open-source material'
  ],

  avatar: '/jay-avatar.jpg',
};

export default function PreviewPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Template Preview</h1>
      <ResumeView data={sampleData} />
    </main>
  )
}
