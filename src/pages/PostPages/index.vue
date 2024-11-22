<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import Dialog from '@/components/ui/dialog/Dialog.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import { api } from '@/lib/axios';
import router from '@/router';
import { onMounted, ref } from 'vue';
import type { CommentProps } from './comment';
import CommentDialog from './CommentDialog.vue';

interface Post {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  comments: CommentProps[];
  content: string;
  title: string;
  user_id: number;
  isExpanded: boolean;
  commentPre: string
}


const loadingPosts = ref(false)
const posts = ref<Post[]>()

onMounted(() => {
  api.get<Post[]>("post/getAllPosts").then((response) => {
    loadingPosts.value = true
    posts.value = response.data.map(post => {
      return {...post, isExpanded: false}
    })
    loadingPosts.value = false
    console.log(posts.value[0].comments)
  })

})
</script>

<template>
  <div class="flex justify-center">
    <div class="ml-4 flex w-3/4 flex-col lg:w-1/2">
      <div
        v-for="post of posts"
        :key="`post-${post.ID}`"
        class="flex flex-col items-center justify-center"
      >
        <Card
          class="relative mb-5 mt-14 w-full"
        >
          <div class="flex items-center justify-between p-6">
            <div
              class="mr-10 w-full cursor-pointer rounded-lg p-2 transition-colors ease-in-out hover:bg-foreground/30"
              @click="router.push(`/post/${post.ID}`)"
            >
              <h1 class="text-3xl font-semibold">
                {{ post.title }}
              </h1>
              <h3>postado no dia {{ new Date(post.CreatedAt).toLocaleDateString("pt-BR") }}</h3>
            </div>
            <div>
              <Button
                v-if="post.comments.length !== 0"
                variant="outline"
                @click="post.isExpanded = !post.isExpanded"
              >
                comentários
              </Button>
              <div v-else>
                Nenhum comentário
              </div>
            </div>
          </div>

          <div
            v-if="post.isExpanded && post.comments.length !== 0"
            class="ml-6"
          >
            <div
              v-for="postComment of post.comments"
              :key="postComment.ID"
            >
              <div>
                {{ postComment.content }} -
                <span class="text-foreground/40">feito no dia: {{ new Date(postComment.CreatedAt).toLocaleDateString("pt-BR") }} as {{
                  new Date(postComment.CreatedAt).toLocaleTimeString("pt-BR")
                }}</span>
              </div>
            </div>
          </div>

          <div class="mt-2 flex gap-2 px-6 pb-4">
            <Dialog>
              <DialogTrigger>
                <Button>
                  Envie um comentário
                </Button>
              </DialogTrigger>
              <CommentDialog :post-id="post.ID" />
            </Dialog>
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
