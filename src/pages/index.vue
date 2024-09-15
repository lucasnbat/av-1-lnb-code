<template>
  <v-container>
    <h1>Eventos</h1>
    <EventListComponent
      :events="eventListForHome"
      @delete-event="deleteEvent"
    />
  </v-container>
</template>

<script setup lang="ts">
import EventListComponent from '@/components/EventListComponent.vue';

import { ref, onMounted } from 'vue';

const eventListForHome = ref([]);

const loadEventsFromLocalStorage = () => {
  eventListForHome.value = JSON.parse(
    localStorage.getItem('eventsKey') || '[]'
  );
};

// essa função é a que enviaremos para o EventListComponent manipular
// isso é como manipular funções usando zod no react
const deleteEvent = (id) => {
  // gera lista nova ignorando o item a ser deletado
  eventListForHome.value = eventListForHome.value.filter((ev) => ev.id !== id);

  // grava a lista filtrada sobrescrevendo a antiga. efeito de "eliminação"
  localStorage.setItem('eventsKey', JSON.stringify(eventListForHome.value));
};
// carrega eventos cadastrados assim que a tela Home for renderizada
onMounted(loadEventsFromLocalStorage);
</script>
