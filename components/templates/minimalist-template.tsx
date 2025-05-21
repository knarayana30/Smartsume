import type { ResumeData } from "@/types/resume"
import { Briefcase, GraduationCap, Mail, MapPin, Phone, Star } from "lucide-react"

interface MinimalistTemplateProps {
  data: ResumeData
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  const { personalDetails, education, experience, skills, projects } = data

  return (
    <div className="w-full h-full bg-white text-gray-800 p-8 font-sans">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalDetails.name}</h1>
        <p className="text-xl text-gray-600 mt-1">{personalDetails.title}</p>

        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
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

      {/* Summary */}
      {personalDetails.summary && (
        <section className="mb-6">
          <p className="text-gray-700">{personalDetails.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3 flex items-center">
            <Briefcase className="h-5 w-5 mr-2" /> Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-sm text-gray-600">{exp.date}</span>
                </div>
                <p className="text-gray-700">{exp.company}</p>
                <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3 flex items-center">
            <GraduationCap className="h-5 w-5 mr-2" /> Education
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">{edu.date}</span>
                </div>
                <p className="text-gray-700">{edu.institution}</p>
                <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3 flex items-center">
            <Star className="h-5 w-5 mr-2" /> Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-3 flex items-center">Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 underline mt-1 inline-block"
                  >
                    {project.url}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
