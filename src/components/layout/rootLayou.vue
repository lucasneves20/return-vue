<script setup lang="ts">
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import Session from '@/pages/SessionPages/SessionPage.vue';
import router from '@/router';
import { RouterLink } from 'vue-router';
import { Button } from '../ui/button';

const routes = router.getRoutes()
const { storageValue, updateLocal: LogoutHandler } = useLocalStorage("user:token")

const isLogged = storageValue.value !== null
</script>

<template>
  <div class="h-screen overflow-hidden">
    <header
      v-if="isLogged"
      class="flex flex-1 items-center justify-between gap-2 bg-zinc-800 p-2 px-4 pr-10 text-zinc-200"
    >
      <h1>logo</h1>

      <div class="flex gap-4">
        <router-link
          v-for="(route, id) in routes"
          :key="`route-${id}`"
          :to="route.path"
        >
          <Button variant="outline">
            {{ route.name }}
          </Button>
        </router-link>

        <Button @click="LogoutHandler(null)">
          Logout
        </Button>
      </div>
    </header>

    <main class="h-full bg-zinc-200">
      <slot v-if="isLogged" />
      <Session v-else />
    </main>
  </div>
</template>
