import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string, userData: any) => Promise<boolean>
  signOut: () => Promise<void>
  isPro: boolean
  upgradeToPro: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setIsPro(session?.user?.user_metadata?.subscription === 'pro')
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setIsPro(session?.user?.user_metadata?.subscription === 'pro')
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) {
        toast.error(error.message)
        return false
      }
      
      toast.success('Welcome back!')
      return true
    } catch (error) {
      toast.error('An error occurred during sign in')
      return false
    }
  }

  const signUp = async (email: string, password: string, userData: any): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      })
      
      if (error) {
        toast.error(error.message)
        return false
      }
      
      toast.success('Account created successfully!')
      return true
    } catch (error) {
      toast.error('An error occurred during sign up')
      return false
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Signed out successfully')
      }
    } catch (error) {
      toast.error('An error occurred during sign out')
    }
  }

  const upgradeToPro = async () => {
    try {
      // In a real app, this would integrate with a payment processor
      const { error } = await supabase.auth.updateUser({
        data: { subscription: 'pro' }
      })
      
      if (error) {
        toast.error('Failed to upgrade to Pro')
      } else {
        setIsPro(true)
        toast.success('Welcome to CRM Pro! 🎉')
      }
    } catch (error) {
      toast.error('An error occurred during upgrade')
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    isPro,
    upgradeToPro
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}