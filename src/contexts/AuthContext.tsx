import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userRole: string | null;
  loading: boolean;
  isPro: boolean;
  signIn: (email: string, password: string, role?: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  upgradeToPro: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) fetchUserRole(session.user.id);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
        setIsPro(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        // If no role found, default to 'user'
        setUserRole('user');
        return;
      }

      setUserRole(data.role);
      
      // Check if user is Pro (for demo purposes, admin and employee are considered Pro)
      setIsPro(data.role === 'admin' || data.role === 'employee' || Math.random() > 0.5);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setUserRole('user');
    }
  };

  const signIn = async (email: string, password: string, role?: string) => {
    // For demo purposes, handle role-based login
    if (role === 'admin' && email === 'admin@crmpro.com' && password === 'admin123') {
      // Demo admin login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@crmpro.com',
        password: 'demo123',
      });
      if (!error && data.user) {
        setUserRole('admin');
        setIsPro(true);
      }
      return { error };
    }
    
    if (role === 'employee' && email === 'employee@crmpro.com' && password === 'employee123') {
      // Demo employee login
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'demo@crmpro.com',
        password: 'demo123',
      });
      if (!error && data.user) {
        setUserRole('employee');
        setIsPro(true);
      }
      return { error };
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const upgradeToPro = async () => {
    // Simulate upgrade process
    setIsPro(true);
    // In a real app, this would handle payment processing
  };

  const value = {
    user,
    session,
    userRole,
    isPro,
    loading,
    signIn,
    signUp,
    signOut,
    upgradeToPro,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}