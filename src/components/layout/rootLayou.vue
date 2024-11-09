<script setup lang="ts">
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import Session from '@/pages/SessionPages/SessionPage.vue';
import { Button } from '../ui/button';

const { storageValue, updateLocal: LogoutHandler } = useLocalStorage("user:token")

const isLogged = storageValue.value !== null
</script>

<template>
  <div class="overflow-hidden bg-zinc-200">
    <header
      v-if="isLogged"
      class="fixed z-30 flex w-screen flex-1 items-center justify-between gap-2 border-b border-zinc-800/30 bg-zinc-200/70 p-2 px-4 pr-10 backdrop-blur"
    >
      <h1>logo</h1>

      <div class="flex gap-4">
        <Button @click="LogoutHandler(null)">
          Logout
        </Button>
      </div>
    </header>

    <main class="z-0 h-full">
      <slot v-if="isLogged" />
      <Session v-else />
    </main>
  </div>
</template>
