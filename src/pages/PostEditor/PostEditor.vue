<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import { api } from '@/lib/axios';
import router from '@/router';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { parseMarkdown } from '../PostPages/parseMarkdown';

const route = useRoute()
const markdownContent = ref('')
const markdownMetadata = ref()
const loading = ref(false)

onMounted(() => {
  if(route.params.id) {
    api.get(`/post/${route.params.id}`).then(response => {
      markdownMetadata.value = response.data
      markdownContent.value = markdownMetadata.value.content
    })
  }
})

function mutatePostHanlder() {
  const markdown = parseMarkdown(markdownContent.value, loading.value)
  if(route.params.id) {
    api.post('/post', markdown)
  } else {
    api.put(`/post/${markdownMetadata.value.user_id}`, markdown)
  }
}
</script>

<template>
  <div class="h-screen overflow-hidden text-2xl">
    <div
      class="mt-40 flex flex-col items-center justify-center"
    >
      <div class="flex w-3/4 flex-col gap-4 rounded-lg bg-zinc-50 p-4">
        <h2>Crie seu post</h2>

        <md-editor
          v-model="markdownContent"
          language="pt-BR"
        />

        <div class="flex justify-end gap-2">
          <Button
            variant="ghost"
            @click="router.push('/')"
          >
            Voltar para tela inicial
          </Button>

          <Button
            class="w-40"
            @click="mutatePostHanlder()"
          >
            Postar Conteúdo
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
