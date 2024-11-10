<script setup lang="ts">
import rootLayout from '@/components/layout/rootLayou.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <root-layout>
    <router-view />
    <Toaster />
  </root-layout>
</template>
