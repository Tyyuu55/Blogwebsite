<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center space-x-2 mt-8">
    <button
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    
    <div class="flex space-x-1">
      <button
        v-for="page in visiblePages"
        :key="page"
        @click="goToPage(page)"
        :class="[
          'px-4 py-2 rounded-xl transition-all',
          page === currentPage
            ? 'bg-primary text-white'
            : 'border-2 border-gray-200 hover:border-primary hover:text-primary'
        ]"
      >
        {{ page }}
      </button>
    </div>
    
    <button
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-xl border-2 border-gray-200 hover:border-primary hover:text-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['page-change'])

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages, start + maxVisible - 1)
  
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}
</script>

