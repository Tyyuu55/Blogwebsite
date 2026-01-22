import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])
  const selectedPost = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const totalPosts = ref(0)
  const currentPage = ref(1)
  const postsPerPage = ref(9)
  const searchQuery = ref('')
  const selectedCategory = ref('')

  const filteredPosts = computed(() => {
    let filtered = posts.value

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      )
    }

    if (selectedCategory.value) {
      filtered = filtered.filter(post => post.category === selectedCategory.value)
    }

    return filtered
  })

  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage.value
    const end = start + postsPerPage.value
    return filteredPosts.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredPosts.value.length / postsPerPage.value)
  })

  const categories = computed(() => {
    const cats = [...new Set(posts.value.map(post => post.category))]
    return cats.filter(Boolean)
  })

  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get('/posts')
      posts.value = response.data
      totalPosts.value = response.data.length
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch posts'
    } finally {
      loading.value = false
    }
  }

  const fetchPost = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get(`/posts/${id}`)
      selectedPost.value = response.data
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to fetch post'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const createPost = async (postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/posts', postData)
      posts.value.unshift(response.data)
      totalPosts.value = posts.value.length
      return { success: true, post: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to create post'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const updatePost = async (id, postData) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.put(`/posts/${id}`, postData)
      const index = posts.value.findIndex(p => p.id === id)
      if (index !== -1) {
        posts.value[index] = response.data
      }
      if (selectedPost.value?.id === id) {
        selectedPost.value = response.data
      }
      return { success: true, post: response.data }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update post'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const deletePost = async (id) => {
    loading.value = true
    error.value = null
    try {
      await api.delete(`/posts/${id}`)
      posts.value = posts.value.filter(p => p.id !== id)
      totalPosts.value = posts.value.length
      if (selectedPost.value?.id === id) {
        selectedPost.value = null
      }
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete post'
      return { success: false, error: error.value }
    } finally {
      loading.value = false
    }
  }

  const setPage = (page) => {
    currentPage.value = page
  }

  const setSearchQuery = (query) => {
    searchQuery.value = query
    currentPage.value = 1
  }

  const setCategory = (category) => {
    selectedCategory.value = category
    currentPage.value = 1
  }

  return {
    posts,
    selectedPost,
    loading,
    error,
    totalPosts,
    currentPage,
    postsPerPage,
    searchQuery,
    selectedCategory,
    filteredPosts,
    paginatedPosts,
    totalPages,
    categories,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    setPage,
    setSearchQuery,
    setCategory
  }
})

