import { ResumeView } from '@/components/ResumeView'
import type { Resume } from '@/lib/schema'

export const sample: Resume = {
  "name": "Jay Kishor Dwivedi",
  "title": "Mobile Architect / Lead Android Developer",
  "email": "jaidwivedi20@gmail.com",
  "phone": "+91 8600227438",
  "location": "Hyderabad, India",
  "links": [
    { "label": "LinkedIn", "url": "https://linkedin.com/in/jaydwivedi" },
    { "label": "GitHub", "url": "https://github.com/jaydwivedi" },
    { "label": "Portfolio", "url": "https://jaydwivedi.github.io" }
  ],
  "summary": "Mobile Architect with 11+ years building scalable Android and cross-platform apps across HR, fintech, and healthcare domains. Expert in Kotlin, Jetpack Compose, React Native, and Flutter. Proven leader in modernizing legacy systems, driving AI-assisted development, and accelerating delivery cycles by 30–40%.",
  "expertise": [],
  "skills": [
    { "category": "Languages", "skills": ["Kotlin", "Java", "Kotlin Multiplatform", "TypeScript", "Python (Basic)", "Dart (Basic)"] },
    { "category": "Modern Android Development", "skills": ["Android SDK", "Jetpack Compose", "Material Design", "Compose Navigation", "Compose Animation", "Compose UI Testing", "Android Views", "View Binding", "Data Binding"] },
    { "category": "Android Components", "skills": ["Activities & Fragments", "Services", "WorkManager", "Broadcast Receivers", "Content Providers", "Notifications", "Widgets", "Deep Links", "App Shortcuts"] },
    { "category": "Jetpack Libraries", "skills": ["Navigation Component", "ViewModel", "Lifecycle", "Paging", "CameraX", "Biometric"] },
    { "category": "Architecture & Patterns", "skills": ["MVVM", "MVP", "Clean Architecture", "Repository Pattern", "Use Cases", "Domain Layer", "Modularization", "Multi-Module Architecture"] },
    { "category": "Dependency Injection", "skills": ["Dagger Hilt", "Koin", "Assisted Injection", "Qualifier Annotations", "Scoped Dependencies"] },
    { "category": "Data & Persistence", "skills": ["Room Database", "SQLite", "DataStore (Preferences/Proto)", "SharedPreferences", "Supabase","Firebase Realtime Database", "Realm", "WorkManager", "Content Resolver"] },
    { "category": "Async & Reactive Programming", "skills": ["Kotlin Coroutines", "Flow", "StateFlow", "SharedFlow", "LiveData", "Channel", "RxJava", "RxAndroid"] },
    { "category": "Networking & APIs", "skills": ["Retrofit", "OkHttp", "Ktor Client", "gRPC", "Gson", "Moshi", "Kotlinx Serialization", "GraphQL", "Apollo", "WebSocket"] },
    { "category": "Performance & Optimization", "skills": ["Memory Profiling", "CPU Profiling", "Network Profiling", "Baseline Profiles", "Startup Optimization", "ANR Prevention", "Memory Leaks"] },
    { "category": "Security & Authentication", "skills": ["Biometric Auth", "Keystore", "Encrypted SharedPreferences", "SSL Pinning", "Certificate Transparency", "OWASP Mobile Security", "ProGuard/R8", "Code Obfuscation"] },
    { "category": "Testing & Quality Assurance", "skills": ["JUnit 5", "Mockito", "MockK", "Espresso", "Compose Testing", "Screenshot Testing"] },
    { "category": "Build & Deployment", "skills": ["Gradle KTS", "Version Catalogs", "Build Variants", "Flavor Dimensions", "App Bundle", "Dynamic Delivery", "Gradle Plugins", "Build Logic"] },
    { "category": "Cross-Platform & Hybrid", "skills": ["Kotlin Multiplatform Mobile", "React Native", "Flutter (Basic)", "Xamarin Native", "Expo (Basic)"] },
    { "category": "DevOps & CI/CD", "skills": ["GitHub Actions", "Jenkins", "Bitrise", "Git/GitHub/Bitbucket", "Android Studio", "Gradle", "ADB"] },
    { "category": "Firebase & Google Services", "skills": ["Firebase Auth", "Firestore", "Realtime Database", "FCM", "Crashlytics", "Analytics", "Remote Config", "A/B Testing", "ML Kit", "Maps SDK"] },
    { "category": "Cloud & Backend", "skills": ["REST APIs", "GraphQL", "AWS (Basic)", "Google Cloud", "Supabase", "Node.js (Basic)"] },
    { "category": "AI & Machine Learning", "skills": ["ML Kit", "TensorFlow Lite", "PyTorch Mobile", "AI-Powered Development", "GitHub Copilot", "ChatGPT Integration"] }
  ],
  "experience": [
    {
      "company": "Coforge Limited",
      "location": "Hyderabad",
      "role": "Sr. Technology Specialist",
      "startDate": "Jan 2025",
      "endDate": "Present",
      "bullets": [
        "Architected Zenefits HCM app using Kotlin, Jetpack Compose, Flow, and Room DB; improved UI performance by 40%",
        "Implemented MVVM with LiveData, Coroutines, and Hilt DI; enhanced app security with biometric auth and SSL pinning",
        "Architected TriNet HR cross-platform app using React Native/Expo; delivered seamless multi-device experience for 10K+ enterprise users",
        "Modernized legacy codebase with Clean Architecture, Repository pattern, and StateFlow for reactive programming",
        "Delivered banking dashboards with performance optimization; reduced memory leaks and ANR occurrences by 35%",
        "Integrated AI tools and automated CI/CD pipelines; managed Git workflows and Agile delivery cycles"
      ]
    },
    {
      "company": "Nityo Technology",
      "location": "Gurgaon",
      "role": "Sr. Android Developer",
      "startDate": "Mar 2023",
      "endDate": "Dec 2024",
      "bullets": [
        "Developed key modules for The Straits Times app using Kotlin, Jetpack Compose, and MVVM with LiveData",
        "Implemented Room database with Flow for reactive data streaming; integrated Retrofit with Gson for API handling",
        "Applied Koin dependency injection and Coroutines for async operations; optimized app performance and security",
        "Led CI/CD setup (Bitrise), code reviews, and Agile sprint tracking with comprehensive unit testing"
      ]
    },
    {
      "company": "Riktam Technology",
      "location": "Hyderabad",
      "role": "Lead Android Developer",
      "startDate": "Jul 2022",
      "endDate": "Feb 2023",
      "bullets": [
        "Led Universal Tennis app development with Kotlin, MVVM architecture, and Dagger Hilt for dependency injection",
        "Implemented real-time analytics using Flow and StateFlow; integrated Google Maps SDK with custom markers",
        "Optimized SQLite database queries and applied ProGuard for code obfuscation and app security",
        "Managed Jenkins CI/CD pipelines, automated testing with JUnit/Mockito, and sprint planning"
      ]
    },
    {
      "company": "T-Systems ICT",
      "location": "Pune",
      "role": "Lead Android Developer",
      "startDate": "Jun 2021",
      "endDate": "Jul 2022",
      "bullets": [
        "Built Android SDK demos and Mesh Setup app using Kotlin, Room DB, and Coroutines for async operations",
        "Implemented MVVM with LiveData and applied Koin DI; integrated Retrofit for RESTful API communication",
        "Enhanced app security with Keystore, biometric authentication, and SSL certificate pinning",
        "Led weekly R&D meetings on Android architecture patterns and performance optimization techniques",
        "Developed internal SDK documentation; optimized memory management and reduced app startup time by 25%"
      ]
    },
    {
      "company": "Tata Consultancy Services",
      "location": "Pune",
      "role": "Lead Android Developer",
      "startDate": "Aug 2018",
      "endDate": "Jun 2021",
      "bullets": [
        "Solution Designer for Mybpost app using Kotlin, MVVM, Room database, and Dagger Hilt dependency injection",
        "Implemented Flow and StateFlow for reactive UI updates; integrated Retrofit with OkHttp interceptors",
        "Applied Clean Architecture with Repository pattern; optimized SQLite queries and database migrations",
        "Enhanced app security with ProGuard obfuscation, SSL pinning, and biometric authentication",
        "Led Coroutines implementation for background tasks; reduced ANR occurrences and improved app performance",
        "Advanced CI/CD automation with automated testing using JUnit, Mockito, and Espresso frameworks",
        "Conducted weekly R&D on Android Jetpack components, LiveData, and modern architecture patterns"
      ]
    },
    {
      "company": "Borm Bruckmeier InfoTech",
      "location": "Pune",
      "role": "Sr. Android Developer",
      "startDate": "Feb 2014",
      "endDate": "Jul 2018",
      "bullets": [
        "Built Android modules using Java, SQLite database, and custom Views with Fragment-based navigation",
        "Implemented MVVM pattern with LiveData observers; integrated SharedPreferences for data persistence",
        "Created interactive medical algorithms using RecyclerView with custom adapters and ViewHolders",
        "Applied AsyncTask and background threading for database operations; optimized memory usage and performance",
        "Built REST API integration with Volley for network operations; handled JSON parsing and error management",
        "Maintained compatibility across Android API levels; resolved lifecycle issues and memory leaks",
        "Conducted R&D on Android architecture components, testing frameworks, and security best practices"
      ]
    }
  ],
  "education": [
    {
      "school": "IPS Academy, Indore",
      "degree": "MCA – Master of Computer Applications",
      "location": "Indore",
      "startDate": "2011",
      "endDate": "2014",
      "details": []
    },
    {
      "school": "Dr. VSICS, Kanpur",
      "degree": "BCA – Bachelor of Computer Applications",
      "location": "Kanpur",
      "startDate": "2008",
      "endDate": "2011",
      "details": []
    }
  ],
  "projects": [
    {
      "name": "Zenefits HCM App",
      "role": "Sr. Technology Specialist",
      "description": "Enterprise HR app with Room DB, Flow, Hilt DI, and FCM integration",
      "technologies": ["Kotlin", "Jetpack Compose", "Room", "Flow", "Hilt", "Coroutines", "FCM"]
    },
    {
      "name": "TriNet HR Platform",
      "role": "Sr. Technology Specialist",
      "description": "Cross-platform HR solution with React Native/Expo, delivering seamless multi-device experience for enterprise users",
      "technologies": ["React Native", "Expo", "TypeScript", "Redux", "AsyncStorage", "REST APIs", "Push Notifications"]
    },
    {
      "name": "Banking Dashboard",
      "role": "Sr. Developer",
      "description": "Android banking app with security features and performance optimization",
      "technologies": ["Kotlin", "Room DB", "Coroutines", "Biometric Auth", "SSL Pinning"]
    },
    {
      "name": "Straits Times App",
      "role": "Technical Lead",
      "description": "News app with Jetpack Compose, Flow, Koin DI, and Room database",
      "technologies": ["Kotlin", "Jetpack Compose", "Flow", "Room", "Koin", "Retrofit"]
    },
    {
      "name": "Universal Tennis App",
      "role": "Technical Lead",
      "description": "Tennis platform with MVVM, LiveData, Coroutines, and Google Maps SDK",
      "technologies": ["Kotlin", "MVVM", "LiveData", "Coroutines", "Hilt", "Google Maps", "SQLite"]
    },
    {
      "name": "Mybpost Android App",
      "role": "Technical Lead",
      "description": "Parcel tracking with Clean Architecture, Repository pattern, and security features",
      "technologies": ["Kotlin", "Clean Architecture", "Room DB", "Flow", "Retrofit", "ProGuard"]
    },
    {
      "name": "CatchMe Healthcare App",
      "role": "Programmer",
      "description": "Healthcare messaging with MVVM, Room DB, RxJava, and secure data handling",
      "technologies": ["Java", "MVVM", "Room", "RxJava", "Retrofit", "Firebase Auth"]
    },
    {
      "name": "WeeboChat",
      "role": "Android Developer",
      "description": "Real-time video calling with WebRTC, Coroutines, and Socket.IO integration",
      "technologies": ["Kotlin", "WebRTC", "Coroutines", "Socket.IO", "MVVM", "Firebase"]
    }
  ],
  "languages": ["English", "Hindi"],
  "certifications": [
    "Digital Mobile Computing – Android Foundation",
    "Process Agile Way of Working – Foundation",
    "Adobe Experience Platform – Qualified"
  ],
  "community": [
    "LinkedIn: Active profile and networking",
    "Stack Overflow: Contributor",
    "GitHub: Portfolio with live apps"
  ],
  "avatar": "/jay-avatar.jpg"
};

export default function PreviewPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Template Preview</h1>
      <ResumeView data={sample} />
    </main>
  )
}
