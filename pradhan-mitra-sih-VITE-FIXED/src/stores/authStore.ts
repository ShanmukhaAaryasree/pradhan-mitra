import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  phone: string
  isVerified: boolean
  profileComplete: number
}

interface AuthState {
  user: User | null
  isLoggedIn: boolean
  registeredUsers: User[]
  login: (email: string) => Promise<{ success: boolean; error?: string }>
  signup: (data: { name: string; email: string; phone: string }) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      registeredUsers: [],
      login: async (email) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const { registeredUsers } = get()
            const existingUser = registeredUsers.find(user => user.email.toLowerCase() === email.toLowerCase())

            if (!existingUser) {
              resolve({ success: false, error: 'No account found with this email. Please sign up first.' })
              return
            }

            set({
              user: existingUser,
              isLoggedIn: true
            })
            resolve({ success: true })
          }, 1500)
        })
      },
      signup: async (data) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const { registeredUsers } = get()
            const existingUser = registeredUsers.find(user => user.email.toLowerCase() === data.email.toLowerCase())

            if (existingUser) {
              resolve({ success: false, error: 'An account with this email already exists. Please login instead.' })
              return
            }

            const newUser: User = {
              id: Date.now().toString(),
              name: data.name,
              email: data.email,
              phone: data.phone || '',
              isVerified: false,
              profileComplete: 20
            }

            set(state => ({
              registeredUsers: [...state.registeredUsers, newUser],
              user: newUser,
              isLoggedIn: true
            }))

            resolve({ success: true })
          }, 2000)
        })
      },
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: 'sih-auth',
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        registeredUsers: state.registeredUsers
      })
    }
  )
)