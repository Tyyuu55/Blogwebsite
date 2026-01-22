<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <Loader v-if="loading" />

    <div v-else-if="postStore.selectedPost">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-text mb-2">Edit Post</h1>
        <p class="text-muted">Update your blog post</p>
      </div>

      <form @submit.prevent="handleSubmit" class="card space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-text mb-2">
            Title *
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="input-field"
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label for="excerpt" class="block text-sm font-medium text-text mb-2">
            Excerpt *
          </label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            required
            rows="3"
            class="input-field"
            placeholder="Brief description of the post"
          ></textarea>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-text mb-2">
            Content *
          </label>
          <textarea
            id="content"
            v-model="form.content"
            required
            rows="15"
            class="input-field font-mono"
            placeholder="Write your post content here..."
          ></textarea>
          <p class="text-sm text-muted mt-2">Supports markdown-style formatting</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="category" class="block text-sm font-medium text-text mb-2">
              Category *
            </label>
            <select
              id="category"
              v-model="form.category"
              required
              class="input-field"
            >
              <option value="">Select a category</option>
              <option value="Vue.js">Vue.js</option>
              <option value="JavaScript">JavaScript</option>
              <option value="CSS">CSS</option>
              <option value="Backend">Backend</option>
              <option value="Frontend">Frontend</option>
              <option value="Tutorial">Tutorial</option>
            </select>
          </div>

          <div>
            <label for="image" class="block text-sm font-medium text-text mb-2">
              Image URL *
            </label>
            <input
              id="image"
              v-model="form.image"
              type="url"
              required
              class="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {{ error }}
        </div>

        <div class="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            :disabled="postStore.loading"
            class="btn-primary"
          >
            <span v-if="!postStore.loading">Update Post</span>
            <span v-else class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
          </button>
          <router-link to="/admin" class="btn-outline">
            Cancel
          </router-link>
        </div>
      </form>
    </div>

    <div v-else class="text-center py-16">
      <h2 class="text-2xl font-bold text-text mb-2">Post not found</h2>
      <router-link to="/admin" class="btn-primary mt-4">
        Back to Dashboard
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../stores/postStore'
import Loader from '../components/Loader.vue'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const form = ref({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  image: ''
})

const error = ref('')
const loading = ref(true)

onMounted(async () => {
  const postId = parseInt(route.params.id)
  const result = await postStore.fetchPost(postId)
  
  if (result.success && postStore.selectedPost) {
    form.value = {
      title: postStore.selectedPost.title,
      excerpt: postStore.selectedPost.excerpt,
      content: postStore.selectedPost.content,
      category: postStore.selectedPost.category,
      image: postStore.selectedPost.image
    }
  }
  
  loading.value = false
})

const handleSubmit = async () => {
  error.value = ''
  
  const postId = parseInt(route.params.id)
  const postData = {
    ...form.value,
    updatedAt: new Date().toISOString()
  }

  const result = await postStore.updatePost(postId, postData)
  
  if (result.success) {
    router.push('/admin')
  } else {
    error.value = result.error || 'Failed to update post'
  }
}
</script>

