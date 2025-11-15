import { Document, Page, Text, View, StyleSheet, Link, Image } from '@react-pdf/renderer'
import type { Resume } from '@/lib/schema'
import { formatDateRange } from '@/lib/format'

const styles = StyleSheet.create({
  page: { 
    padding: 0, 
    fontSize: 11, 
    color: '#1F2937',
    fontFamily: 'Helvetica',
  },
  
  // Header Section
  header: {
    backgroundColor: '#EBF5FF',
    borderBottom: '4px solid #2563EB',
    padding: '32px 48px',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flex: 1,
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  title: { 
    fontSize: 14, 
    fontWeight: 'bold',
    color: '#1D4ED8',
    marginBottom: 16,
  },
  contactInfo: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 8,
  },
  links: {
    fontSize: 10,
    color: '#1D4ED8',
  },
  
  // Profile Image
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },
  
  // Two Column Layout
  mainContent: {
    flexDirection: 'row',
    minHeight: '100%',
  },
  
  // Left Column
  leftColumn: {
    width: '33%',
    backgroundColor: '#F9FAFB',
    borderRight: '2px solid #E5E7EB',
    padding: '32px 24px',
  },
  leftSection: {
    marginBottom: 28,
  },
  
  // Right Column  
  rightColumn: {
    width: '67%',
    padding: '28px 32px',
    backgroundColor: '#FFFFFF',
  },
  
  // Section Headers
  sectionHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #2563EB',
    paddingBottom: 6,
    marginBottom: 12,
  },
  
  rightSectionHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    borderBottom: '2px solid #2563EB',
    paddingBottom: 6,
    marginBottom: 12,
  },
  
  // Content Styles
  bodyText: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 4,
  },
  
  list: { 
    marginTop: 0,
  },
  listItem: { 
    fontSize: 10,
    color: '#374151',
    marginBottom: 6,
    paddingLeft: 8,
  },
  
  // Skills
  skillCategory: {
    fontSize: 10,
    marginBottom: 10,
  },
  skillCategoryName: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  skillsList: {
    color: '#374151',
  },
  
  // Experience
  experienceItem: {
    marginBottom: 16,
  },
  companyRole: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  experienceDetails: {
    fontSize: 10,
    fontStyle: 'italic',
    color: '#6B7280',
    marginBottom: 8,
  },
  experienceBullet: {
    fontSize: 10,
    color: '#374151',
    marginBottom: 4,
    paddingLeft: 8,
  },
  
  // Projects Section (Full Width)
  projectsSection: {
    borderTop: '2px solid #E5E7EB',
    backgroundColor: '#FFFFFF',
    padding: '32px 48px',
  },
  projectItem: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  projectName: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  projectRole: {
    fontStyle: 'italic',
    color: '#6B7280',
  },
  projectTech: {
    fontSize: 9,
    color: '#6B7280',
  },
})

export function ResumePDF({ data }: { data: Resume }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{data.name}</Text>
            {data.title && <Text style={styles.title}>{data.title}</Text>}
            
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {data.phone && (
                <Text style={styles.contactInfo}>{data.phone}</Text>
              )}
              {data.phone && data.email && (
                <Text style={styles.contactInfo}> · </Text>
              )}
              {data.email && (
                <Link src={`mailto:${data.email}`} style={styles.contactInfo}>
                  {data.email}
                </Link>
              )}
              {(data.phone || data.email) && data.location && (
                <Text style={styles.contactInfo}> · </Text>
              )}
              {data.location && (
                <Text style={styles.contactInfo}>{data.location}</Text>
              )}
            </View>
            
            {!!data.links?.length && (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.links.map((link, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Link src={link.url} style={styles.links}>
                      {link.label}
                    </Link>
                    {index < data.links.length - 1 && (
                      <Text style={styles.links}> · </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* Profile Image */}
          {data.avatar && (
            <View>
              <Image
                style={styles.profileImage}
                src={data.avatar}
              />
            </View>
          )}
        </View>

        {/* Two Column Layout */}
        <View style={styles.mainContent}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            {data.summary && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Summary</Text>
                <Text style={styles.bodyText}>{data.summary}</Text>
              </View>
            )}

            {/* Core Competencies */}
            {!!data.expertise?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Core Competencies</Text>
                <View style={styles.list}>
                  {data.expertise.map((exp, i) => (
                    <Text key={i} style={styles.listItem}>• {exp}</Text>
                  ))}
                </View>
              </View>
            )}

            {/* Technical Skills */}
            {!!data.skills?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Technical Skills</Text>
                {data.skills.map((skillCat, i) => (
                  <View key={i} style={styles.skillCategory}>
                    <Text style={styles.skillCategoryName}>{skillCat.category}:</Text>
                    <Text style={styles.skillsList}> {skillCat.skills?.join(', ')}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Languages */}
            {!!data.languages?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Languages</Text>
                <Text style={styles.bodyText}>{data.languages.join(', ')}</Text>
              </View>
            )}

            {/* Education */}
            {!!data.education?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Education</Text>
                {data.education.map((e, i) => (
                  <View key={i} style={{ marginBottom: 12 }}>
                    <Text style={[styles.bodyText, { fontWeight: 'bold', color: '#1F2937' }]}>{e.degree}</Text>
                    <Text style={styles.bodyText}>{e.school}</Text>
                    <Text style={[styles.bodyText, { fontSize: 9, color: '#6B7280' }]}>
                      {e.location} | {e.endDate}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {!!data.certifications?.length && (
              <View style={styles.leftSection}>
                <Text style={styles.sectionHeader}>Certifications</Text>
                <View style={styles.list}>
                  {data.certifications.map((cert, i) => (
                    <Text key={i} style={styles.listItem}>• {cert}</Text>
                  ))}
                </View>
              </View>
            )}


          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Professional Experience */}
            {!!data.experience?.length && (
              <View>
                <Text style={styles.rightSectionHeader}>Professional Experience</Text>
                {data.experience.map((exp, i) => (
                  <View key={i} style={styles.experienceItem}>
                    <Text style={styles.companyRole}>
                      {exp.company} — {exp.role}
                    </Text>
                    <Text style={styles.experienceDetails}>
                      {exp.location} | {exp.startDate} – {exp.endDate}
                    </Text>
                    {exp.bullets?.length > 0 && (
                      <View style={styles.list}>
                        {exp.bullets.map((bullet, j) => (
                          <Text key={j} style={styles.experienceBullet}>- {bullet}</Text>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Selected Projects */}
            {!!data.projects?.length && (
              <View style={{ marginTop: 20 }}>
                <Text style={styles.rightSectionHeader}>Selected Projects</Text>
                {data.projects.slice(0, 6).map((project, i) => (
                  <View key={i} style={styles.projectItem}>
                    <Text style={styles.bodyText}>
                      <Text style={styles.projectName}>- {project.name}</Text>
                      {project.role && (
                        <Text style={styles.projectRole}> ({project.role})</Text>
                      )}
                      <Text> — {project.description}</Text>
                      {project.technologies?.length > 0 && (
                        <Text style={styles.projectTech}> [{project.technologies.join(', ')}]</Text>
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>


      </Page>
    </Document>
  )
}
