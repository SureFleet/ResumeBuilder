'use client'

import { Resume } from '@/lib/schema'
import { Mail, Phone, Linkedin, Github, Globe, Download, FileText } from 'lucide-react'
import { useState } from 'react'

export function ResumeView({ data }: { data: Resume }) {
  const [isExporting, setIsExporting] = useState<'pdf' | 'docx' | null>(null)

  const handleExport = async (format: 'pdf' | 'docx') => {
    setIsExporting(format)
    try {
      // Clean up data before sending to API
      const cleanData = {
        ...data,
        avatar: data.avatar && (data.avatar.startsWith('http') || data.avatar.startsWith('/')) ? data.avatar : undefined
      }
      
      const response = await fetch(`/api/export/${format}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `Failed to export ${format.toUpperCase()}`
        
        try {
          const errorData = JSON.parse(errorText)
          errorMessage += `: ${errorData.error}`
        } catch {
          errorMessage += `: ${response.status} ${response.statusText}`
        }
        
        throw new Error(errorMessage)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${data.name.replace(/\s+/g, '_')}_Resume.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error(`Error exporting ${format}:`, error)
      alert(`${error instanceof Error ? error.message : `Failed to export ${format.toUpperCase()}. Please try again.`}`)
    } finally {
      setIsExporting(null)
    }
  }

  return (
    <div className="relative">
      {/* Export Buttons - Fixed positioned for easy access */}
      <div className="fixed right-6 top-6 z-10 flex flex-col gap-2 print:hidden">
        <button
          onClick={() => handleExport('pdf')}
          disabled={isExporting !== null}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting === 'pdf' ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <FileText size={16} />
              <span>Export PDF</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleExport('docx')}
          disabled={isExporting !== null}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting === 'docx' ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Exporting...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Export DOCX</span>
            </>
          )}
        </button>
      </div>

      {/* Resume Content */}
      <div className="mx-auto max-w-[21cm] bg-white text-[11pt] leading-relaxed text-gray-800 shadow-xl print:shadow-none">
      {/* Header Section */}
      <div className="border-b-4 border-blue-600 bg-gradient-to-r from-blue-50 to-white px-10 py-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-[24pt] font-bold tracking-tight text-gray-900">{data.name}</h1>
            {data.title && (
              <p className="mt-1 text-[12pt] font-semibold text-blue-700">{data.title}</p>
            )}
            
            {/* Contact Info */}
            <div className="mt-3 text-[9pt] text-gray-700">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {data.phone && (
                  <span className="flex items-center gap-1">
                    <Phone size={11} className="text-blue-600" />
                    {data.phone}
                  </span>
                )}
                {data.email && (
                  <span className="flex items-center gap-1">
                    <Mail size={11} className="text-blue-600" />
                    <a href={`mailto:${data.email}`} className="hover:text-blue-600 hover:underline">
                      {data.email}
                    </a>
                  </span>
                )}
                {data.location && (
                  <span className="flex items-center gap-1">
                    <Globe size={11} className="text-blue-600" />
                    {data.location}
                  </span>
                )}
              </div>
              
              {/* Links on same row if space allows */}
              {!!data.links?.length && (
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                  {data.links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      className="flex items-center gap-1 hover:text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label && link.label.toLowerCase().includes('linkedin') && (
                        <Linkedin size={11} className="text-blue-600" />
                      )}
                      {link.label && link.label.toLowerCase().includes('github') && (
                        <Github size={11} className="text-blue-600" />
                      )}
                      {link.label &&
                        !link.label.toLowerCase().includes('linkedin') &&
                        !link.label.toLowerCase().includes('github') && (
                          <Globe size={11} className="text-blue-600" />
                        )}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Profile Picture */}
          {data.avatar && (
            <div className="flex-shrink-0">
              <img
                src={data.avatar}
                alt={data.name}
                className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-[33%_67%] gap-0">
        {/* Left Column */}
        <div className="border-r-2 border-gray-200 bg-gray-50 px-6 py-8">
          <div className="space-y-7">
            {/* Summary */}
            {data.summary && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Summary
                </h3>
                <p className="text-[10pt] leading-relaxed text-gray-700">{data.summary}</p>
              </section>
            )}

            {/* Core Competencies */}
            {!!data.expertise?.length && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Core Competencies
                </h3>
                <ul className="space-y-1.5 text-[10pt] text-gray-700">
                  {data.expertise.map((skill, i) => (
                    <li key={i} className="flex items-start leading-snug">
                      <span className="mr-2 font-bold text-blue-600">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Technical Skills */}
            {!!data.skills?.length && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Technical Skills
                </h3>
                <div className="space-y-2.5 text-[10pt]">
                  {data.skills.map((skillCat, i) => (
                    <div key={i}>
                      <p className="leading-snug">
                        <span className="font-bold text-gray-900">{skillCat.category}:</span>{' '}
                        <span className="text-gray-700">{skillCat.skills?.join(', ')}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {!!data.languages?.length && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Languages
                </h3>
                <p className="text-[10pt] text-gray-700">{data.languages.join(', ')}</p>
              </section>
            )}

            {/* Education */}
            {!!data.education?.length && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Education
                </h3>
                <div className="space-y-3">
                  {data.education.map((edu, i) => (
                    <div key={i}>
                      <p className="text-[10pt] font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-[10pt] text-gray-700">{edu.school}</p>
                      <p className="text-[9pt] text-gray-500">
                        {edu.location} | {edu.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {!!data.certifications?.length && (
              <section>
                <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[11pt] font-bold uppercase tracking-wider text-blue-700">
                  Certifications
                </h3>
                <ul className="space-y-1.5 text-[10pt] text-gray-700">
                  {data.certifications.map((cert, i) => (
                    <li key={i} className="flex items-start leading-snug">
                      <span className="mr-2 font-bold text-blue-600">•</span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}


          </div>
        </div>

        {/* Right Column */}
        <div className="px-8 py-7">
          {/* Professional Experience */}
          {!!data.experience?.length && (
            <section>
              <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[13pt] font-bold uppercase tracking-wider text-blue-700">
                Professional Experience
              </h3>
              <div className="space-y-4">
                {data.experience.map((exp, i) => (
                  <div key={i}>
                    <div className="mb-1">
                      <h4 className="text-[11pt] font-bold text-gray-900">
                        {exp.company} — {exp.role}
                      </h4>
                      <p className="text-[10pt] italic text-gray-600">
                        {exp.location} | {exp.startDate} – {exp.endDate}
                      </p>
                    </div>
                    {exp.bullets?.length > 0 && (
                      <ul className="mt-2 space-y-1 text-[10pt] text-gray-700">
                        {exp.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start leading-snug">
                            <span className="mr-2 mt-0.5 font-bold text-blue-600">-</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Selected Projects */}
          {!!data.projects?.length && (
            <section className="mt-7">
              <h3 className="mb-3 border-b-2 border-blue-600 pb-1.5 text-[13pt] font-bold uppercase tracking-wider text-blue-700">
                Selected Projects
              </h3>
              <div className="space-y-2.5">
                {data.projects.slice(0, 6).map((project, i) => (
                  <div key={i} className="flex items-start leading-snug">
                    <span className="mr-2 mt-0.5 font-bold text-blue-600">-</span>
                    <div className="text-[10pt] text-gray-700">
                      <span className="font-bold text-gray-900">{project.name}</span>
                      {project.role && (
                        <span className="italic text-gray-600"> ({project.role})</span>
                      )}{' '}
                      — {project.description}
                      {project.technologies?.length > 0 && (
                        <span className="text-[9pt] text-gray-500">
                          {' '}
                          [{project.technologies.join(', ')}]
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>


      </div>

      {/* End Resume Content */}
    </div>
  )
}
