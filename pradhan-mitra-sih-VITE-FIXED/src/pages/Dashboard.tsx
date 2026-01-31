import { motion } from 'framer-motion'
import { useAuthStore } from '../stores/authStore'
import { useAppStore } from '../stores/useAppStore'
import { Brain, FileText, GraduationCap, Award, Zap, LogOut } from 'lucide-react'

export const Dashboard = () => {
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)
  const setStep = useAppStore(state => state.setStep)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
                  PM Internship AI
                </h1>
                <p className="text-sm text-gray-500">SIH 2025 Winner</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded-xl font-semibold">
                Welcome, {user?.name.split(' ')[0]}!
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStep(3)} className="group bg-gradient-to-br from-emerald-500 to-green-500 text-white p-10 rounded-3xl font-bold shadow-2xl hover:shadow-3xl">
            <FileText className="w-16 h-16 mx-auto mb-4 opacity-90 group-hover:scale-110" />
            <div>Upload Resume</div>
            <div className="text-emerald-100 text-sm mt-2">AI Analysis</div>
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStep(1)} className="group bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-10 rounded-3xl font-bold shadow-2xl hover:shadow-3xl">
            <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-90 group-hover:scale-110" />
            <div>Check Eligibility</div>
            <div className="text-blue-100 text-sm mt-2">PM Criteria</div>
          </motion.button>
          
          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStep(4)} className="group bg-gradient-to-br from-purple-500 to-pink-500 text-white p-10 rounded-3xl font-bold shadow-2xl hover:shadow-3xl">
            <Award className="w-16 h-16 mx-auto mb-4 opacity-90 group-hover:scale-110" />
            <div>View Matches</div>
            <div className="text-purple-100 text-sm mt-2">Top 5 AI Picks</div>
          </motion.button>

          <motion.button whileHover={{ scale: 1.05 }} onClick={() => setStep(5)} className="group bg-gradient-to-br from-orange-500 to-red-500 text-white p-10 rounded-3xl font-bold shadow-2xl hover:shadow-3xl">
            <Zap className="w-16 h-16 mx-auto mb-4 opacity-90 group-hover:scale-110" />
            <div>Resume Builder</div>
            <div className="text-orange-100 text-sm mt-2">ATS Optimized</div>
          </motion.button>
        </div>

        {/* PMIS Information Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border border-yellow-200 shadow-xl">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                🎯 Prime Minister's Internship Scheme (PMIS)
              </h3>
              <p className="text-lg text-gray-700">Bridge the gap between education and employment</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-600 mb-2">12</div>
                <div className="text-yellow-800 font-semibold">Months Training</div>
                <div className="text-sm text-gray-600">On-the-job experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-green-600 mb-2">₹5,000</div>
                <div className="text-green-800 font-semibold">Monthly Stipend</div>
                <div className="text-sm text-gray-600">₹4,500 govt + ₹500 CSR</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">24+</div>
                <div className="text-blue-800 font-semibold">Sectors Available</div>
                <div className="text-sm text-gray-600">Diverse industries</div>
              </div>
            </div>

            <div className="bg-white/60 rounded-2xl p-6 mb-6">
              <h4 className="font-bold text-lg mb-3 text-gray-800">Key Sectors & Companies:</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span><strong>IT:</strong> TCS, Infosys</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span><strong>Banking:</strong> Muthoot Finance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span><strong>Auto:</strong> Maruti Suzuki, Eicher</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span><strong>Energy:</strong> Reliance Industries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span><strong>Infrastructure:</strong> L&T</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span><strong>FMCG:</strong> Jubilant, ITC</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-4 bg-white/80 rounded-2xl p-4">
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Age Range:</span>
                  <span className="ml-2 text-green-600 font-bold">21-24 years</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-700">Benefits:</span>
                  <span className="ml-2 text-blue-600 font-bold">₹6,000 grant + Insurance</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="text-center">
          <h2 className="text-4xl font-black mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            🚀 Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Upload your resume and get personalized PM Internship recommendations powered by AI
          </p>
        </div>
      </main>
    </div>
  )
}