<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import CardContent from '@/components/ui/card/CardContent.vue';
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue';
import { onMounted, ref } from 'vue';
import { getMarkdown } from './getMarkdown';


const markdown = ref()
const loadingMarkdown = ref(false)
const toggleContent = ref(false)


onMounted(() => { getMarkdown(markdown, loadingMarkdown) })
</script>

<template>
  <main class="flex h-full flex-col items-center justify-center">
    <Card class="relative my-20 w-3/4">
      <header class="flex items-center justify-between p-6 pb-0">
        <div>
          <div class="text-3xl font-semibold">
            Post
          </div>
          <span>feito a 04/04/2020</span>
        </div>
        <span class="mr-4">
          <Button
            size="icon"
            variant="ghost"
            @click="toggleContent = !toggleContent"
          >
            <PhCaretUp
              v-if="toggleContent"
              :size="32"
            />
            <PhCaretDown
              v-else
              :size="32"
            />
          </Button>
        </span>
      </header>
      <CardContent>
        <div v-if="loadingMarkdown">
          Carregando...
        </div>
        <span
          v-else
          class="markdown-body"
          v-html="markdown"
        />
      </CardContent>
    </Card>
  </main>
</template>

<style scoped src="./markdown.css"></style>
