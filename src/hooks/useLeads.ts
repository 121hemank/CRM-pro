import { useState, useEffect } from 'react'
import { getLeads, createLead } from '../lib/supabase'
import { useNotifications } from '../contexts/NotificationContext'

export const useLeads = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotifications()

  const fetchLeads = async () => {
    try {
      const { data, error } = await getLeads()
      if (error) throw error
      setLeads(data || [])
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to fetch leads',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const addLead = async (leadData: any) => {
    try {
      const { data, error } = await createLead(leadData)
      if (error) throw error
      
      setLeads(prev => [data[0], ...prev])
      addNotification({
        title: 'New Lead',
        message: `Lead ${leadData.first_name} ${leadData.last_name} created`,
        type: 'success'
      })
      return true
    } catch (error) {
      console.error('Error creating lead:', error)
      addNotification({
        title: 'Error',
        message: 'Failed to create lead',
        type: 'error'
      })
      return false
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  return {
    leads,
    loading,
    addLead,
    refetch: fetchLeads
  }
}