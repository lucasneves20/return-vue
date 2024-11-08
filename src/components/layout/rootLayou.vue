<script setup lang="ts">
import router from '@/router'
import { RouterLink } from 'vue-router'
import { Button } from '../ui/button'

const routes = router.getRoutes()
</script>

<template>
  <div class="h-screen overflow-hidden">
    <header
      class="flex flex-1 items-center justify-between gap-2 bg-zinc-800 p-2 px-4 pr-10 text-zinc-200"
    >
      <h1>logo</h1>

      <div class="flex gap-4">
        <router-link v-for="(route, id) in routes" :key="`route-${id}`" :to="route.path">
          <Button variant="outline">
            {{ route.name }}
          </Button>
        </router-link>
      </div>
    </header>

    <main class="h-full bg-zinc-200 p-4">
      <slot />
    </main>
  </div>
</template>
