<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-3xl font-bold text-text">Dashboard</h1>
        <router-link to="/admin/create" class="btn-primary">
          <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Post
        </router-link>
      </div>
      <p class="text-muted">Manage your blog posts and view analytics</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-muted text-sm mb-1">Total Posts</p>
            <p class="text-3xl font-bold text-text">{{ postStore.totalPosts }}</p>
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
            <p class="text-muted text-sm mb-1">Categories</p>
            <p class="text-3xl font-bold text-text">{{ postStore.categories.length }}</p>
          </div>
          <div class="bg-blue-500 bg-opacity-10 p-4 rounded-xl">
            <svg class="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-muted text-sm mb-1">Total Views</p>
            <p class="text-3xl font-bold text-text">{{ totalViews }}</p>
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

    <!-- Chart Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div class="card">
        <h2 class="text-xl font-bold text-text mb-4">Posts by Category</h2>
        <canvas ref="categoryChart"></canvas>
      </div>

      <div class="card">
        <h2 class="text-xl font-bold text-text mb-4">Recent Activity</h2>
        <canvas ref="activityChart"></canvas>
      </div>
    </div>

    <!-- Recent Posts -->
    <div class="card">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-text">Recent Posts</h2>
        <router-link to="/" class="text-primary hover:underline text-sm font-medium">
          View All
        </router-link>
      </div>

      <Loader v-if="postStore.loading" />

      <div v-else-if="recentPosts.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 px-4 text-sm font-semibold text-text">Title</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text">Category</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text">Views</th>
              <th class="text-left py-3 px-4 text-sm font-semibold text-text">Date</th>
              <th class="text-right py-3 px-4 text-sm font-semibold text-text">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="post in recentPosts"
              :key="post.id"
              class="border-b hover:bg-gray-50 transition-colors"
            >
              <td class="py-3 px-4">
                <router-link
                  :to="`/post/${post.id}`"
                  class="text-primary hover:underline font-medium"
                >
                  {{ post.title }}
                </router-link>
              </td>
              <td class="py-3 px-4">
                <span class="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {{ post.category }}
                </span>
              </td>
              <td class="py-3 px-4 text-muted">{{ post.views || 0 }}</td>
              <td class="py-3 px-4 text-muted">{{ formatDate(post.createdAt) }}</td>
              <td class="py-3 px-4">
                <div class="flex items-center justify-end space-x-2">
                  <router-link
                    :to="`/admin/edit/${post.id}`"
                    class="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </router-link>
                  <button
                    @click="handleDelete(post.id)"
                    class="p-2 text-danger hover:bg-danger hover:bg-opacity-10 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-8 text-muted">
        No posts yet. Create your first post!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { usePostStore } from '../stores/postStore'
import { Chart, registerables } from 'chart.js'
import Loader from '../components/Loader.vue'

Chart.register(...registerables)

const postStore = usePostStore()
const categoryChart = ref(null)
const activityChart = ref(null)
let categoryChartInstance = null
let activityChartInstance = null

const recentPosts = computed(() => {
  return [...postStore.posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10)
})

const totalViews = computed(() => {
  return postStore.posts.reduce((sum, post) => sum + (post.views || 0), 0)
})

onMounted(async () => {
  await postStore.fetchPosts()
  await nextTick()
  initCharts()
})

onUnmounted(() => {
  if (categoryChartInstance) {
    categoryChartInstance.destroy()
  }
  if (activityChartInstance) {
    activityChartInstance.destroy()
  }
})

const initCharts = () => {
  // Category Chart
  if (categoryChart.value) {
    const categoryData = postStore.categories.reduce((acc, category) => {
      acc[category] = postStore.posts.filter(p => p.category === category).length
      return acc
    }, {})

    categoryChartInstance = new Chart(categoryChart.value, {
      type: 'doughnut',
      data: {
        labels: Object.keys(categoryData),
        datasets: [{
          data: Object.values(categoryData),
          backgroundColor: [
            '#2563eb',
            '#0f172a',
            '#64748b',
            '#dc2626',
            '#10b981',
            '#f59e0b'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    })
  }

  // Activity Chart (Views over time)
  if (activityChart.value) {
    const sortedPosts = [...postStore.posts]
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      .slice(-7)

    activityChartInstance = new Chart(activityChart.value, {
      type: 'line',
      data: {
        labels: sortedPosts.map(p => new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
        datasets: [{
          label: 'Views',
          data: sortedPosts.map(p => p.views || 0),
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleDelete = async (id) => {
  if (confirm('Are you sure you want to delete this post?')) {
    await postStore.deletePost(id)
    // Reinitialize charts after deletion
    if (categoryChartInstance) categoryChartInstance.destroy()
    if (activityChartInstance) activityChartInstance.destroy()
    initCharts()
  }
}
</script>

