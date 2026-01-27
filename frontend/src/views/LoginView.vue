<script setup lang="ts">
import { ref } from 'vue'
import { KeySquare } from 'lucide-vue-next';
import * as v from 'valibot'
import { useSeoMeta } from '@unhead/vue'

useSeoMeta({
  title: 'Connexion',
  description: 'Page de connexion au tableau de bord',
})
const loginSchema = v.object({
  email: v.pipe(v.string(), v.email('Adresse email invalide')),
  password: v.pipe(v.string(), v.minLength(1, 'Le mot de passe est requis')),
})

type LoginForm = v.InferOutput<typeof loginSchema>

const form = ref<LoginForm>({
  email: '',
  password: '',
})

const errors = ref<Partial<Record<keyof LoginForm, string>>>({})
const isSubmitting = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  errors.value = {}

  const result = v.safeParse(loginSchema, form.value)

  if (!result.success) {
    const fieldErrors = v.flatten(result.issues).nested
    errors.value = {
      email: fieldErrors?.email?.[0],
      password: fieldErrors?.password?.[0],
    }
    return
  }

  isSubmitting.value = true
  try {
    // TODO: Call API to login user
    console.log('Valid data:', result.output)
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 mt-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm flex items-center flex-col">
      <KeySquare :size="40" />
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Connectez vous au tableau de bord
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >Addresse email</label
          >
          <div class="mt-2">
            <input
              id="email"
              v-model="form.email"
              type="email"
              name="email"
              autocomplete="email"
              :class="[
                'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500',
                errors.email
                  ? 'outline-red-500 focus:outline-red-600 dark:outline-red-500 dark:focus:outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600 dark:focus:outline-indigo-500',
              ]"
            />
          </div>
          <p v-if="errors.email" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
              >Mot de passe</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="form.password"
              type="password"
              name="password"
              autocomplete="current-password"
              :class="[
                'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500',
                errors.password
                  ? 'outline-red-500 focus:outline-red-600 dark:outline-red-500 dark:focus:outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600 dark:focus:outline-indigo-500',
              ]"
            />
          </div>
          <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.password }}
          </p>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isSubmitting"
            :class="[
              'flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2',
              isSubmitting
                ? 'bg-indigo-400 cursor-not-allowed dark:bg-indigo-600'
                : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500',
            ]"
          >
            {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
        Pas encore de compte?
        <RouterLink
          to="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >Inscrivez vous
        </RouterLink>
      </p>
    </div>
  </div>
</template>
