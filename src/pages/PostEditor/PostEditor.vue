<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
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
const title = ref()
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
  const content = {title: title.value, content: markdown}

  console.log(content)

  api.post('/post', content)
}
</script>

<template>
  <div class="h-screen overflow-hidden text-2xl">
    <div
      class="mt-40 flex flex-col items-center justify-center md:mt-14"
    >
      <div class="flex w-3/4 flex-col gap-4 rounded-lg bg-zinc-100 p-4">
        <div class="flex gap-4">
          <h2>Crie seu post</h2>
          <Input
            v-model="title"
            placeholder="Título do Post"
            class="max-w-96 bg-zinc-50 p-2"
          />
        </div>

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
