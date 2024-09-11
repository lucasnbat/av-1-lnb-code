<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawerToggle = !drawerToggle"></v-app-bar-nav-icon>
      <v-app-bar-title>Eventfy - Gerencie seus eventos</v-app-bar-title>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerToggle">
      <v-list>
        <v-list-item to="/">
          <v-list-item-title>Início</v-list-item-title>
        </v-list-item>
        <v-list-item to="/NewEventPage">
          <v-list-item-title>Novo evento</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
const drawerToggle = ref(false)
</script>
