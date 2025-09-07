import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helpers
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Database helpers
export const getCustomers = async () => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createCustomer = async (customer: any) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([customer])
    .select()
  return { data, error }
}

export const updateCustomer = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('contacts')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export const getLeads = async () => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createLead = async (lead: any) => {
  const { data, error } = await supabase
    .from('leads')
    .insert([lead])
    .select()
  return { data, error }
}

export const getDeals = async () => {
  const { data, error } = await supabase
    .from('deals')
    .select(`
      *,
      contacts(first_name, last_name, email),
      companies(name)
    `)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createDeal = async (deal: any) => {
  const { data, error } = await supabase
    .from('deals')
    .insert([deal])
    .select()
  return { data, error }
}

export const getActivities = async () => {
  const { data, error } = await supabase
    .from('activities')
    .select(`
      *,
      contacts(first_name, last_name),
      companies(name)
    `)
    .order('created_at', { ascending: false })
  return { data, error }
}

export const createActivity = async (activity: any) => {
  const { data, error } = await supabase
    .from('activities')
    .insert([activity])
    .select()
  return { data, error }
}