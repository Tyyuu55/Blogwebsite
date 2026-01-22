<template>
  <footer class="bg-secondary text-white mt-auto">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">BlogCMS</h3>
          <p class="text-gray-400">
            A modern blog and content management system built with Vue 3 and Tailwind CSS.
          </p>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/admin" class="text-gray-400 hover:text-white transition-colors">
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link to="/profile" class="text-gray-400 hover:text-white transition-colors">
                Profile
              </router-link>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="text-lg font-semibold mb-4">Connect</h4>
          <p class="text-gray-400">
            Built with ❤️ using Vue 3, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; {{ currentYear }} BlogCMS. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

