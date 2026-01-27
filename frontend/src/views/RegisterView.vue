<script setup lang="ts">
import { ref } from 'vue'
import { KeySquare } from 'lucide-vue-next';
import * as v from 'valibot'
import { useAuthStore } from '../stores/auth.store';

const { register } = useAuthStore()
const registerSchema = v.object({
  name: v.pipe(v.string(), v.minLength(2, 'Le nom doit contenir au moins 2 caractères')),
  email: v.pipe(v.string(), v.email('Adresse email invalide')),
  password: v.pipe(v.string(), v.minLength(8, 'Le mot de passe doit contenir au moins 8 caractères')),
})

type RegisterForm = v.InferOutput<typeof registerSchema>

const form = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
})

const errors = ref<Partial<Record<keyof RegisterForm, string>>>({})
const isSubmitting = ref(false)

const handleSubmit = async (event: Event) => {
  event.preventDefault()
  errors.value = {}

  const result = v.safeParse(registerSchema, form.value)

  if (!result.success) {
    for (const issue of result.issues) {
      const field = issue.path?.[0]?.key as keyof RegisterForm | undefined
      if (field && !errors.value[field]) {
        errors.value[field] = issue.message
      }
    }
    return
  }

  isSubmitting.value = true
  try {
    register(result.output)
  } catch (error) {
    console.error('Registration error:', error)
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
        Créez votre compte
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >Nom complet</label
          >
          <div class="mt-2">
            <input
              id="name"
              v-model="form.name"
              type="text"
              name="name"
              autocomplete="name"
              :class="[
                'block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500',
                errors.name
                  ? 'outline-red-500 focus:outline-red-600 dark:outline-red-500 dark:focus:outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600 dark:focus:outline-indigo-500',
              ]"
            />
          </div>
          <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
            {{ errors.name }}
          </p>
        </div>

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
          <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100"
            >Mot de passe</label
          >
          <div class="mt-2">
            <input
              id="password"
              v-model="form.password"
              type="password"
              name="password"
              autocomplete="new-password"
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
            {{ isSubmitting ? 'Inscription en cours...' : "S'inscrire" }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
        Vous avez déjà un compte?
        <RouterLink
          to="/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >Connectez vous
        </RouterLink>
      </p>
    </div>
  </div>
</template>
