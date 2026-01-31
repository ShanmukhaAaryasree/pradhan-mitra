import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { useAppStore } from '../stores/useAppStore'
import { FileText, Bot, Sparkles } from 'lucide-react'

export const ResumeAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false)
  const [keywords, setKeywords] = useState<string[]>([])
  const setStep = useAppStore(state => state.setStep)
  const setUser = useAppStore(state => state.setUser)
  const user = useAppStore(state => state.user)

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return
    setAnalyzing(true)
    setTimeout(() => {
      const extractedKeywords = ['Excel', 'Communication', 'MS Office', 'Data Analysis', 'Project Management']
      const extractedSkills = [
        { name: 'Excel', level: 'advanced' },
        { name: 'Communication', level: 'intermediate' },
        { name: 'MS Office', level: 'expert' },
        { name: 'Data Analysis', level: 'intermediate' }
      ]
      setKeywords(extractedKeywords)
      setAnalyzing(false)
      if (user) {
        // Combine user skills with resume skills
        const combinedSkills = [...user.skills]
        extractedSkills.forEach(resumeSkill => {
          const existing = combinedSkills.find(s => s.name.toLowerCase() === resumeSkill.name.toLowerCase())
          if (!existing) {
            combinedSkills.push(resumeSkill)
          } else if (existing.level === 'beginner' && resumeSkill.level !== 'beginner') {
            existing.level = resumeSkill.level
          }
        })
        setUser({ ...user, resumeKeywords: extractedKeywords, skills: combinedSkills })
      }
      setStep(4)
    }, 3000)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    multiple: false
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-8">
      <h2 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
        Resume Analysis
      </h2>
      <motion.div className={`border-4 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} bg-white rounded-3xl p-20 text-center cursor-pointer transition-colors`}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <FileText className="w-24 h-24 text-gray-400 mx-auto mb-8" />
          {analyzing ? (
            <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-8 py-4 rounded-3xl text-xl font-bold">
              <Bot className="w-6 h-6 mr-3 animate-spin" />
              AI Analyzing your resume...
            </div>
          ) : keywords.length > 0 ? (
            <div>
              <div className="inline-flex items-center bg-emerald-100 text-emerald-800 px-8 py-4 rounded-3xl text-xl font-bold mb-4">
                <Sparkles className="w-6 h-6 mr-3" />
                Keywords Extracted!
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {keywords.map((kw, i) => (
                  <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="inline-flex items-center bg-blue-100 text-blue-800 px-8 py-4 rounded-3xl text-xl font-bold">
              <Sparkles className="w-6 h-6 mr-3" />
              {isDragActive ? 'Drop your resume here' : 'Smart Keyword Extraction - Click or Drag & Drop'}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(0)}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
        >
          ← Back to Dashboard
        </motion.button>
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
          onClick={() => setStep(4)}
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all"
        >
          Smart Matching →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(5)}
          className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
        >
          Resume Builder →
        </motion.button>
      </div>
    </motion.div>
  )
}