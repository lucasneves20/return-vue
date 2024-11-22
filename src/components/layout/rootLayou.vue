<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';
import Session from '@/pages/SessionPages/SessionPage.vue';
import router from '@/router';
import { useColorMode } from '@vueuse/core';
import { ref } from 'vue';
import { Button } from '../ui/button';

const { storageValue, updateLocal } = useLocalStorage("user:token")

function LogoutHandler() {
  updateLocal(null)
  window.location.reload()
}
const userId = localStorage.getItem('user:id')
const isLogged = storageValue.value !== null

const ThemeToggle = ref<"light" | "dark">("light")
const ThemeProvider = useColorMode({ disableTransition: false })

function ThemeToggleHander() {
  ThemeToggle.value = ThemeToggle.value === "light" ? "dark" : "light"
  ThemeProvider.value = ThemeToggle.value
}
</script>

<template>
  <div class="overflow-x-hidden">
    <header
      v-if="isLogged"
      class="fixed z-30 flex w-screen flex-1 items-center justify-between gap-2 border-b border-foreground/30 bg-background/70 p-2 px-4 pr-10 backdrop-blur"
    >
      <h1 class="text-xl font-semibold tracking-widest">
        SNW
      </h1>

      <div class="flex items-center gap-4">
        <Button
          @click="router.push('/editor-post')"
        >
          Criar um Post
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger class="flex items-center justify-center">
            <Avatar>
              <AvatarImage
                src="https://github.com/radix-vue.png"
                alt="@radix-vue"
              />
              <AvatarFallback>Avatar</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="mr-2">
            <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              class="cursor-pointer"
              @click="() => router.push(`/perfil/${userId}`)"
            >
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem
              @click="ThemeToggleHander"
            >
              Theme {{ ThemeToggle }}
            </DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem @click="LogoutHandler()">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>

    <main class="z-0 h-full pt-10">
      <slot v-if="isLogged" />
      <Session v-else />
    </main>
  </div>
</template>
