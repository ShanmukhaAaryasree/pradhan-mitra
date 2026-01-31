import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { Shield, ArrowRight } from 'lucide-react'

interface LoginProps {
  onSwitchToSignup: () => void
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const login = useAuthStore(state => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await login(formData.email)

    if (!result.success) {
      setError(result.error || 'Login failed')
      setIsLoading(false)
    }
    // If successful, the user will be automatically redirected by the App component
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-black text-white mb-4">Welcome Back</h1>
          <p className="text-white/80 text-lg">Login to your PM Internship Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input type="email" value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Email Address" required />
          </div>

          <div>
            <input type="password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Password" required />
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-400 rounded-2xl p-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <motion.button whileHover={{ scale: 1.02 }} type="submit" disabled={isLoading}
            className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-3xl font-black text-xl shadow-2xl disabled:opacity-50">
            {isLoading ? 'Signing In...' : 'Login to Dashboard'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={onSwitchToSignup}
            className="text-white/80 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            New user? Create Account
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}