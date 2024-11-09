<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Login from './LoginPage.vue';
import Signin from './SigninPage.vue';
</script>

<template>
  <Tabs
    default-value="login"
    class="flex h-screen flex-col items-center justify-center"
  >
    <TabsList>
      <TabsTrigger value="login">
        Login
      </TabsTrigger>
      <TabsTrigger value="signin">
        Cadastrar
      </TabsTrigger>
    </TabsList>
    <TabsContent value="login">
      <Login />
    </TabsContent>
    <TabsContent value="signin">
      <Signin />
    </TabsContent>
  </Tabs>
</template>
