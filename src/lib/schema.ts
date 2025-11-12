import { z } from 'zod'

export const LinkSchema = z.object({
  label: z.string().min(1),
  url: z.string().url(),
})

export const ExperienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  location: z.string().optional().default(''),
  startDate: z.string().min(1),
  endDate: z.string().optional().default('Present'),
  bullets: z.array(z.string().min(1)).min(1),
})

export const EducationSchema = z.object({
  school: z.string().min(1),
  degree: z.string().min(1),
  location: z.string().optional().default(''),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  details: z.array(z.string().min(1)).optional().default([]),
})

export const ProjectSchema = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
})

export const SkillsSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
})

export const ResumeSchema = z.object({
  avatar: z.string().optional().or(z.literal('')),
  name: z.string().min(1),
  title: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  location: z.string().min(1),
  links: z.array(LinkSchema).optional().default([]),
  summary: z.string(),
  expertise: z.array(z.string()),
  skills: z.array(SkillsSchema),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
  languages: z.array(z.string()),
  certifications: z.array(z.string()),
  community: z.array(z.string()),
})

export type Resume = z.infer<typeof ResumeSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Education = z.infer<typeof EducationSchema>
export type Project = z.infer<typeof ProjectSchema>
