import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { useAppStore } from '../stores/useAppStore'

interface EligibilityResult {
  isEligible: boolean
  reasons: string[]
  score: number
}

export const AdvancedEligibilityForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    familyIncome: '',
    educationLevel: '',
    citizenship: true,
    employmentStatus: '',
    familyGovEmployee: false,
    otherGovInternship: false,
    premierInstitute: false,
    professionalDegree: false,
    phone: '',
    email: ''
  })

  const [result, setResult] = useState<EligibilityResult | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const setUser = useAppStore(state => state.setUser)
  const setStep = useAppStore(state => state.setStep)

  const validateEligibility = async () => {
    setIsValidating(true)

    // Basic validation
    if (!formData.name.trim()) {
      alert('Please enter your full name')
      setIsValidating(false)
      return
    }

    if (!formData.age || parseInt(formData.age) < 18 || parseInt(formData.age) > 30) {
      alert('Please enter a valid age between 18-30')
      setIsValidating(false)
      return
    }

    if (!formData.familyIncome) {
      alert('Please enter your family income')
      setIsValidating(false)
      return
    }

    if (!formData.educationLevel || formData.educationLevel === 'Education Level') {
      alert('Please select your education level')
      setIsValidating(false)
      return
    }

    if (!formData.employmentStatus || formData.employmentStatus === 'Employment/Education Status') {
      alert('Please select your employment/education status')
      setIsValidating(false)
      return
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    const reasons: string[] = []
    let score = 100

    // Age validation (21-24 preferred, but 18-30 acceptable)
    const age = parseInt(formData.age)
    if (age < 21 || age > 24) {
      reasons.push('Age outside preferred range (21-24 years)')
      score -= 20
    }

    // Income validation
    const income = parseInt(formData.familyIncome)
    if (income >= 800000) {
      reasons.push('Family income exceeds ₹8 lakh per annum')
      score -= 50
    } else if (income >= 600000) {
      reasons.push('Family income is high (₹6-8 lakh range)')
      score -= 25
    }

    // Citizenship
    if (!formData.citizenship) {
      reasons.push('Must be Indian citizen')
      score -= 100
    }

    // Education validation
    const validEducation = ['Class 10', 'Class 12', 'ITI Certificate', 'Polytechnic Diploma', 'BA', 'B.Sc', 'B.Com', 'BBA', 'BCA', 'B.Pharma', 'Other Graduate Degree']
    if (!validEducation.includes(formData.educationLevel)) {
      reasons.push('Education level not eligible for PM internships')
      score -= 30
    }

    // Employment status
    if (formData.employmentStatus === 'full-time-employed') {
      reasons.push('Cannot be in full-time employment')
      score -= 100
    } else if (formData.employmentStatus === 'full-time-education') {
      reasons.push('Cannot be in full-time education')
      score -= 100
    }

    // Family government employee
    if (formData.familyGovEmployee) {
      reasons.push('Family cannot have permanent government employees')
      score -= 100
    }

    // Other government internships
    if (formData.otherGovInternship) {
      reasons.push('Cannot be undergoing other government internships (NATS/NAPS)')
      score -= 100
    }

    // Premier institutions
    if (formData.premierInstitute) {
      reasons.push('Graduates from premier institutions (IITs, IIMs, etc.) are not eligible')
      score -= 100
    }

    // Professional degrees
    if (formData.professionalDegree) {
      reasons.push('Holders of professional degrees (CA, MBBS, MBA, etc.) are not eligible')
      score -= 100
    }

    // Additional scoring based on education level
    if (['Class 10', 'Class 12', 'ITI Certificate', 'Polytechnic Diploma'].includes(formData.educationLevel)) {
      score += 10 // Bonus for basic education levels
    }

    const isEligible = score >= 50 && reasons.filter(r => r.includes('cannot') || r.includes('not eligible') || r.includes('must be')).length === 0

    const eligibilityResult: EligibilityResult = {
      isEligible,
      reasons,
      score: Math.max(0, Math.min(100, score))
    }

    setResult(eligibilityResult)
    setIsValidating(false)

    if (isEligible) {
      setUser({
        name: formData.name,
        age: parseInt(formData.age),
        familyIncome: parseInt(formData.familyIncome),
        educationLevel: formData.educationLevel,
        citizenship: formData.citizenship,
        employmentStatus: formData.employmentStatus,
        familyGovEmployee: formData.familyGovEmployee,
        otherGovInternship: formData.otherGovInternship,
        premierInstitute: formData.premierInstitute,
        professionalDegree: formData.professionalDegree,
        skills: [],
        resumeKeywords: [],
        profileComplete: 60,
        eligible: true,
        phone: formData.phone,
        email: formData.email
      })
      setTimeout(() => setStep(2), 3000)
    }
  }

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Reset result when form changes
    if (result) setResult(null)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl">
      <h2 className="text-5xl font-black text-center mb-12 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
        PM Internship Eligibility Check
      </h2>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Personal Information */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h3>

          <input
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            placeholder="Age (18-30) *"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            min="18"
            max="30"
            required
          />

          <input
            type="email"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
          />

          <input
            type="tel"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
          />
        </div>

        {/* Eligibility Criteria */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Eligibility Criteria</h3>

          <div className="space-y-4">
            <label className="flex items-center space-x-3 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
              <input
                type="checkbox"
                checked={formData.citizenship}
                onChange={(e) => updateFormData('citizenship', e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-lg font-medium">I am an Indian citizen *</span>
            </label>
          </div>

          <select
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            value={formData.educationLevel}
            onChange={(e) => updateFormData('educationLevel', e.target.value)}
            required
          >
            <option>Education Level *</option>
            <option>Class 10</option>
            <option>Class 12</option>
            <option>ITI Certificate</option>
            <option>Polytechnic Diploma</option>
            <option>BA</option>
            <option>B.Sc</option>
            <option>B.Com</option>
            <option>BBA</option>
            <option>BCA</option>
            <option>B.Pharma</option>
            <option>Other Graduate Degree</option>
          </select>

          <select
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            value={formData.employmentStatus}
            onChange={(e) => updateFormData('employmentStatus', e.target.value)}
            required
          >
            <option>Employment/Education Status *</option>
            <option value="neither">Neither employed nor in full-time education</option>
            <option value="part-time">Part-time employed</option>
            <option value="online-distance">Online/distance learning</option>
            <option value="full-time-employed">Full-time employed</option>
            <option value="full-time-education">Full-time education</option>
          </select>

          <input
            type="number"
            className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all"
            placeholder="Family Income (₹ per annum) *"
            value={formData.familyIncome}
            onChange={(e) => updateFormData('familyIncome', e.target.value)}
            min="0"
            required
          />
        </div>
      </div>

      {/* Ineligibility Criteria */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Ineligibility Criteria (Check if any apply)</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-start space-x-3 p-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.familyGovEmployee}
              onChange={(e) => updateFormData('familyGovEmployee', e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 mt-1"
            />
            <span className="text-lg">Any family member holds a permanent government job</span>
          </label>

          <label className="flex items-start space-x-3 p-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.otherGovInternship}
              onChange={(e) => updateFormData('otherGovInternship', e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 mt-1"
            />
            <span className="text-lg">Currently undergoing NATS/NAPS or other government internships</span>
          </label>

          <label className="flex items-start space-x-3 p-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.premierInstitute}
              onChange={(e) => updateFormData('premierInstitute', e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 mt-1"
            />
            <span className="text-lg">Graduate from premier institutions (IITs, IIMs, National Law Universities, IISERs, NIDs, IIITs)</span>
          </label>

          <label className="flex items-start space-x-3 p-4 bg-red-50 rounded-2xl border-2 border-red-200 hover:bg-red-100 transition-colors">
            <input
              type="checkbox"
              checked={formData.professionalDegree}
              onChange={(e) => updateFormData('professionalDegree', e.target.checked)}
              className="w-5 h-5 text-red-600 rounded focus:ring-red-500 mt-1"
            />
            <span className="text-lg">Holder of professional qualifications (CA, CMA, CS, MBBS, BDS, MBA, or any Master&apos;s/higher degree)</span>
          </label>
        </div>
      </div>

      {/* Check Eligibility Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={validateEligibility}
        disabled={isValidating}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-3xl font-bold text-2xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-3xl transition-all"
      >
        {isValidating ? (
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span>Analyzing Eligibility...</span>
          </div>
        ) : (
          'Check Eligibility'
        )}
      </motion.button>

      {/* Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-12 p-10 rounded-3xl border-4 ${
            result.isEligible
              ? 'bg-emerald-50 border-emerald-300'
              : 'bg-red-50 border-red-300'
          }`}
        >
          <div className="text-center mb-8">
            {result.isEligible ? (
              <>
                <CheckCircle2 className="w-24 h-24 text-emerald-500 mx-auto mb-6 animate-bounce" />
                <h3 className="text-4xl font-black text-emerald-900 mb-4">✅ ELIGIBLE FOR PM INTERNSHIP!</h3>
                <p className="text-xl text-emerald-700">Congratulations! You meet all the eligibility criteria.</p>
              </>
            ) : (
              <>
                <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
                <h3 className="text-4xl font-black text-red-900 mb-4">❌ NOT ELIGIBLE</h3>
                <p className="text-xl text-red-700">You do not meet the eligibility criteria for PM internships.</p>
              </>
            )}
          </div>

          {/* Eligibility Score */}
          <div className="bg-white/80 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xl font-bold">Eligibility Score</span>
              <span className={`text-2xl font-black ${
                result.score >= 80 ? 'text-emerald-600' :
                result.score >= 60 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {result.score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all duration-1000 ${
                  result.score >= 80 ? 'bg-emerald-500' :
                  result.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>

          {/* Reasons */}
          {result.reasons.length > 0 && (
            <div className="bg-white/80 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-yellow-600" />
                Details
              </h4>
              <ul className="space-y-2">
                {result.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-3 mt-1">•</span>
                    <span className="text-gray-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.isEligible && (
            <div className="mt-8 text-center">
              <div className="animate-pulse text-emerald-700 font-semibold">
                Redirecting to Skills Assessment in a few seconds...
              </div>
            </div>
          )}

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
              Skills Assessment →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-all"
            >
              Resume Analysis →
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}