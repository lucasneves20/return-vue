<script setup lang="ts">
import rootLayout from '@/components/layout/rootLayou.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <root-layout>
    <router-view />
  </root-layout>
</template>
