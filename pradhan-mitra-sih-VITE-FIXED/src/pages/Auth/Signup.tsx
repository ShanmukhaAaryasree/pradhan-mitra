import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../stores/authStore'
import { UserPlus, ArrowLeft } from 'lucide-react'

interface SignupProps {
  onSwitchToLogin: () => void
}

export const Signup: React.FC<SignupProps> = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const signup = useAuthStore(state => state.signup)

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    const result = await signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone
    })
    setIsLoading(false)

    if (!result.success) {
      setErrors({ general: result.error || 'Signup failed' })
    }
    // If successful, the user will be automatically logged in after signup
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/20 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Create Account</h1>
          <p className="text-white/80">Join PM Internship Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Full Name"
              required
            />
            {errors.name && <p className="text-red-300 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Email Address"
              required
            />
            {errors.email && <p className="text-red-300 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Phone Number"
              required
            />
            {errors.phone && <p className="text-red-300 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Password (min 6 characters)"
              required
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full p-4 bg-white/30 backdrop-blur-sm border border-white/40 rounded-2xl text-white placeholder-white/60 focus:ring-4 focus:ring-white/30 text-lg"
              placeholder="Confirm Password"
              required
            />
            {errors.confirmPassword && <p className="text-red-300 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {errors.general && (
            <div className="bg-red-500/20 border border-red-400 rounded-2xl p-4">
              <p className="text-red-200 text-sm">{errors.general}</p>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-3xl font-black text-xl shadow-2xl disabled:opacity-50 mt-6"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={onSwitchToLogin}
            className="text-white/80 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Already have an account? Login
          </button>
        </div>
      </div>
    </motion.div>
  )
}