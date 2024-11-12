<script setup lang="ts">
export interface CommentProps {
  id: string;
  comment: string
  postId: number
}

const comment = defineProps(['comment'])
</script>

<template>
  <div class="">
    {{ (comment as CommentProps).comment }}
  </div>
</template>
