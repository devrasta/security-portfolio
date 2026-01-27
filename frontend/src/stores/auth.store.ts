import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/services/api/auth.api'
import { type RegisterCredentials, type LoginCredentials } from '@/services/api/auth.api'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const user = ref<{ id: string; email: string } | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!accessToken.value)

  async function login(loginCredentials: LoginCredentials) {
    const response = await authApi.login(loginCredentials)

    accessToken.value = response.accessToken

    return;
  }

  function register(userToCreate: RegisterCredentials) {
    return authApi.register(userToCreate)
  }

  async function logout() {
    await authApi.logout(accessToken.value as string)
    accessToken.value = null
    user.value = null
  }

  return { isAuthenticated, register, user, login, logout }
})
