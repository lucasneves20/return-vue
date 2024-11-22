<script setup lang='ts'>
import Button from '@/components/ui/button/Button.vue';
import router from '@/router';
import { ref } from 'vue';
import PerfilContent from './PerfilContent.vue';
import PerfilEditor from './PerfilEditor.vue';

// const { name, email, password } = api

const toggleEdit = ref(true)

</script>

<template>
  <div class="mt-20 flex items-center justify-center">
    <div class="flex w-1/2 flex-col justify-center rounded-lg bg-foreground/10  p-4">
      <div class="flex w-full items-center justify-between">
        <h2 class="text-2xl font-semibold">
          Meu Perfil
        </h2>

        <div class="flex gap-2">
          <Button @click="() => toggleEdit = !toggleEdit">
            {{ !toggleEdit ? "Editar" : "Vizualisar" }}
          </Button>
          <Button @click="() => router.push('/')">
            Voltar
          </Button>
        </div>
      </div>

      <PerfilContent v-if="!toggleEdit" />
      <PerfilEditor v-else />
    </div>
  </div>
</template>
