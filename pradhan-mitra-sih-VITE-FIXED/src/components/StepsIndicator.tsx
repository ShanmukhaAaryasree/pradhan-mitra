import { useAppStore } from '../stores/useAppStore'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'

export const StepsIndicator = () => {
  const step = useAppStore(state => state.step)
  const setStep = useAppStore(state => state.setStep)
  const steps = ['Dashboard', 'Eligibility', 'Skills', 'Resume', 'Matches', 'Resume Builder']

  const goToPrevious = () => {
    if (step > 0) setStep(step - 1)
  }

  const goToNext = () => {
    if (step < steps.length - 1) setStep(step + 1)
  }

  const goToDashboard = () => {
    setStep(0)
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToDashboard}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={goToPrevious}
              disabled={step === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={goToNext}
            disabled={step === steps.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center gap-2 text-sm flex-wrap">
          {steps.map((label, i) => (
            <motion.div
              key={i}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                i < step
                  ? 'bg-emerald-500 text-white shadow-lg'
                  : i === step
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-2 h-2 rounded-full ${
                i <= step ? 'bg-white' : 'bg-gray-400'
              }`} />
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}