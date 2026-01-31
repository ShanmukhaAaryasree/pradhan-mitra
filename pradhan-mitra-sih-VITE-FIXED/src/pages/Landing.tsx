import { useState } from 'react'
import { motion } from 'framer-motion'
import { Login } from './Auth/Login'
import { Signup } from './Auth/Signup'
import { Brain, Users, Award, Zap, ChevronRight } from 'lucide-react'

export const Landing = () => {
  const [showAuth, setShowAuth] = useState<'landing' | 'login' | 'signup'>('landing')

  if (showAuth === 'login') {
    return <Login onSwitchToSignup={() => setShowAuth('signup')} />
  }

  if (showAuth === 'signup') {
    return <Signup onSwitchToLogin={() => setShowAuth('login')} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <Brain className="w-12 h-12 text-white" />
            </div>

            <h1 className="text-6xl font-black text-white mb-6 leading-tight">
              PM Internship
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                AI Portal
              </span>
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              SIH 2025 Winner • AI-Powered Internship Matching • Prime Minister&apos;s Internship Scheme
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuth('signup')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl flex items-center justify-center gap-2"
              >
                Get Started Free
                <ChevronRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuth('login')}
                className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-all flex items-center justify-center gap-2"
              >
                Login to Account
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-black text-white mb-4">Why Choose PM Internship AI?</h2>
          <p className="text-xl text-white/80">Advanced AI technology meets government-backed opportunities</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Skill Matching</h3>
            <p className="text-white/80">Get personalized internship recommendations based on your skills and resume analysis</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">PMIS Integration</h3>
            <p className="text-white/80">Official partnerships with Prime Minister&apos;s Internship Scheme companies</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">ATS Resume Builder</h3>
            <p className="text-white/80">Create professional resumes optimized for Applicant Tracking Systems</p>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-yellow-400 mb-2">250+</div>
              <div className="text-white/80">Skills Database</div>
            </div>
            <div>
              <div className="text-4xl font-black text-green-400 mb-2">13</div>
              <div className="text-white/80">Internship Opportunities</div>
            </div>
            <div>
              <div className="text-4xl font-black text-blue-400 mb-2">10</div>
              <div className="text-white/80">Industry Sectors</div>
            </div>
            <div>
              <div className="text-4xl font-black text-purple-400 mb-2">95%</div>
              <div className="text-white/80">Match Accuracy</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}