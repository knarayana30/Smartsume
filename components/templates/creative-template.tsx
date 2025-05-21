import type { ResumeData } from "@/types/resume"
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star } from "lucide-react"

interface CreativeTemplateProps {
  data: ResumeData
}

export default function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalDetails, education, experience, skills, projects } = data

  return (
    <div className="w-full h-full bg-white text-gray-800 font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Sidebar */}
        <div className="bg-gradient-to-b from-purple-600 to-purple-800 text-white p-8">
          <div className="sticky top-0">
            {/* Header */}
            <header className="mb-8 text-center">
              <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-purple-700">
                  {personalDetails.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")}
                </span>
              </div>
              <h1 className="text-2xl font-bold">{personalDetails.name}</h1>
              <p className="text-purple-200 mt-1">{personalDetails.title}</p>
            </header>

            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold border-b border-purple-500 pb-2 mb-3">Contact</h2>
              <div className="space-y-2">
                {personalDetails.email && (
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm">{personalDetails.email}</span>
                  </div>
                )}
                {personalDetails.phone && (
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm">{personalDetails.phone}</span>
                  </div>
                )}
                {personalDetails.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-purple-300" />
                    <span className="text-sm">{personalDetails.location}</span>
                  </div>
                )}
              </div>
            </section>

            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-8">
                <h2 className="text-lg font-semibold border-b border-purple-500 pb-2 mb-3 flex items-center">
                  <Star className="h-4 w-4 mr-2 text-purple-300" /> Skills
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill) => (
                    <span key={skill.id} className="px-3 py-1 bg-purple-700 bg-opacity-50 rounded-full text-xs">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold border-b border-purple-500 pb-2 mb-3">Projects</h2>
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div key={project.id}>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-xs text-purple-200 mt-1">{project.description}</p>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-300 underline mt-1 inline-block"
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

        {/* Main Content */}
        <div className="p-8 md:col-span-2">
          {/* Summary */}
          {personalDetails.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{personalDetails.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                <Briefcase className="h-6 w-6 mr-2" /> Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-600 before:rounded-full before:z-10 before:shadow-md"
                  >
                    <div className="absolute left-[5.5px] top-2 bottom-0 w-0.5 h-full bg-purple-200 -z-10"></div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <h3 className="font-bold text-gray-900 text-lg">{exp.position}</h3>
                        <span className="text-sm font-medium text-purple-600">{exp.date}</span>
                      </div>
                      <p className="text-purple-700 font-medium">{exp.company}</p>
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
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                <GraduationCap className="h-6 w-6 mr-2" /> Education
              </h2>
              <div className="space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-purple-600 before:rounded-full before:z-10 before:shadow-md"
                  >
                    <div className="absolute left-[5.5px] top-2 bottom-0 w-0.5 h-full bg-purple-200 -z-10"></div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                        <span className="text-sm font-medium text-purple-600">{edu.date}</span>
                      </div>
                      <p className="text-purple-700 font-medium">{edu.institution}</p>
                      <p className="text-gray-600 mt-2">{edu.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
