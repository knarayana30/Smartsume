import type { ResumeData } from "@/types/resume"
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star } from "lucide-react"

interface ProfessionalTemplateProps {
  data: ResumeData
}

export default function ProfessionalTemplate({ data }: ProfessionalTemplateProps) {
  const { personalDetails, education, experience, skills, projects } = data

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold">{personalDetails.name}</h1>
        <p className="text-xl mt-1 text-gray-300">{personalDetails.title}</p>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-300">
          {personalDetails.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              <span>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              <span>{personalDetails.phone}</span>
            </div>
          )}
          {personalDetails.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{personalDetails.location}</span>
            </div>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        {personalDetails.summary && (
          <section className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
            <p className="text-gray-700 border-l-4 border-gray-900 pl-4">{personalDetails.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {/* Experience */}
            {experience.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" /> Professional Experience
                </h2>
                <div className="space-y-6">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-300 pb-6">
                      <div className="absolute w-3 h-3 bg-gray-900 rounded-full -left-[7px] top-1"></div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 text-lg">{exp.position}</h3>
                          <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{exp.date}</span>
                        </div>
                        <p className="text-gray-700 font-medium">{exp.company}</p>
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="h-5 w-5 mr-2" /> Education
                </h2>
                <div className="space-y-6">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative pl-6 border-l-2 border-gray-300 pb-6">
                      <div className="absolute w-3 h-3 bg-gray-900 rounded-full -left-[7px] top-1"></div>
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-gray-900 text-lg">{edu.degree}</h3>
                          <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">{edu.date}</span>
                        </div>
                        <p className="text-gray-700 font-medium">{edu.institution}</p>
                        <p className="text-gray-600 mt-2">{edu.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6 bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2" /> Skills
                </h2>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mr-2"></div>
                      <span className="text-gray-800">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project.id} className="border-b border-gray-200 pb-3 last:border-0">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-900 underline mt-1 inline-block"
                        >
                          View Project
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
