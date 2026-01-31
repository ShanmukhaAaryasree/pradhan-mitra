import React from 'react'
import { useAuthStore } from './stores/authStore'
import { useAppStore } from './stores/useAppStore'

import { Landing } from './pages/Landing'
import { Dashboard } from './pages/Dashboard'
import { SkillsAssessment } from './pages/SkillsAssessment'
import { ResumeAnalysis } from './pages/ResumeAnalysis'
import { SmartMatching } from './pages/SmartMatching'
import { ATSResumeBuilder } from './components/ATSResumeBuilder'
import { AdvancedEligibilityForm } from './components/AdvancedEligibilityForm'
import { StepsIndicator } from './components/StepsIndicator'

const App: React.FC = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)
  const step = useAppStore(state => state.step)

  if (!isLoggedIn) return <Landing />

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <StepsIndicator />

      {step === 0 && <Dashboard />}
      {step === 1 && <AdvancedEligibilityForm />}
      {step === 2 && <SkillsAssessment />}
      {step === 3 && <ResumeAnalysis />}
      {step === 4 && <SmartMatching />}
      {step === 5 && <ATSResumeBuilder />}
    </div>
  )
}

export default App
