<script setup lang='ts'>
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { PhEye, PhEyeClosed } from '@phosphor-icons/vue';
import { reactive, ref } from 'vue';

const passwordOrText = ref(true)
const userData = reactive({
  name: "Lucas Neves",
  email: "lucasnm.sampaio@outlook.com",
  password: "123456"
})
</script>

<template>
  <div class="mt-4">
    Editor
    <span class="my-1 flex w-full items-center justify-between rounded-lg bg-foreground/10 p-2 px-4">
      <div>Nome:</div>
      <div class="w-1/2">
        <Input
          v-model="userData.name"
          class="bg-background"
        />
      </div>
    </span>

    <span class="my-1 flex w-full items-center justify-between rounded-lg bg-foreground/10 p-2 px-4">
      <div>E-mail:</div>
      <div class="w-1/2">
        <Input
          v-model="userData.email"
          class="bg-background"
        />
      </div>
    </span>

    <span class="my-1 flex w-full items-center justify-between rounded-lg border bg-foreground/10 p-2">
      <div class="ml-2">Senha:</div>
      <div class="mr-2 flex w-1/2 items-center gap-2">
        <Input
          v-model="userData.password"
          class="bg-background"
          :type="passwordOrText ? 'text' : 'password'"
        />

        <Button
          size="icon"
          class="size-6"
          variant="ghost"
          @click="() => passwordOrText = !passwordOrText"
        >
          <PhEye
            v-if="passwordOrText"
            size="20"
          />
          <PhEyeClosed
            v-else
            size="20"
          />
        </Button>
      </div>
    </span>

    <div class="mt-4 flex justify-end">
      <Button>Salvar Alterações</Button>
    </div>
  </div>
</template>
