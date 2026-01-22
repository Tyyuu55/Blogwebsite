<template>
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-text mb-2">Profile</h1>
      <p class="text-muted">Manage your account information</p>
    </div>

    <div class="card space-y-6">
      <div class="flex items-center space-x-6 pb-6 border-b">
        <div class="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {{ userInitials }}
        </div>
        <div>
          <h2 class="text-2xl font-bold text-text">{{ authStore.user?.name || 'User' }}</h2>
          <p class="text-muted">{{ authStore.user?.email }}</p>
          <span
            v-if="authStore.user?.role"
            class="inline-block mt-2 bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-xs font-medium"
          >
            {{ authStore.user.role }}
          </span>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-text mb-4">Account Information</h3>
        <dl class="space-y-4">
          <div>
            <dt class="text-sm font-medium text-muted mb-1">Full Name</dt>
            <dd class="text-text">{{ authStore.user?.name || 'N/A' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-muted mb-1">Email Address</dt>
            <dd class="text-text">{{ authStore.user?.email || 'N/A' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-muted mb-1">Role</dt>
            <dd class="text-text capitalize">{{ authStore.user?.role || 'User' }}</dd>
          </div>
        </dl>
      </div>

      <div class="pt-6 border-t">
        <h3 class="text-lg font-semibold text-text mb-4">Actions</h3>
        <div class="space-y-3">
          <button
            @click="handleLogout"
            class="btn-danger w-full md:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-muted text-sm mb-1">Your Posts</p>
            <p class="text-3xl font-bold text-text">{{ userPostsCount }}</p>
          </div>
          <div class="bg-primary bg-opacity-10 p-4 rounded-xl">
            <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-muted text-sm mb-1">Total Views</p>
            <p class="text-3xl font-bold text-text">{{ userViewsCount }}</p>
          </div>
          <div class="bg-green-500 bg-opacity-10 p-4 rounded-xl">
            <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { usePostStore } from '../stores/postStore'

const router = useRouter()
const authStore = useAuthStore()
const postStore = usePostStore()

const userInitials = computed(() => {
  const name = authStore.user?.name || 'User'
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const userPostsCount = computed(() => {
  if (!authStore.user) return 0
  return postStore.posts.filter(
    post => post.authorId === authStore.user.id
  ).length
})

const userViewsCount = computed(() => {
  if (!authStore.user) return 0
  return postStore.posts
    .filter(post => post.authorId === authStore.user.id)
    .reduce((sum, post) => sum + (post.views || 0), 0)
})

onMounted(() => {
  postStore.fetchPosts()
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>

