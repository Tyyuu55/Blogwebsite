<template>
  <article
    class="card group cursor-pointer overflow-hidden"
    @click="navigateToPost"
  >
    <div class="relative h-48 mb-4 overflow-hidden rounded-lg">
      <img
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div class="absolute top-4 right-4">
        <span class="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
          {{ post.category }}
        </span>
      </div>
    </div>
    
    <h2 class="text-xl font-bold mb-2 text-text group-hover:text-primary transition-colors line-clamp-2">
      {{ post.title }}
    </h2>
    
    <p class="text-muted mb-4 line-clamp-3">
      {{ post.excerpt }}
    </p>
    
    <div class="flex items-center justify-between text-sm text-muted">
      <div class="flex items-center space-x-2">
        <span>{{ post.author }}</span>
        <span>•</span>
        <span>{{ formatDate(post.createdAt) }}</span>
      </div>
      <div class="flex items-center space-x-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span>{{ post.views || 0 }}</span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const navigateToPost = () => {
  router.push(`/post/${props.post.id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

