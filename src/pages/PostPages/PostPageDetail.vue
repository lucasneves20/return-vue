<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import { api } from '@/lib/axios';
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { parseMarkdown } from './parseMarkdown';


const markdown = ref()
const loadingMarkdown = ref(false)

const route = useRoute()
const userIdLocal = localStorage.getItem('user:id')
const isOwnerUser = ref(false)

onMounted(() => {
  parseMarkdown(markdown, loadingMarkdown)

  if(route.params.id) {
    api.get(`/post/${route.params.id}`).then(response => {

      if(userIdLocal === response.data.user_id) {
        isOwnerUser.value = true
      }
    })
  }
})
</script>

<template>
  <main class="flex h-full flex-col items-center justify-center">
    <Card class="relative my-20 w-3/4">
      <header class="flex items-center justify-between p-6 pb-0">
        <div class="flex w-full justify-between">
          <div>
            <h1 class="text-3xl font-semibold">
              Post
            </h1>
            <h3>
              feito a {{ new Date().toLocaleDateString('pt-BR') }}
              <span class="ml-2 text-zinc-900/50">post id {{ $route.params.id }}</span>
            </h3>
          </div>

          <div class="flex gap-2">
            <Button @click="router.push('/')">
              Voltar
            </Button>

            <Button
              v-if="isOwnerUser"
              @click="router.push(`/editor-post/${userIdLocal}`)"
            >
              Editar Post
            </Button>
          </div>
        </div>
      </header>
      <CardContent>
        <div v-if="loadingMarkdown">
          Carregando...
        </div>
        <div
          v-else
          class="markdown-body"
          v-html="markdown"
        />
      </CardContent>

      <!-- Comments TODO -->
      <!-- <div>

      </div> -->
    </Card>
  </main>
</template>

<style src="./markdown.css"></style>

