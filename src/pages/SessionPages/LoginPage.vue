<script setup lang="ts">
import { Button } from '@/components/ui/button';
import Input from '@/components/ui/input/Input.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { useToast } from '@/components/ui/toast/use-toast';
import { api } from '@/lib/axios';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import { reactive, ref } from 'vue';

const { updateLocal: updateLocalToken } = useLocalStorage('user:token')
const { updateLocal: updateLocalUser } = useLocalStorage('user:id')

const user = reactive({
  email: '',
  password: '',
})

const loading = ref(false)
const { toast } = useToast()

function handleLogin(event: Event) {
  event.preventDefault()

  if (!user.email || !user.password) {
    // TODO consertar toast que não funciona de forma correta
    toast({
      title: "Atenção!",
      description: "Email ou senha estão vazios, preencha com dados"
    })
  }

  api.post('/login', user).then((response) => {
    updateLocalToken(response.data.token)
    updateLocalUser(response.data.user_id)
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
  <Toaster />
</template>


Gabriel Alves
11983413392
Moldura quebrada
Carcaça
c/ Carregador

a0afb9744c00648bafb1b90b4aba5bdb86f424f02f9275399ce0c20b93a2c3a8  go1.23.3.linux-amd64.tar.gz
