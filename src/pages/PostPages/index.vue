<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import { api } from '@/lib/axios';
import router from '@/router';
import { onMounted, ref } from 'vue';
import Comment, { CommentProps } from './Comment.vue';

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  CreatedAt: string
  isExpanded: boolean
  comments: CommentProps[]
}


const loadingPosts = ref(false)
const posts = ref<Post[]>()

onMounted(() => {
  api.get<Post[]>("/post/getAllPosts").then((response) => {
    loadingPosts.value = true
    posts.value = response.data
    loadingPosts.value = false
  })
})

</script>

<template>
  <div class="flex justify-center border">
    <div class="ml-4 flex w-3/4 flex-col border lg:w-1/2">
      <div
        v-for="post of posts"
        :key="`post-${post.id}`"
        class="flex flex-col items-center justify-center"
      >
        <Card
          class="relative mb-5 mt-14 w-full"
        >
          <div class="flex items-center justify-between p-6">
            <div
              class="mr-10 w-full cursor-pointer rounded-lg p-2 transition-colors ease-in-out hover:bg-zinc-300"
              @click="router.push(`/post/${post.id}`)"
            >
              <h1 class="text-3xl font-semibold">
                {{ post.title }}
              </h1>
              <h3>postado no dia {{ new Date(post.CreatedAt).toLocaleDateString("pt-BR") }}</h3>
            </div>
            <div>
              <Button
                variant="outline"
                @click="post.isExpanded = !post.isExpanded"
              >
                comentários
              </Button>
            </div>
          </div>
          <div
            v-if="post.isExpanded"
            class="ml-6 h-10"
          >
            <div
              v-for="comment of post.comments"
              :key="comment.id"
            >
              <Comment :comment="comment" />
            </div>
          </div>
        </Card>
      </div>
    </div>

    <div class="ml-4 mt-14">
      <Card
        v-if="posts"
        class="size-40 p-4"
      >
        total de posts: {{ posts.length }}
        total de curtidas: {{ Math.floor(Math.random() * 10000) }}
      </Card>
    </div>
  </div>
</template>

<style src="./markdown.css"></style>
