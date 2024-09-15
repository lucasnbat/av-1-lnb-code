<template>
  <v-container>
    <div class="text-center">
      <h1>{{ isEditing ? 'Editar evento' : 'Criar evento' }}</h1>
      <NewEventFormComponent
        @submit="saveEvent"
        :event="refReactiveVariableEvent"
      />
    </div>
  </v-container>
</template>

<script setup>
import NewEventFormComponent from '@/components/NewEventFormComponent.vue';

import { ref, computed, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// pegar dados da rota
const route = useRoute();

// hook de redirecionamento
const router = useRouter();

// armazena o evento em variavel reativa
const refReactiveVariableEvent = ref({});

// se houver algo de id na rota, atualiza a isEditing para true
const isEditing = computed(() => !!route.params.id);

const loadEventsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('eventsKey') || '[]');
};

// carregar dados em caso de estar editando algo
watchEffect(() => {
  if (isEditing.value) {
    const eventsFromLocalStorage = loadEventsFromLocalStorage();
    const existingEvent = eventsFromLocalStorage.find(
      (ev) => ev.id === route.params.id
    );
    if (existingEvent) {
      refReactiveVariableEvent.value = existingEvent;
    }
  }
});

const saveEvent = (eventData) => {
  const eventsFromLocalStorage = loadEventsFromLocalStorage();

  if (isEditing.value) {
    // se estiver editando...
    const indexOfExistingEvent = eventsFromLocalStorage.findIndex(
      (ev) => ev.id === route.params.id
    );
    eventsFromLocalStorage[indexOfExistingEvent] = eventData;
  } else {
    // se estiver criando...
    eventData.id = crypto.randomUUID(); // gerar uuid() para identificar evento
    eventsFromLocalStorage.push(eventData);
  }

  localStorage.setItem('eventsKey', JSON.stringify(eventsFromLocalStorage));

  // usa o router/redirecionador para voltar a tela index
  router.push('/');
};
</script>
