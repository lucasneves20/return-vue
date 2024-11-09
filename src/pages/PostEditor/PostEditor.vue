<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';

const markdownContent = ref('')
</script>

<template>
  <div class="h-screen overflow-hidden text-2xl">
    <div
      class="mt-40 flex flex-col items-center justify-center"
    >
      <div class="flex w-3/4 flex-col gap-4 rounded-lg bg-zinc-50 p-4">
        <h1>Crie seu post</h1>

        <md-editor
          v-model="markdownContent"
          language="pt-BR"
        />

        <Button
          class=""
          @click="console.log('salvo (se mentira)')"
        >
          Postar Conteúdo
        </Button>
      </div>
    </div>
  </div>
</template>
