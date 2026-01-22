<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <Loader v-if="postStore.loading" />
    
    <div v-else-if="postStore.selectedPost">
      <article>
        <!-- Back Button -->
        <button
          @click="$router.back()"
          class="mb-6 flex items-center space-x-2 text-muted hover:text-primary transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to posts</span>
        </button>

        <!-- Post Image -->
        <div class="mb-8 rounded-xl overflow-hidden">
          <img
            :src="postStore.selectedPost.image"
            :alt="postStore.selectedPost.title"
            class="w-full h-64 md:h-96 object-cover"
          />
        </div>

        <!-- Post Header -->
        <header class="mb-8">
          <div class="mb-4">
            <span class="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
              {{ postStore.selectedPost.category }}
            </span>
          </div>
          <h1 class="text-3xl md:text-4xl font-bold text-text mb-4">
            {{ postStore.selectedPost.title }}
          </h1>
          <div class="flex items-center space-x-4 text-muted">
            <div class="flex items-center space-x-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ postStore.selectedPost.author }}</span>
            </div>
            <span>•</span>
            <span>{{ formatDate(postStore.selectedPost.createdAt) }}</span>
            <span>•</span>
            <div class="flex items-center space-x-1">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{{ postStore.selectedPost.views || 0 }} views</span>
            </div>
          </div>
        </header>

        <!-- Post Content -->
        <div class="prose prose-lg max-w-none mb-8">
          <div class="whitespace-pre-line text-text leading-relaxed">
            {{ postStore.selectedPost.content }}
          </div>
        </div>

        <!-- Actions (Admin Only) -->
        <div v-if="authStore.isAuthenticated" class="flex items-center space-x-4 pt-8 border-t">
          <router-link
            :to="`/admin/edit/${postStore.selectedPost.id}`"
            class="btn-primary"
          >
            Edit Post
          </router-link>
          <button
            @click="handleDelete"
            class="btn-danger"
          >
            Delete Post
          </button>
        </div>
      </article>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-bold text-text mb-2">Post not found</h2>
      <p class="text-muted mb-6">The post you're looking for doesn't exist.</p>
      <router-link to="/" class="btn-primary">
        Go Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../stores/postStore'
import { useAuthStore } from '../stores/authStore'
import Loader from '../components/Loader.vue'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()
const authStore = useAuthStore()

onMounted(async () => {
  const postId = parseInt(route.params.id)
  await postStore.fetchPost(postId)
})

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleDelete = async () => {
  if (confirm('Are you sure you want to delete this post?')) {
    const result = await postStore.deletePost(postStore.selectedPost.id)
    if (result.success) {
      router.push('/')
    }
  }
}
</script>

