'use client'

import { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResumeSchema, type Resume } from '@/lib/schema'
import { storage } from '@/lib/storage'
import { Upload } from 'lucide-react'

const STORAGE_KEY = 'resume-builder:data'

// Sample data matching the preview page
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
    'Results-driven Mobile Architect/Lead Android Developer with 11+ years of experience designing, building, and optimizing complex native and cross-platform mobile applications for HR, fintech, news, and healthcare platforms. Expert in Kotlin, Jetpack Compose, Flutter, and React Native. Exceptional track record in leading technical teams, architecting scalable solutions, modernizing legacy systems, and driving high-impact automation initiatives using AI, low-code, and cloud technologies. Active contributor to architecture groups, solution design, and cross-platform R&D initiatives across multiple organizations.',
  expertise: [
    'Clean Architecture, MVVM, MVI',
    'Modularization & API Design',
    'Cross-Platform Strategy',
    'CI/CD (Jenkins, Bitrise)',
    'AI-assisted Development',
    'Stakeholder Alignment',
  ],
  skills: [
    {
      category: 'Languages',
      skills: ['Kotlin', 'Java', 'Python', 'Dart', 'JavaScript', 'TypeScript', 'C#', 'HTML/CSS'],
    },
    {
      category: 'Mobile Development',
      skills: ['Android SDK', 'Jetpack Compose', 'React Native', 'Flutter', 'FlutterFlow', 'Xamarin Native', 'Expo'],
    },
    {
      category: 'Architecture & Design',
      skills: ['MVVM', 'Clean Architecture', 'Dagger Hilt', 'Koin', 'Dependency Injection', 'Solution Design'],
    },
    {
      category: 'Backend & Data',
      skills: ['Room', 'SQLite', 'PostgreSQL', 'Supabase', 'REST APIs', 'Retrofit', 'Coroutines', 'RxJava'],
    },
    {
      category: 'DevOps & Tools',
      skills: ['CI/CD (Jenkins, Bitrise)', 'Git/GitHub/Bitbucket', 'Jira', 'Confluence', 'SonarQube', 'AWS Monitoring'],
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
      role: 'Sr. Technology Specialist',
      startDate: 'Jan 2025',
      endDate: 'Present',
      bullets: [
        'Leading development and enhancement of HCM (Zenefits) Android app using Kotlin, Jetpack Compose, and Coroutines; improved UI efficiency and performance.',
        'Contributed to TriNet HR Platform App using React Native and Expo; ensured seamless cross-platform experience with backend integration.',
        'Developed and maintained YourPeople3 (Zenefits backend) in Python, focusing on push notification systems and migration from legacy API to V1 with FCM.',
        'Designed and implemented features for Banking apps, dashboards, and internal configurator apps using Flutter and FlutterFlow; reduced delivery time through low-code approaches.',
        'Actively integrated AI tools including GitHub Copilot, multi-agent systems, and AI models (Gemini 2.5, ChatGPT, Claude Sonnet) for intelligent code generation and productivity enhancement.',
        'Collaborated across teams in Agile environment, participating in R&D meetings, architecture discussions, and cross-platform module development.',
        'Managed project workflows using JIRA; handled Git repositories, code merges, and CI/CD pipelines for seamless integration.',
      ],
    },
    {
      company: 'Nityo Technology',
      location: 'Gurgaon',
      role: 'Sr. Android Developer',
      startDate: 'Mar 2023',
      endDate: 'Dec 2024',
      bullets: [
        'Architected and delivered critical modules for The Straits Times app (Kotlin, Compose); increased daily active user engagement.',
        'Attended weekly meetings for research and development tasks; contributed knowledge to cross-platform teams.',
        'Managed Jira for project task management and tracking following Agile methodologies.',
        'Handled Git server management, code merging, and CI/CD for project stability.',
        'Analyzed new requirements and developed new modules as key responsibility.',
      ],
    },
    {
      company: 'Riktam Technology',
      location: 'Hyderabad',
      role: 'Lead Android Developer',
      startDate: 'Jul 2022',
      endDate: 'Feb 2023',
      bullets: [
        'Led Universal Tennis App team as Lead Android Developer; managed sprint planning, code merges, CI/CD (Jenkins), and requirement analysis.',
        'Assembled weekly meetings for R&D tasks and contributed knowledge to cross-platform development efforts.',
        'Used Jira for project task management and tracking following Agile methodologies.',
        'Analyzed new requirements and developed modules enhancing real-time analytics and Google Maps integration.',
      ],
    },
    {
      company: 'T-Systems ICT',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Jun 2021',
      endDate: 'Jul 2022',
      bullets: [
        'Worked as Technical Lead and Sr. Android Developer in the Development Department.',
        'Managed Git server, code merging, and CI/CD for One App and Mesh Setup App.',
        'Assembled weekly meetings for R&D tasks; contributed knowledge to cross-platform teams.',
        'Led development of internal SDK demos and enhanced cloud connectivity with API integration.',
      ],
    },
    {
      company: 'Tata Consultancy Services',
      location: 'Pune',
      role: 'Lead Android Developer',
      startDate: 'Aug 2018',
      endDate: 'Jun 2021',
      bullets: [
        'Worked as Technical Lead and Sr. Android Developer; guided Mybpost app as solution designer.',
        'Part of Pune TCS DI Architecture group; explored and learned architecture skills with responsibilities for code/document review and release sign-off.',
        'Solution provider for project-related problems; led new technology adaptation and analysis for future initiatives.',
        'Architected features, analyzed client requirements, and ensured timely releases as Solution Designer.',
        'Distributed modules within team; handled sprint task board and future sprint features on Confluence and Jira.',
        'Advanced DevOps automation for CI/CD, version control, and user acceptance testing.',
        'Managed Git server and code merging; assembled weekly meetings for R&D tasks.',
      ],
    },
    {
      company: 'Borm Bruckmeier InfoTech',
      location: 'Pune',
      role: 'Sr. Android Developer',
      startDate: 'Feb 2014',
      endDate: 'Jul 2018',
      bullets: [
        'Worked as Android Developer in Research and Development Department.',
        'Analyzed new requirements and developed new modules; kept track of latest Android releases and checked compatibility issues.',
        'Created desktop application in Java for generating medical algorithms, scores, and calculator-type interactive tools.',
        'Enabled non-technical people (Medical editors) to design tools graphically and add components using UI.',
        'Understood and mapped client requirements/enhancements; implemented solutions providing improvements.',
        'Assembled weekly meetings for R&D tasks.',
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
      description: 'Human Capital Management app for Zenefits. Modernized HR operations with advanced push notifications via FCM, migrated legacy modules to V1 API.',
      technologies: ['Kotlin', 'Java', 'Compose', 'Coroutines', 'FCM', 'Python', 'Flask', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'TriNet HR Platform App',
      role: 'Sr. Technology Specialist',
      description: 'Cross-platform HR management solution for TriNet. Built modular components ensuring smooth backend integration and cross-functional Agile delivery.',
      technologies: ['React Native', 'Expo', 'TypeScript', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'Banking App, Dashboard & Configurator',
      role: 'Sr. Developer',
      description: 'Internal banking dashboard suite enabling workflow automation and real-time data visualization. Leveraged low-code tools for rapid delivery.',
      technologies: ['Flutter', 'FlutterFlow', 'Firebase', 'REST APIs', 'GitHub', 'Jira', 'Agile'],
    },
    {
      name: 'YourPeople3 (Zenefits Backend)',
      role: 'Sr. Technology Specialist',
      description: 'Backend modernization for Zenefits HR platform. Developed push notification module using FCM; migrated from legacy APIs to V1.',
      technologies: ['Python', 'Flask', 'FCM', 'REST APIs', 'Git', 'Jira', 'Agile'],
    },
    {
      name: 'The Straits Times',
      role: 'Developer / Technical Lead (Team: 8)',
      description: 'Leading digital news platform delivering breaking news. Led architecture and development using Compose; implemented unit testing and CI/CD with Bitrise.',
      technologies: ['Kotlin', 'Compose', 'Firebase Auth', 'Retrofit', 'MVVM', 'Koin', 'Mockito', 'Bitbucket', 'Jira', 'Bitrise', 'SQLite', 'Room', 'Coroutines'],
    },
    {
      name: 'Universal Tennis App',
      role: 'Developer / Technical Lead (Team: 4)',
      description: 'Global tennis platform connecting players through leagues and analytics. Managed feature design, task allocation, and CI/CD using Jenkins.',
      technologies: ['Kotlin', 'Firebase', 'Google Maps', 'Retrofit', 'MVVM', 'Dagger Hilt', 'Mockito', 'Jira', 'GIT', 'Jenkins', 'SQLite', 'Room', 'Coroutines'],
    },
  ],
  languages: ['English', 'Hindi'],
  certifications: [
    'Digital Mobile Computing: Android Foundation',
    'Process Agile Way of Working Foundation',
    'Adobe Qualified, Adobe Experience Platform',
  ],
  community: ['LinkedIn: Active profile and networking', 'Stack Overflow: Active contributor', 'GitHub: Portfolio with live apps and open-source material'],
  avatar: '/jay-avatar.jpg',
}

export function ResumeForm({
  initial,
  onChange,
}: {
  initial?: Resume | null
  onChange?: (data: Resume) => void
}) {
  const [isUploading, setIsUploading] = useState(false)
  const form = useForm<Resume>({
    resolver: zodResolver(ResumeSchema as z.ZodTypeAny),
    defaultValues: initial ?? sampleData,
    mode: 'onChange',
  })

  const { control, register, watch, setValue } = form

  const links = useFieldArray({ control, name: 'links' })
  const experience = useFieldArray({ control, name: 'experience' })
  const education = useFieldArray({ control, name: 'education' })
  const projects = useFieldArray({ control, name: 'projects' })
  const skills = useFieldArray({ control, name: 'skills' })

  useEffect(() => {
    const sub = form.watch((v) => {
      const data = v as Resume
      storage.set(STORAGE_KEY, data)
      onChange?.(data)
    })
    return () => sub.unsubscribe()
  }, [form, onChange])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const result = await response.json()
      if (result.success) {
        form.setValue('avatar', result.url)
      } else {
        console.error('Upload failed:', result.error)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <form className="mx-auto max-w-4xl space-y-10 bg-gray-50 p-6">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-2 flex items-center">
                {form.watch('avatar') && (
                  <img
                    src={form.watch('avatar')}
                    alt="Avatar"
                    className="mr-4 h-20 w-20 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm transition-colors hover:bg-blue-100">
                  <Upload size={16} />
                  <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
            <Field label="Full Name" {...form.register('name')} />
            <Field label="Professional Title" {...form.register('title')} />
            <Field label="Email Address" type="email" {...form.register('email')} />
            <Field label="Phone Number" {...form.register('phone')} />
            <Field label="Location" {...form.register('location')} />
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Social Links
          </h2>
          <div className="space-y-4">
            {links.fields.map((f, i) => (
              <div key={f.id} className="grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-2">
                <Field label="Platform" placeholder="LinkedIn, GitHub, Portfolio..." {...form.register(`links.${i}.label` as const)} />
                <Field label="URL" placeholder="https://..." {...form.register(`links.${i}.url` as const)} />
                <button
                  type="button"
                  className="col-span-full justify-self-start rounded-md bg-red-500 px-3 py-1 text-xs text-white transition-colors hover:bg-red-600"
                  onClick={() => links.remove(i)}
                >
                  Remove Link
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() => links.append({ label: '', url: '' })}
            >
              + Add Social Link
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Professional Summary
          </h2>
          <textarea
            className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={6}
            placeholder="Write a compelling summary of your professional experience, key achievements, and career goals..."
            {...form.register('summary')}
          />
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Core Competencies
          </h2>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-600">One expertise per line</span>
            <textarea
              className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={5}
              placeholder="Clean Architecture, MVVM, MVI&#10;Modularization & API Design&#10;Cross-Platform Strategy&#10;CI/CD & DevOps&#10;Team Leadership"
              {...form.register('expertise' as const, {
                setValueAs: (v: string | string[]) =>
                  Array.isArray(v)
                    ? v
                    : (v ?? '')
                        .split('\n')
                        .map((s) => s.trim())
                        .filter(Boolean),
              })}
            />
          </label>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Technical Skills
          </h2>
          <div className="space-y-6">
            {skills.fields.map((f, i) => (
              <div key={f.id} className="rounded-lg border-2 border-blue-100 bg-blue-50 p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field 
                    label="Skill Category" 
                    placeholder="Languages, Mobile Development, etc."
                    {...form.register(`skills.${i}.category` as const)} 
                  />
                  <Field
                    label="Skills (comma-separated)"
                    placeholder="Kotlin, Java, Python, React Native..."
                    {...form.register(`skills.${i}.skills` as const, {
                      setValueAs: (v: string | string[]) =>
                        Array.isArray(v)
                          ? v
                          : (v ?? '')
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                    })}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
                  onClick={() => skills.remove(i)}
                >
                  Remove Category
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() => skills.append({ category: '', skills: [] })}
            >
              + Add Skill Category
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {experience.fields.map((f, i) => (
              <div key={f.id} className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Company Name" placeholder="Company Inc." {...form.register(`experience.${i}.company` as const)} />
                  <Field label="Job Title" placeholder="Senior Developer" {...form.register(`experience.${i}.role` as const)} />
                  <Field label="Location" placeholder="City, State" {...form.register(`experience.${i}.location` as const)} />
                  <Field label="Start Date" placeholder="Jan 2020" {...form.register(`experience.${i}.startDate` as const)} />
                  <Field label="End Date" placeholder="Present or Dec 2023" {...form.register(`experience.${i}.endDate` as const)} />
                </div>
                <div className="mt-6">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Key Achievements & Responsibilities (one per line)
                  </label>
                  <textarea
                    className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={5}
                    placeholder="Led development of mobile applications using React Native&#10;Increased user engagement by 40% through UI/UX improvements&#10;Managed team of 5 developers and coordinated with stakeholders"
                    {...form.register(`experience.${i}.bullets` as const, {
                      setValueAs: (v: string | string[]) =>
                        Array.isArray(v)
                          ? v
                          : (v ?? '')
                              .split('\n')
                              .map((s) => s.trim())
                              .filter(Boolean),
                    })}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600"
                  onClick={() => experience.remove(i)}
                >
                  Remove Experience
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() =>
                experience.append({
                  company: '',
                  role: '',
                  location: '',
                  startDate: '',
                  endDate: 'Present',
                  bullets: [],
                })
              }
            >
              + Add Experience
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Education
          </h2>
          <div className="space-y-6">
            {education.fields.map((f, i) => (
              <div key={f.id} className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Field label="Institution" placeholder="University Name" {...form.register(`education.${i}.school` as const)} />
                  <Field label="Degree" placeholder="Bachelor of Science" {...form.register(`education.${i}.degree` as const)} />
                  <Field label="Location" placeholder="City, State" {...form.register(`education.${i}.location` as const)} />
                  <Field label="Start Year" placeholder="2018" {...form.register(`education.${i}.startDate` as const)} />
                  <Field label="End Year" placeholder="2022" {...form.register(`education.${i}.endDate` as const)} />
                </div>
                <div className="mt-4">
                  <Field
                    label="Additional Details (comma-separated)"
                    placeholder="GPA: 3.8, Magna Cum Laude, Relevant Coursework"
                    {...form.register(`education.${i}.details` as const, {
                      setValueAs: (v: string | string[]) =>
                        Array.isArray(v)
                          ? v
                          : (v ?? '')
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                    })}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600"
                  onClick={() => education.remove(i)}
                >
                  Remove Education
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() =>
                education.append({
                  school: '',
                  degree: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  details: [],
                })
              }
            >
              + Add Education
            </button>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-sm">
          <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-2xl font-bold uppercase tracking-wider text-blue-700">
            Select Projects
          </h2>
          <div className="space-y-6">
            {projects.fields.map((f, i) => (
              <div key={f.id} className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6 shadow-sm">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Project Name" placeholder="E-commerce Platform" {...form.register(`projects.${i}.name` as const)} />
                  <Field label="Your Role" placeholder="Lead Developer" {...form.register(`projects.${i}.role` as const)} />
                </div>
                <div className="mt-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea
                    className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    rows={3}
                    placeholder="Brief description of the project, your contributions, and the impact..."
                    {...form.register(`projects.${i}.description` as const)}
                  />
                </div>
                <div className="mt-4">
                  <Field
                    label="Technologies Used (comma-separated)"
                    placeholder="React, Node.js, MongoDB, AWS, Docker..."
                    {...form.register(`projects.${i}.technologies` as const, {
                      setValueAs: (v: string | string[]) =>
                        Array.isArray(v)
                          ? v
                          : (v ?? '')
                              .split(',')
                              .map((s) => s.trim())
                              .filter(Boolean),
                    })}
                  />
                </div>
                <button
                  type="button"
                  className="mt-4 rounded-md bg-red-500 px-3 py-2 text-sm text-white transition-colors hover:bg-red-600"
                  onClick={() => projects.remove(i)}
                >
                  Remove Project
                </button>
              </div>
            ))}
            <button
              type="button"
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
              onClick={() =>
                projects.append({ name: '', role: '', description: '', technologies: [] })
              }
            >
              + Add Project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-wider text-blue-700">
              Languages
            </h2>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-600">Comma-separated</span>
              <textarea
                className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="English, Spanish, French, Mandarin..."
                {...form.register('languages' as const, {
                  setValueAs: (v: string | string[]) =>
                    Array.isArray(v)
                      ? v
                      : (v ?? '')
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                })}
              />
            </label>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-wider text-blue-700">
              Certifications
            </h2>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-600">Comma-separated</span>
              <textarea
                className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="AWS Certified Solutions Architect, Google Cloud Professional, PMP..."
                {...form.register('certifications' as const, {
                  setValueAs: (v: string | string[]) =>
                    Array.isArray(v)
                      ? v
                      : (v ?? '')
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                })}
              />
            </label>
          </div>

          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h2 className="mb-6 border-b-2 border-blue-600 pb-2 text-xl font-bold uppercase tracking-wider text-blue-700">
              Community
            </h2>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-600">Comma-separated</span>
              <textarea
                className="w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Stack Overflow: Active contributor, GitHub: Open source projects..."
                {...form.register('community' as const, {
                  setValueAs: (v: string | string[]) =>
                    Array.isArray(v)
                      ? v
                      : (v ?? '')
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                })}
              />
            </label>
          </div>
        </div>

        <div className="sticky bottom-0 rounded-lg bg-white p-6 shadow-lg">
          <div className="flex justify-center">
            <div className="text-center">
              <p className="mb-2 text-sm text-gray-600">Your resume is being saved automatically</p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Auto-saved</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-700">{label}</span>
      <input
        className="w-full rounded-md border-gray-300 p-3 shadow-sm transition-colors focus:border-blue-500 focus:ring-blue-500"
        {...rest}
      />
    </label>
  )
}
