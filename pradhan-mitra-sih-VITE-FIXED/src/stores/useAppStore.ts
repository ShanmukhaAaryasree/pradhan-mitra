import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Internship } from '../services/internships'

export interface Skill {
  name: string
  level: string
}

export interface User {
  name: string
  age: number
  familyIncome: number
  educationLevel: string
  citizenship: boolean
  employmentStatus: string
  familyGovEmployee: boolean
  otherGovInternship: boolean
  premierInstitute: boolean
  professionalDegree: boolean
  skills: Skill[]
  resumeKeywords: string[]
  profileComplete: number
  eligible: boolean
  phone?: string
  email?: string
}

interface AppState {
  user: User | null
  step: number
  recommendations: Internship[]
  setUser: (user: User) => void
  setStep: (step: number) => void
  setRecommendations: (recs: Internship[]) => void
}

export const useAppStore = create<AppState>()(
  persist((set) => ({
    user: null,
    step: 0,
    recommendations: [],
    setUser: (user) => set({ user }),
    setStep: (step) => set({ step }),
    setRecommendations: (recs) => set({ recommendations: recs }),
  }), { 
    name: 'pradhan-mitra-sih' 
  })
)