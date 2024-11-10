<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import router from '@/router';
import { ref } from 'vue';
/* import { parseMarkdown } from './getMarkdown'; */


/* const markdown = ref() */
const loadingMarkdown = ref(false)



/* onMounted(() => { parseMarkdown(markdown, loadingMarkdown) }) */
</script>

<template>
  <div
    class="flex h-full flex-col items-center justify-center"
  >
    <Card
      class="relative my-20 w-3/4 cursor-pointer"
      @click="router.push('/post/123')"
    >
      <header class="flex items-center justify-between p-6 pb-0">
        <div>
          <h1 class="text-3xl font-semibold">
            Post
          </h1>
          <h3>feito a {{ new Date().toLocaleDateString("pt-BR") }}</h3>
        </div>
      </header>
      <CardContent>
        <div v-if="loadingMarkdown">
          Carregando...
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style src="./markdown.css"></style>
