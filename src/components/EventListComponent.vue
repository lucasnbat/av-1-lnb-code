<template>
  <v-container>
    <v-card v-for="event in events" :key="event.id" class="mb-4">
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-subtitle>{{ event.date }}</v-card-subtitle>

      <v-card-text>
        <p>{{ event.description }}</p>
      </v-card-text>

      <v-card-actions>
        <!-- Botão para excluir o evento -->
        <v-btn @click="$emit('delete-event', event.id)" color="red">Excluir</v-btn>
        <!-- Botão para redirecionar para a página de detalhes -->
        <v-btn :to="'/EventInstancePage/' + event.id">Detalhes</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
defineProps(['events'])
</script>
