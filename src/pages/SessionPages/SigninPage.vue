<script setup lang="ts">
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/Input.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/axios';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import type { AxiosResponse } from 'axios';
import { reactive, ref } from 'vue';

const { updateLocal: updateLocalToken } = useLocalStorage('user:token')
const { updateLocal: updateLocalUser } = useLocalStorage('user:id')

interface UserResponse {
  token: string
  userId: string
}

const user = reactive({
  name: '',
  email: '',
  password: '',
})
const loading = ref(false)
const {toast} = useToast()

function handleLogin(event: Event) {
  event.preventDefault()

  if (!user.email || !user.password) {
    // TODO consertar toast que não funciona de forma correta
    toast({
      title: "Atenção!",
      description: "Os campos de cadastro estão vazios, preencha com todos"
    })
  }

  api.post('/register', user).then(({data}: AxiosResponse<UserResponse>) => {
    updateLocalToken(data.token)
    updateLocalUser(data.userId)
    window.location.reload()
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
          Cadastro
        </h2>
      </div>

      <div>
        <label>Nome</label>
        <Input v-model="user.name" />
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
          <span v-if="!loading">Cadastrar</span>
          <PhCircleNotch
            v-if="loading"
            :size="32"
          />
        </Button>
      </div>
    </form>
  </div>
  <Toaster />
</template>
