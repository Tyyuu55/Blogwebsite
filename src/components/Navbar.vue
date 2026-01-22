<template>
  <nav class="sticky top-0 z-50 bg-card shadow-md">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-primary">BlogCMS</span>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="nav-link"
            active-class="text-primary font-semibold"
          >
            Home
          </router-link>
          
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/admin"
              class="nav-link"
              active-class="text-primary font-semibold"
            >
              Dashboard
            </router-link>
            <router-link
              to="/profile"
              class="nav-link"
              active-class="text-primary font-semibold"
            >
              Profile
            </router-link>
            <button @click="handleLogout" class="btn-outline">
              Logout
            </button>
          </template>
          
          <template v-else>
            <router-link to="/login" class="nav-link">Login</router-link>
            <router-link to="/register" class="btn-primary">
              Sign Up
            </router-link>
          </template>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition name="slide">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t">
          <div class="flex flex-col space-y-3">
            <router-link
              to="/"
              @click="mobileMenuOpen = false"
              class="nav-link"
              active-class="text-primary font-semibold"
            >
              Home
            </router-link>
            
            <template v-if="authStore.isAuthenticated">
              <router-link
                to="/admin"
                @click="mobileMenuOpen = false"
                class="nav-link"
                active-class="text-primary font-semibold"
              >
                Dashboard
              </router-link>
              <router-link
                to="/profile"
                @click="mobileMenuOpen = false"
                class="nav-link"
                active-class="text-primary font-semibold"
              >
                Profile
              </router-link>
              <button @click="handleLogout" class="btn-outline text-left">
                Logout
              </button>
            </template>
            
            <template v-else>
              <router-link
                to="/login"
                @click="mobileMenuOpen = false"
                class="nav-link"
              >
                Login
              </router-link>
              <router-link
                to="/register"
                @click="mobileMenuOpen = false"
                class="btn-primary text-center"
              >
                Sign Up
              </router-link>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  @apply text-muted hover:text-primary transition-colors duration-300 font-medium;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

