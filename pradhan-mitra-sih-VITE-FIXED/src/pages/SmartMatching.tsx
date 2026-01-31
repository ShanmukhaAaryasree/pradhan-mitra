import { motion } from 'framer-motion'
import { REAL_PM_INTERNSHIPS_2025 } from '../services/internships'
import { useAppStore } from '../stores/useAppStore'
import { Award, ArrowRight, ExternalLink } from 'lucide-react'

interface Internship {
  id: string
  title: string
  company: string
  sector: string
  location: string
  stipend: string
  duration: string
  skillsRequired: string[]
  programType: string
  ageRange: string
  benefits: string[]
}

interface InternshipWithMatch extends Internship {
  matchScore: number
  matchedSkills: string[]
  missingSkills: string[]
  explanation: string
  suggestions: { skill: string; courses: { title: string; link: string }[] }[]
}

export const SmartMatching = () => {
  const setStep = useAppStore(state => state.setStep)
  const user = useAppStore(state => state.user)

  const calculateMatch = (internship: typeof REAL_PM_INTERNSHIPS_2025[0]): InternshipWithMatch => {
    if (!user) return { ...internship, matchScore: 0, matchedSkills: [], missingSkills: [], explanation: '', suggestions: [] }

    const userSkillNames = user.skills.map(s => s.name.toLowerCase())
    const requiredSkills = internship.skillsRequired.map(s => s.toLowerCase())

    const matchedSkills = requiredSkills.filter(skill => userSkillNames.includes(skill))
    const missingSkills = requiredSkills.filter(skill => !userSkillNames.includes(skill))

    let matchScore = (matchedSkills.length / requiredSkills.length) * 100

    // Boost score if user has advanced skills
    const advancedSkills = user.skills.filter(s => s.level === 'advanced' || s.level === 'expert')
    if (advancedSkills.some(s => matchedSkills.includes(s.name.toLowerCase()))) {
      matchScore += 10
    }

    matchScore = Math.min(100, Math.max(0, matchScore))

    const explanation = `You have ${matchedSkills.length} out of ${requiredSkills.length} required skills. ${missingSkills.length > 0 ? `Missing: ${missingSkills.join(', ')}.` : 'Perfect match!'}`

    const suggestions = missingSkills.slice(0, 2).map(skill => ({
      skill,
      courses: [
        { title: `${skill} Fundamentals Course`, link: `https://www.coursera.org/search?query=${encodeURIComponent(skill)}` },
        { title: `Learn ${skill} on Udemy`, link: `https://www.udemy.com/topic/${encodeURIComponent(skill.toLowerCase())}/` },
        { title: `${skill} Free Resources`, link: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill + ' tutorial')}` }
      ]
    }))

    return {
      ...internship,
      matchScore: Math.round(matchScore),
      matchedSkills,
      missingSkills,
      explanation,
      suggestions
    }
  }

  const recommendations: InternshipWithMatch[] = REAL_PM_INTERNSHIPS_2025
    .map(calculateMatch)
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Your AI-Matched Internships
        </h2>
        <p className="text-xl text-gray-600">Personalized recommendations based on your skills and resume</p>
      </div>
      <div className="grid md:grid-cols-1 gap-8 mb-12">
        {recommendations.map((rec, i) => (
          <motion.div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className={`p-8 text-white ${rec.matchScore >= 80 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : rec.matchScore >= 60 ? 'bg-gradient-to-r from-blue-500 to-indigo-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{rec.title}</h3>
                  <p className="text-white/80">{rec.company}</p>
                  <div className="text-sm text-white/60 mt-2">
                    📍 {rec.location} • 💰 {rec.stipend} • 🏢 {rec.sector}
                    {rec.programType === 'PMIS' && (
                      <span className="ml-2 px-2 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
                        PMIS
                      </span>
                    )}
                  </div>
                  {rec.programType === 'PMIS' && (
                    <div className="text-xs text-white/70 mt-1">
                      ⏱️ {rec.duration} • 👥 {rec.ageRange}
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black">{rec.matchScore}%</div>
                  <div className="text-sm">Match Score</div>
                </div>
              </div>
            </div>
            <div className="p-8">
              {rec.programType === 'PMIS' && (
                <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <h4 className="font-bold text-lg mb-2 text-yellow-800">🎯 Prime Minister's Internship Scheme (PMIS)</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-yellow-700">Duration:</span> {rec.duration}
                    </div>
                    <div>
                      <span className="font-semibold text-yellow-700">Age Range:</span> {rec.ageRange}
                    </div>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold text-yellow-700">Benefits:</span>
                    <ul className="mt-1 text-sm text-yellow-800">
                      {rec.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-bold text-lg mb-2">Why Recommended:</h4>
                <p className="text-gray-700">{rec.explanation}</p>
              </div>

              {rec.missingSkills.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-2 text-orange-600">Skill Gaps & Learning Roadmap:</h4>
                  {rec.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="mb-4 p-4 bg-orange-50 rounded-xl">
                      <div className="font-semibold text-orange-800 mb-2">Learn {suggestion.skill}:</div>
                      <div className="space-y-1">
                        {suggestion.courses.map((course, cidx) => (
                          <a key={cidx} href={course.link} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm">
                            <ExternalLink className="w-4 h-4" />
                            {course.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <motion.button whileHover={{ scale: 1.02 }} 
                onClick={() => alert(`Application submitted for ${rec.title} at ${rec.company}!`)}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl font-bold">
                <Award className="inline mr-2" /> Apply Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="text-center space-y-4">
        {/* Quick Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
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
            className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all"
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
        </div>

        <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStep(5)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-3xl font-black text-2xl shadow-2xl">
          <ArrowRight className="inline mr-4" />
          Create ATS Resume
        </motion.button>
      </div>
    </motion.div>
  )
}