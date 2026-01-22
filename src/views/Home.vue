<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-text mb-4">
        Welcome to BlogCMS
      </h1>
      <p class="text-xl text-muted max-w-2xl mx-auto">
        Discover amazing articles, tutorials, and insights from our community
      </p>
    </div>

    <!-- Search and Filter -->
    <div class="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:space-x-4">
      <div class="flex-1">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search posts..."
            class="input-field pl-12"
          />
          <svg
            class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div class="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
        <button
          @click="selectCategory('')"
          :class="[
            'px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
            selectedCategory === ''
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-muted hover:bg-gray-200'
          ]"
        >
          All
        </button>
        <button
          v-for="category in categories"
          :key="category"
          @click="selectCategory(category)"
          :class="[
            'px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap',
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-muted hover:bg-gray-200'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <Loader v-if="postStore.loading && posts.length === 0" />

    <!-- Posts Grid -->
    <div v-else-if="posts.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
        />
      </div>
      
      <Pagination
        :current-page="postStore.currentPage"
        :total-pages="postStore.totalPages"
        @page-change="handlePageChange"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <svg
        class="mx-auto h-24 w-24 text-muted mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-2xl font-bold text-text mb-2">No posts found</h3>
      <p class="text-muted">Try adjusting your search or filter criteria</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { usePostStore } from '../stores/postStore'
import PostCard from '../components/PostCard.vue'
import Pagination from '../components/Pagination.vue'
import Loader from '../components/Loader.vue'

const postStore = usePostStore()
const searchQuery = ref('')
const selectedCategory = ref('')

const posts = computed(() => postStore.paginatedPosts)
const categories = computed(() => postStore.categories)

onMounted(() => {
  postStore.fetchPosts()
})

watch(searchQuery, (newVal) => {
  postStore.setSearchQuery(newVal)
})

const selectCategory = (category) => {
  selectedCategory.value = category
  postStore.setCategory(category)
}

const handlePageChange = (page) => {
  postStore.setPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

