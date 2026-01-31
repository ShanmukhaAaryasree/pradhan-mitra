import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../stores/useAppStore'
import { Brain, Plus, X, Search, ChevronDown, Check, AlertTriangle } from 'lucide-react'
import { SKILLS_LIST, SKILL_CATEGORIES } from '../data/skillsData'

interface Skill {
  name: string
  level: string
}

export const SkillsAssessment = () => {
  const [skills, setSkills] = useState<Skill[]>([{ name: '', level: 'beginner' }])
  const [searchTerm, setSearchTerm] = useState('')
  const [showDropdown, setShowDropdown] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('All Skills')
  const setStep = useAppStore(state => state.setStep)
  const setUser = useAppStore(state => state.setUser)
  const user = useAppStore(state => state.user)

  const addSkill = () => {
    setSkills([...skills, { name: '', level: 'beginner' }])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    const newSkills = [...skills]
    newSkills[index][field] = value
    setSkills(newSkills)
    if (field === 'name') {
      setShowDropdown(null) // Close dropdown when skill is selected
    }
  }

  const getFilteredSkills = () => {
    let skillsToFilter = SKILLS_LIST

    if (selectedCategory !== 'All Skills') {
      skillsToFilter = SKILL_CATEGORIES[selectedCategory as keyof typeof SKILL_CATEGORIES] || []
    }

    if (searchTerm.trim()) {
      return skillsToFilter.filter(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return skillsToFilter.slice(0, 50) // Show first 50 skills by default
  }

  const isSkillSelected = (skillName: string) => {
    return skills.some(skill => skill.name === skillName)
  }

  const handleAnalyze = () => {
    const validSkills = skills.filter(s => s.name.trim())
    if (validSkills.length === 0) {
      alert('Please add at least one skill')
      return
    }
    if (validSkills.length < 3) {
      alert('You need at least 3 skills to be eligible for PM internships. Please add more skills.')
      return
    }
    if (user) {
      setUser({ ...user, skills: validSkills })
    }
    setStep(3)
  }

  const filteredSkills = getFilteredSkills()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto p-8">
      <h2 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Your Skills Profile
      </h2>

      {/* Skills Overview */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 mb-12 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <Brain className="w-12 h-12 text-purple-600" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800">Build Your Skills Profile</h3>
            <p className="text-gray-600">Select from our comprehensive database of 250+ professional skills including advanced technical skills</p>
          </div>
        </div>

        {/* Eligibility Warning */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-amber-800 mb-2">Important Eligibility Note</h4>
              <p className="text-amber-700 text-sm leading-relaxed">
                You will not be eligible for PM internships if any of the following conditions fail:
              </p>
              <ul className="text-amber-700 text-sm mt-3 space-y-1">
                <li>• Must have at least 3 relevant skills for your target internships</li>
                <li>• Skills must match the requirements of available internship positions</li>
                <li>• Proficiency level should be appropriate for the role requirements</li>
                <li>• Lack of required technical or domain-specific skills may result in ineligibility</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
            <div className="text-3xl font-black text-blue-600 mb-2">{skills.filter(s => s.name.trim()).length}</div>
            <div className="text-blue-800 font-semibold">Skills Added</div>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
            <div className="text-3xl font-black text-green-600 mb-2">250+</div>
            <div className="text-green-800 font-semibold">Available Skills</div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <div className="text-3xl font-black text-purple-600 mb-2">10</div>
            <div className="text-purple-800 font-semibold">Categories</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Filter by Category</h3>
        <div className="flex flex-wrap gap-3">
          {['All Skills', ...Object.keys(SKILL_CATEGORIES)].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-purple-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-6 mb-12">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-gray-200"
          >
            <div className="flex gap-4 items-center">
              {/* Skill Selection */}
              <div className="flex-1 relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search and select a skill..."
                    value={skill.name}
                    onChange={(e) => {
                      updateSkill(index, 'name', e.target.value)
                      setSearchTerm(e.target.value)
                      setShowDropdown(index)
                    }}
                    onFocus={() => setShowDropdown(index)}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all pr-12"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 pointer-events-none" />
                </div>

                {/* Dropdown */}
                {showDropdown === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto"
                  >
                    {/* Search within dropdown */}
                    <div className="p-3 border-b border-gray-200">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search skills..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                        />
                      </div>
                    </div>

                    {/* Skills list */}
                    <div className="max-h-48 overflow-y-auto">
                      {filteredSkills.length > 0 ? (
                        filteredSkills.map((skillOption) => (
                          <button
                            key={skillOption}
                            onClick={() => {
                              updateSkill(index, 'name', skillOption)
                              setSearchTerm('')
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors flex items-center justify-between group"
                          >
                            <span className="font-medium">{skillOption}</span>
                            {isSkillSelected(skillOption) && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <p>No skills found matching "{searchTerm}"</p>
                          <p className="text-sm mt-2">Try a different search term or select a different category</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Proficiency Level */}
              <div className="w-48">
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(index, 'level', e.target.value)}
                  className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>

              {/* Remove Button */}
              {skills.length > 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeSkill(index)}
                  className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              )}
            </div>

            {/* Skill Preview */}
            {skill.name && (
              <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-purple-800">{skill.name}</span>
                    <span className="ml-3 px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm font-medium capitalize">
                      {skill.level}
                    </span>
                  </div>
                  <div className="text-sm text-purple-600">
                    {skill.level === 'expert' && '⭐⭐⭐⭐⭐'}
                    {skill.level === 'advanced' && '⭐⭐⭐⭐☆'}
                    {skill.level === 'intermediate' && '⭐⭐⭐☆☆'}
                    {skill.level === 'beginner' && '⭐⭐☆☆☆'}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add Skill Button */}
      <div className="text-center mb-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addSkill}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto"
        >
          <Plus className="w-6 h-6" />
          Add Another Skill
        </motion.button>
      </div>

      {/* Analyze Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleAnalyze}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl transition-all"
      >
        Analyze Skills & Continue
      </motion.button>

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
          onClick={() => setStep(3)}
          className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
        >
          Resume Analysis →
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setStep(4)}
          className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all"
        >
          Smart Matching →
        </motion.button>
      </div>

      {/* Skills Summary */}
      {skills.filter(s => s.name.trim()).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Your Skills Summary</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.filter(s => s.name.trim()).map((skill, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl border border-purple-200">
                <div className="font-semibold text-purple-800">{skill.name}</div>
                <div className="text-sm text-purple-600 capitalize">{skill.level}</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}