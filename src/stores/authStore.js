import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  const setUser = (userData) => {
    user.value = userData
  }

  const login = async (email, password) => {
    loading.value = true
    error.value = null
    
    // Mock authentication
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'user@example.com', password: 'user123', role: 'user' }
    ]
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const user = mockUsers.find(u => u.email === email && u.password === password)
      
      if (user) {
        const { password: _, ...userData } = user
        const token = `mock-jwt-token-${user.role}`
        setToken(token)
        setUser(userData)
        return { success: true }
      } else {
        error.value = 'Invalid email or password'
        return { success: false, error: error.value }
      }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const register = async (name, email, password) => {
    loading.value = true
    error.value = null
    
    // Mock registration
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'admin@example.com', password: 'admin123', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'user@example.com', password: 'user123', role: 'user' }
    ]
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const existingUser = mockUsers.find(u => u.email === email)
      
      if (existingUser) {
        error.value = 'Email already exists'
        return { success: false, error: error.value }
      }
      
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        role: 'user'
      }
      
      const token = 'mock-jwt-token-user'
      setToken(token)
      setUser(newUser)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    setToken(null)
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      // Mock user fetch based on token
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'admin@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'user@example.com', role: 'user' }
      ]
      
      const role = token.value.includes('admin') ? 'admin' : 'user'
      const user = mockUsers.find(u => u.role === role)
      
      if (user) {
        setUser(user)
      } else {
        logout()
      }
    } catch (err) {
      logout()
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    fetchUser,
    setToken,
    setUser
  }
})

