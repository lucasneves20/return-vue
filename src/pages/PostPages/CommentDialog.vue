<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import Input from '@/components/ui/input/Input.vue';
import { api } from '@/lib/axios';
import { ref } from 'vue';

const {postId} = defineProps(['postId'])
const commentInput = ref('')

function commentHandler(postId: number) {
  api.post("comment", {
    content: commentInput.value,
    user_id: Number(localStorage.getItem('user:id')),
    post_id: postId
  }).then(() => { window.location.reload() })
}


</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Fazer um comentário</DialogTitle>
    </DialogHeader>

    <Input
      v-model="commentInput"
      placeholder="comente algo !!!"
    />

    <DialogFooter>
      <Button @click="commentHandler(postId)">
        Enviar Comentário
      </Button>
    </DialogFooter>
  </DialogContent>
</template>
