import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../stores/useAppStore'
import { Download, Home, Eye, Edit3 } from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { calculateATSScore, generateResumeFilename, type ResumeData } from '../utils/resumeUtils'

export const ATSResumeBuilder = () => {
  const setStep = useAppStore(state => state.setStep)
  const user = useAppStore(state => state.user)
  const resumeRef = useRef<HTMLDivElement | null>(null)

  const [resumeData, setResumeData] = useState<ResumeData>({
    name: user?.name || '',
    email: '',
    phone: user?.phone || '',
    summary: '',
    education: user?.educationLevel ? `Completed ${user.educationLevel}` : '',
    experience: '',
    skills: user?.skills.map(s => s.name) || [],
    certifications: ''
  })

  const [isPreview, setIsPreview] = useState(false)

  const atsScore = calculateATSScore(resumeData)

  const downloadPDF = async () => {
    if (!resumeRef.current) return

    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')

      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(generateResumeFilename(resumeData.name))
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
    }
  }

  const updateResumeData = (field: keyof ResumeData, value: string | string[]) => {
    setResumeData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          AI Resume Builder
        </h2>
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setIsPreview(!isPreview)}
            className={`px-6 py-3 rounded-2xl font-bold flex items-center gap-2 ${
              isPreview ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isPreview ? <Edit3 className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            {isPreview ? 'Edit' : 'Preview'}
          </motion.button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form Section */}
        {!isPreview && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.name}
                  onChange={(e) => updateResumeData('name', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={resumeData.email}
                  onChange={(e) => updateResumeData('email', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.phone}
                  onChange={(e) => updateResumeData('phone', e.target.value)}
                  className="w-full p-3 border rounded-xl"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Professional Summary</h3>
              <textarea
                placeholder="Write a compelling professional summary (2-3 sentences)..."
                value={resumeData.summary}
                onChange={(e) => updateResumeData('summary', e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-xl resize-none"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Education</h3>
              <textarea
                placeholder="List your educational background..."
                value={resumeData.education}
                onChange={(e) => updateResumeData('education', e.target.value)}
                rows={3}
                className="w-full p-3 border rounded-xl resize-none"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Experience</h3>
              <textarea
                placeholder="Describe your work experience, internships, or projects..."
                value={resumeData.experience}
                onChange={(e) => updateResumeData('experience', e.target.value)}
                rows={4}
                className="w-full p-3 border rounded-xl resize-none"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add a skill and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const newSkill = e.currentTarget.value.trim()
                    if (newSkill && !resumeData.skills.includes(newSkill)) {
                      updateResumeData('skills', [...resumeData.skills, newSkill])
                    }
                    e.currentTarget.value = ''
                  }
                }}
                className="w-full p-3 border rounded-xl"
              />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6">Certifications (Optional)</h3>
              <textarea
                placeholder="List any certifications, courses, or achievements..."
                value={resumeData.certifications}
                onChange={(e) => updateResumeData('certifications', e.target.value)}
                rows={3}
                className="w-full p-3 border rounded-xl resize-none"
              />
            </div>
          </motion.div>
        )}

        {/* Preview Section */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          {/* ATS Score */}
          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-black text-white">{atsScore}</span>
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">ATS Score</h3>
            <p className="text-gray-600">
              {atsScore >= 80 ? 'Excellent! Highly ATS-friendly' :
               atsScore >= 60 ? 'Good! Some improvements needed' :
               'Needs improvement for better ATS compatibility'}
            </p>
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Resume Preview</h3>
            <div
              ref={resumeRef}
              className="border rounded-xl p-6 bg-white text-black max-w-2xl mx-auto"
              style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px', lineHeight: '1.4' }}
            >
              {/* Resume Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2">{resumeData.name || 'Your Name'}</h1>
                <div className="text-sm text-gray-600">
                  {resumeData.email && <span>{resumeData.email}</span>}
                  {resumeData.email && resumeData.phone && <span> | </span>}
                  {resumeData.phone && <span>{resumeData.phone}</span>}
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">PROFESSIONAL SUMMARY</h2>
                  <p className="text-sm">{resumeData.summary}</p>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">SKILLS</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">EXPERIENCE</h2>
                  <p className="text-sm whitespace-pre-line">{resumeData.experience}</p>
                </div>
              )}

              {/* Education */}
              {resumeData.education && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">EDUCATION</h2>
                  <p className="text-sm whitespace-pre-line">{resumeData.education}</p>
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications && (
                <div className="mb-6">
                  <h2 className="text-lg font-bold border-b-2 border-gray-300 mb-2">CERTIFICATIONS</h2>
                  <p className="text-sm whitespace-pre-line">{resumeData.certifications}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={downloadPDF}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white p-6 rounded-3xl font-black text-xl shadow-2xl flex items-center justify-center gap-2"
            >
              <Download className="w-6 h-6" />
              Download PDF Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setStep(0)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-3xl font-black text-xl shadow-2xl flex items-center justify-center gap-2"
            >
              <Home className="w-6 h-6" />
              Back to Dashboard
            </motion.button>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-all"
            >
              ← Back to Skills
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
            >
              ← Back to Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all"
            >
              ← Back to Matches
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}