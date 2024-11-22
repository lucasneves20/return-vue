<script setup lang='ts'>
import { PhEye, PhEyeClosed } from '@phosphor-icons/vue';
import { ref } from 'vue';

const passwordOrText = ref(false)
</script>

<template>
  <div class="mt-4">
    <span class="my-1 flex w-full items-center justify-between rounded-lg bg-foreground/10 p-2 px-4">
      <div>Nome:</div>
      <div class="w-1/2">
        <div class="transition-colors ease-in-out hover:text-foreground/80">Lucas Neves</div>
      </div>
    </span>

    <span class="my-1 flex w-full items-center justify-between rounded-lg bg-foreground/10 p-2 px-4">
      <div>E-mail:</div>
      <div class="w-1/2">
        <a
          href="mailto:lucasnm.sampaio@outlook.com"
          class="transition-colors ease-in-out hover:text-foreground/80"
        >lucasnm.sampaio@outlook.com</a>
      </div>
    </span>

    <span class="my-1 flex w-full items-center justify-between rounded-lg bg-foreground/10 p-2 px-4">
      <div>Senha:</div>
      <div class="flex w-1/2">
        <input
          class="cursor-default bg-transparent outline-none transition-colors ease-in-out hover:text-foreground/80"
          value="123456"
          :type="passwordOrText ? 'text' : 'password'"
          disabled
        >
        <Button
          size="icon"
          class="size-6"
          variant="ghost"
          @click="() => passwordOrText = !passwordOrText"
        >
          <PhEye
            v-if="passwordOrText"
            size="20"
          />
          <PhEyeClosed
            v-else
            size="20"
          />
        </Button>
      </div>
    </span>
  </div>
</template>
