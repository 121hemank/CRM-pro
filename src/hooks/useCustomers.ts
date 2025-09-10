import { useState, useEffect } from 'react'
import { getCustomers, createCustomer, updateCustomer } from '../lib/supabase'
import { useNotifications } from '../contexts/NotificationContext'

export const useCustomers = () => {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotifications()

  const fetchCustomers = async () => {
    try {
      const { data, error } = await getCustomers()
      if (error) throw error
      setCustomers(data || [])
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to fetch customers',
        type: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const addCustomer = async (customerData: any) => {
    try {
      const { data, error } = await createCustomer(customerData)
      if (error) throw error
      
      setCustomers(prev => [data[0], ...prev])
      addNotification({
        title: 'Success',
        message: 'Customer created successfully',
        type: 'success'
      })
      return true
    } catch (error) {
      console.error('Error creating customer:', error)
      addNotification({
        title: 'Error',
        message: 'Failed to create customer',
        type: 'error'
      })
      return false
    }
  }

  const editCustomer = async (id: string, updates: any) => {
    try {
      const { data, error } = await updateCustomer(id, updates)
      if (error) throw error
      
      setCustomers(prev => prev.map(customer => 
        customer.id === id ? data[0] : customer
      ))
      addNotification({
        title: 'Success',
        message: 'Customer updated successfully',
        type: 'success'
      })
      return true
    } catch (error) {
      addNotification({
        title: 'Error',
        message: 'Failed to update customer',
        type: 'error'
      })
      return false
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return {
    customers,
    loading,
    addCustomer,
    editCustomer,
    refetch: fetchCustomers
  }
}