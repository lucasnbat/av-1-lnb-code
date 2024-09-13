<template>
  <v-container>
    <v-card v-for="event in events" :key="event.id" class="mb-4">
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-subtitle>Agendado para: {{ event.date }}</v-card-subtitle>

      <v-card-text style="display: flex; flex-direction: column; gap: 1rem;">
        <p>{{ event.description }}</p>
        <p>Local: {{ event.location }}</p>

        <v-card-actions style="display: flex; padding-left: 0rem;">
          <!-- Botão para redirecionar para a página de detalhes -->
          <v-btn variant="elevated" :to="'/EventInstancePage/' + event.id" color="blue">Detalhes</v-btn>
          <!-- Botão para excluir o evento -->
          <v-btn variant="elevated" @click="$emit('delete-event', event.id)" color="red">Excluir</v-btn>
        </v-card-actions>
      </v-card-text>

    </v-card>
  </v-container>
</template>

<script setup>
defineProps(['events'])
</script>
