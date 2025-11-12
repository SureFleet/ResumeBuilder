import { NextRequest } from 'next/server'
import { ResumeSchema, type Resume } from '@/lib/schema'
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  Packer,
  TextRun,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from 'docx'

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    
    // Handle avatar URL - convert relative paths to absolute URLs
    if (json.avatar) {
      if (json.avatar.startsWith('/')) {
        // Convert relative path to absolute URL
        const host = req.headers.get('host') || 'localhost:3000'
        const protocol = req.headers.get('x-forwarded-proto') || 'http'
        json.avatar = `${protocol}://${host}${json.avatar}`
      } else if (!json.avatar.startsWith('http')) {
        // Remove invalid avatar paths
        json.avatar = undefined
      }
    }
    
    const data = ResumeSchema.parse(json) as Resume

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Header Section with Blue Border
            new Paragraph({
              children: [
                new TextRun({
                  text: data.name,
                  bold: true,
                  size: 56, // 28pt
                  color: "1F2937",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 160 },
            }),
            
            ...(data.title ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: data.title,
                    bold: true,
                    size: 28, // 14pt
                    color: "1D4ED8",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 320 },
              }),
            ] : []),
            
            new Paragraph({
              children: [
                new TextRun({
                  text: [data.email, data.phone, data.location].filter(Boolean).join(' · '),
                  size: 20, // 10pt
                  color: "374151",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { after: 160 },
            }),
            
            ...(data.links?.length ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: data.links.map(link => link.label).join(' · '),
                    size: 20, // 10pt
                    color: "1D4ED8",
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 480 },
                border: {
                  bottom: {
                    color: "2563EB",
                    size: 8,
                    style: BorderStyle.SINGLE,
                  },
                },
              }),
            ] : [
              new Paragraph({
                text: "",
                spacing: { after: 480 },
                border: {
                  bottom: {
                    color: "2563EB",
                    size: 8,
                    style: BorderStyle.SINGLE,
                  },
                },
              }),
            ]),

            // Two Column Layout using Table
            new Table({
              width: {
                size: 100,
                type: WidthType.PERCENTAGE,
              },
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE },
                insideVertical: { 
                  color: "E5E7EB",
                  size: 4,
                  style: BorderStyle.SINGLE,
                },
              },
              rows: [
                new TableRow({
                  children: [
                    // Left Column (35%)
                    new TableCell({
                      width: {
                        size: 35,
                        type: WidthType.PERCENTAGE,
                      },
                      shading: {
                        fill: "F9FAFB",
                      },
                      children: [
                        // Summary
                        ...(data.summary ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "SUMMARY",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: data.summary,
                                size: 20, // 10pt
                                color: "374151",
                              }),
                            ],
                            spacing: { after: 560 },
                          }),
                        ] : []),

                        // Core Competencies
                        ...(data.expertise?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "CORE COMPETENCIES",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.expertise.map(exp => 
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `• ${exp}`,
                                  size: 20, // 10pt
                                  color: "374151",
                                }),
                              ],
                              spacing: { after: 120 },
                            })
                          ),
                          new Paragraph({ text: "", spacing: { after: 560 } }),
                        ] : []),

                        // Technical Skills
                        ...(data.skills?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "TECHNICAL SKILLS",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.skills.map(skillCat => 
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `${skillCat.category}: `,
                                  bold: true,
                                  size: 20, // 10pt
                                  color: "1F2937",
                                }),
                                new TextRun({
                                  text: skillCat.skills?.join(', ') || '',
                                  size: 20, // 10pt
                                  color: "374151",
                                }),
                              ],
                              spacing: { after: 200 },
                            })
                          ),
                          new Paragraph({ text: "", spacing: { after: 560 } }),
                        ] : []),

                        // Languages
                        ...(data.languages?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "LANGUAGES",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: data.languages.join(', '),
                                size: 20, // 10pt
                                color: "374151",
                              }),
                            ],
                            spacing: { after: 560 },
                          }),
                        ] : []),

                        // Education
                        ...(data.education?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "EDUCATION",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.education.flatMap(e => [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: e.degree,
                                  bold: true,
                                  size: 20, // 10pt
                                  color: "1F2937",
                                }),
                              ],
                              spacing: { after: 80 },
                            }),
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: e.school,
                                  size: 20, // 10pt
                                  color: "374151",
                                }),
                              ],
                              spacing: { after: 80 },
                            }),
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `${e.location} | ${e.endDate}`,
                                  size: 18, // 9pt
                                  color: "6B7280",
                                }),
                              ],
                              spacing: { after: 240 },
                            }),
                          ]),
                          new Paragraph({ text: "", spacing: { after: 560 } }),
                        ] : []),

                        // Certifications
                        ...(data.certifications?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "CERTIFICATIONS",
                                bold: true,
                                size: 22, // 11pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 240 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.certifications.map(cert => 
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `• ${cert}`,
                                  size: 20, // 10pt
                                  color: "374151",
                                }),
                              ],
                              spacing: { after: 120 },
                            })
                          ),
                          new Paragraph({ text: "", spacing: { after: 560 } }),
                        ] : []),

                        // Community
                        
                      ],
                    }),
                    
                    // Right Column (65%)
                    new TableCell({
                      width: {
                        size: 65,
                        type: WidthType.PERCENTAGE,
                      },
                      children: [
                        // Professional Experience
                        ...(data.experience?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "PROFESSIONAL EXPERIENCE",
                                bold: true,
                                size: 26, // 13pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { after: 320 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.experience.flatMap(exp => [
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `${exp.company} — ${exp.role}`,
                                  bold: true,
                                  size: 22, // 11pt
                                  color: "1F2937",
                                }),
                              ],
                              spacing: { after: 80 },
                            }),
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `${exp.location} | ${exp.startDate} – ${exp.endDate}`,
                                  italics: true,
                                  size: 20, // 10pt
                                  color: "6B7280",
                                }),
                              ],
                              spacing: { after: 160 },
                            }),
                            ...exp.bullets.map(bullet => 
                              new Paragraph({
                                children: [
                                  new TextRun({
                                    text: `- ${bullet}`,
                                    size: 20, // 10pt
                                    color: "374151",
                                  }),
                                ],
                                spacing: { after: 80 },
                              })
                            ),
                            new Paragraph({ text: "", spacing: { after: 400 } }),
                          ]),
                        ] : []),

                        // Selected Projects
                        ...(data.projects?.length ? [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "SELECTED PROJECTS",
                                bold: true,
                                size: 26, // 13pt
                                color: "1D4ED8",
                              }),
                            ],
                            spacing: { before: 480, after: 320 },
                            border: {
                              bottom: {
                                color: "2563EB",
                                size: 4,
                                style: BorderStyle.SINGLE,
                              },
                            },
                          }),
                          ...data.projects.slice(0, 6).map(project => 
                            new Paragraph({
                              children: [
                                new TextRun({
                                  text: `- `,
                                  bold: true,
                                  size: 20, // 10pt
                                  color: "2563EB",
                                }),
                                new TextRun({
                                  text: project.name,
                                  bold: true,
                                  size: 20, // 10pt
                                  color: "1F2937",
                                }),
                                ...(project.role ? [
                                  new TextRun({
                                    text: ` (${project.role})`,
                                    italics: true,
                                    size: 20, // 10pt
                                    color: "6B7280",
                                  }),
                                ] : []),
                                new TextRun({
                                  text: ` — ${project.description}`,
                                  size: 20, // 10pt
                                  color: "374151",
                                }),
                                ...(project.technologies?.length ? [
                                  new TextRun({
                                    text: ` [${project.technologies.join(', ')}]`,
                                    size: 18, // 9pt
                                    color: "6B7280",
                                  }),
                                ] : []),
                              ],
                              spacing: { after: 160 },
                            })
                          ),
                        ] : []),
                      ],
                    }),
                  ],
                }),
              ],
            }),


          ],
        },
      ],
    })

    const buffer = await Packer.toBuffer(doc)

    return new Response(buffer as any, {
      status: 200,
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="resume.docx"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message ?? 'Invalid data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
