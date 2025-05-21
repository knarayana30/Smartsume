export interface PersonalDetails {
  name: string
  title: string
  email: string
  phone: string
  location: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  date: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  date: string
  description: string
}

export interface Skill {
  id: string
  name: string
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
}

export interface ResumeData {
  personalDetails: PersonalDetails
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  projects: Project[]
}
