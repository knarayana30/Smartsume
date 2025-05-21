"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { ResumeData } from "@/types/resume"
import { Plus, Trash2 } from "lucide-react"
import { v4 as uuidv4 } from "uuid"
import { motion, AnimatePresence } from "framer-motion"

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["personal"])

  const handlePersonalChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalDetails: {
        ...data.personalDetails,
        [field]: value,
      },
    })
  }

  const handleEducationChange = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const handleExperienceChange = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    })
  }

  const handleSkillChange = (id: string, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) => (skill.id === id ? { ...skill, name: value } : skill)),
    })
  }

  const handleProjectChange = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      projects: data.projects.map((project) => (project.id === id ? { ...project, [field]: value } : project)),
    })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: uuidv4(),
          institution: "",
          degree: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    })
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: uuidv4(),
          company: "",
          position: "",
          date: "",
          description: "",
        },
      ],
    })
  }

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    })
  }

  const addSkill = () => {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        {
          id: uuidv4(),
          name: "",
        },
      ],
    })
  }

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    })
  }

  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: uuidv4(),
          name: "",
          description: "",
          url: "",
        },
      ],
    })
  }

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    })
  }

  const itemVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  const formClasses =
    "bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-purple-500 focus:border-purple-500"

  return (
    <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 text-white">
      <Accordion type="multiple" value={expandedSections} onValueChange={setExpandedSections} className="w-full">
        <AccordionItem value="personal" className="border-white/10">
          <AccordionTrigger className="text-lg font-medium text-white hover:text-purple-300">
            Personal Details
          </AccordionTrigger>
          <AccordionContent>
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Name</label>
                <Input
                  value={data.personalDetails.name}
                  onChange={(e) => handlePersonalChange("name", e.target.value)}
                  placeholder="John Doe"
                  className={formClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Professional Title</label>
                <Input
                  value={data.personalDetails.title}
                  onChange={(e) => handlePersonalChange("title", e.target.value)}
                  placeholder="Software Engineer"
                  className={formClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Email</label>
                <Input
                  value={data.personalDetails.email}
                  onChange={(e) => handlePersonalChange("email", e.target.value)}
                  placeholder="john.doe@example.com"
                  type="email"
                  className={formClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Phone</label>
                <Input
                  value={data.personalDetails.phone}
                  onChange={(e) => handlePersonalChange("phone", e.target.value)}
                  placeholder="(123) 456-7890"
                  className={formClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Location</label>
                <Input
                  value={data.personalDetails.location}
                  onChange={(e) => handlePersonalChange("location", e.target.value)}
                  placeholder="New York, NY"
                  className={formClasses}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-200">Professional Summary</label>
                <Textarea
                  value={data.personalDetails.summary}
                  onChange={(e) => handlePersonalChange("summary", e.target.value)}
                  placeholder="Brief overview of your professional background and goals"
                  rows={4}
                  className={formClasses}
                />
              </div>
            </motion.div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="education" className="border-white/10">
          <AccordionTrigger className="text-lg font-medium text-white hover:text-purple-300">
            Education
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <AnimatePresence>
                {data.education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="p-4 border border-white/10 rounded-md relative bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 text-gray-400"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Institution</label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, "institution", e.target.value)}
                          placeholder="University name"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Degree</label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor of Science in Computer Science"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Date</label>
                        <Input
                          value={edu.date}
                          onChange={(e) => handleEducationChange(edu.id, "date", e.target.value)}
                          placeholder="2015 - 2019"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Description</label>
                        <Textarea
                          value={edu.description}
                          onChange={(e) => handleEducationChange(edu.id, "description", e.target.value)}
                          placeholder="Relevant coursework, achievements, etc."
                          rows={3}
                          className={formClasses}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={addEducation}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-white/10 text-white hover:from-purple-600/30 hover:to-blue-500/30"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Education
                </Button>
              </motion.div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience" className="border-white/10">
          <AccordionTrigger className="text-lg font-medium text-white hover:text-purple-300">
            Work Experience
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <AnimatePresence>
                {data.experience.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    className="p-4 border border-white/10 rounded-md relative bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 text-gray-400"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Company</label>
                        <Input
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                          placeholder="Company name"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Position</label>
                        <Input
                          value={exp.position}
                          onChange={(e) => handleExperienceChange(exp.id, "position", e.target.value)}
                          placeholder="Job title"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Date</label>
                        <Input
                          value={exp.date}
                          onChange={(e) => handleExperienceChange(exp.id, "date", e.target.value)}
                          placeholder="2019 - Present"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Description</label>
                        <Textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(exp.id, "description", e.target.value)}
                          placeholder="Responsibilities, achievements, etc."
                          rows={3}
                          className={formClasses}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={addExperience}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-white/10 text-white hover:from-purple-600/30 hover:to-blue-500/30"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Experience
                </Button>
              </motion.div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="skills" className="border-white/10">
          <AccordionTrigger className="text-lg font-medium text-white hover:text-purple-300">Skills</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence>
                  {data.skills.map((skill) => (
                    <motion.div
                      key={skill.id}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      layout
                    >
                      <Input
                        value={skill.name}
                        onChange={(e) => handleSkillChange(skill.id, e.target.value)}
                        placeholder="Skill name"
                        className={`flex-1 ${formClasses}`}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1, color: "#ef4444" }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400"
                        onClick={() => removeSkill(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={addSkill}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-white/10 text-white hover:from-purple-600/30 hover:to-blue-500/30"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Skill
                </Button>
              </motion.div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="projects" className="border-white/10">
          <AccordionTrigger className="text-lg font-medium text-white hover:text-purple-300">Projects</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <AnimatePresence>
                {data.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="p-4 border border-white/10 rounded-md relative bg-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    layout
                  >
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-2 right-2 text-gray-400"
                      onClick={() => removeProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Project Name</label>
                        <Input
                          value={project.name}
                          onChange={(e) => handleProjectChange(project.id, "name", e.target.value)}
                          placeholder="Project name"
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">Description</label>
                        <Textarea
                          value={project.description}
                          onChange={(e) => handleProjectChange(project.id, "description", e.target.value)}
                          placeholder="Brief description of the project"
                          rows={3}
                          className={formClasses}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-200">URL (optional)</label>
                        <Input
                          value={project.url}
                          onChange={(e) => handleProjectChange(project.id, "url", e.target.value)}
                          placeholder="https://github.com/username/project"
                          className={formClasses}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={addProject}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-600/20 to-blue-500/20 border-white/10 text-white hover:from-purple-600/30 hover:to-blue-500/30"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Project
                </Button>
              </motion.div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
