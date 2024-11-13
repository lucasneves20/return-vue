<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Input from '@/components/ui/input/Input.vue';
import { api } from '@/lib/axios';
import router from '@/router';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const markdown = reactive({
  title: '',
  content: ''
})
const loading = ref(false)

onMounted(() => {
  if(route.params.postId) {
    api.get(`/post/${route.params.postId}`).then(response => {
      console.log(response.data)
      markdown.title = response.data.title
      markdown.content = response.data.content
    })
  }
})

function mutatePostHanlder() {
  const content = {
    title: markdown.title,
    content: markdown.content,
    user_id: Number(localStorage.getItem("user:id"))
  }

  if(route.params.postId) {
    api.put(`/post/${route.params.postId}`, content).then(() => {
      router.push("/")
    })
  } else {
    api.post('/post', content).then(() => {
      router.push("/")
    })
  }
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
            v-model="markdown.title"
            placeholder="Título do Post"
            class="max-w-96 bg-zinc-50 p-2"
          />
        </div>

        <md-editor
          v-model="markdown.content"
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
