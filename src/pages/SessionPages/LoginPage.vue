<script setup lang="ts">
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/Input.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/axios';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { AxiosResponse } from 'axios';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { updateLocal: updateLocalToken } = useLocalStorage('user:token')
const { updateLocal: updateLocalUser } = useLocalStorage('user:id')

interface UserResponse {
  token: string
  userId: string
}

const user = reactive({
  email: '',
  password: '',
})
const router = useRouter();
const loading = ref(false)
const {toast} = useToast()

function handleLogin(event: Event) {
  event.preventDefault()

  // em desenvolvimento ele adiciona automaticamente um token ao apertar
  updateLocalToken("qualquer coisa")
  window.location.reload()

  if (!user.email || !user.password) {
    toast({
      title: "Atenção!",
      description: "Email ou senha estão vazios, preencha com dados"
    })
  }

  api.post('/login', user).then(({data}: AxiosResponse<UserResponse>) => {
    updateLocalToken(data.token)
    updateLocalUser(data.userId)
    router.push('/')
  })
}
</script>

<template>
  <div>
    <form
      class="flex w-80 flex-col gap-4 rounded-lg bg-zinc-100 p-4"
      @submit="handleLogin"
    >
      <div class="flex justify-center">
        <h2 class="text-2xl">
          Login
        </h2>
      </div>

      <div>
        <label>Email</label>
        <Input v-model="user.email" />
      </div>

      <div>
        <label>Senha</label>
        <Input
          v-model="user.password"
          type="password"
        />
      </div>

      <div class="flex justify-end">
        <Button
          type="submit"
          class="max-w-20"
          :disabled="loading"
        >
          <span v-if="!loading">Acessar</span>
          <PhCircleNotch
            v-if="loading"
            :size="32"
          />
        </Button>
      </div>
    </form>
  </div>
</template>
