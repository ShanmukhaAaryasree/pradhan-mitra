export interface ResumeData {
  name: string
  email: string
  phone: string
  summary: string
  education: string
  experience: string
  skills: string[]
  certifications: string
}

export const calculateATSScore = (resumeData: ResumeData): number => {
  let score = 50 // Base score

  // Name and contact
  if (resumeData.name) score += 10
  if (resumeData.email) score += 5
  if (resumeData.phone) score += 5

  // Summary
  if (resumeData.summary.length > 50) score += 10

  // Education
  if (resumeData.education) score += 10

  // Experience
  if (resumeData.experience.length > 20) score += 10

  // Skills
  if (resumeData.skills.length > 0) score += 10
  if (resumeData.skills.length > 3) score += 5

  // Keywords matching PM internships
  const pmKeywords = ['excel', 'communication', 'data', 'analysis', 'project', 'management', 'office']
  const resumeText = `${resumeData.summary} ${resumeData.experience} ${resumeData.skills.join(' ')}`.toLowerCase()
  const keywordMatches = pmKeywords.filter(keyword => resumeText.includes(keyword)).length
  score += keywordMatches * 2

  // Formatting (assuming good formatting)
  score += 10

  return Math.min(100, score)
}

export const generateResumeFilename = (name: string): string => {
  return `${name.replace(/\s+/g, '_')}_Resume.pdf`
}