<template>
  <v-container>
    <v-card>
      <v-card-title>{{ event.name }}</v-card-title>
      <!--Botão mostrar/ocultar-->

      <v-card-subtitle>Descrição: {{ event.description }}</v-card-subtitle>
      <v-card-subtitle>Data: {{ event.date }}</v-card-subtitle>
      <v-card-subtitle>Local: {{ event.location }}</v-card-subtitle>

      <v-card-actions>
        <v-btn
          variant="outlined"
          color="secondary"
          @click="toggleGuests"
          style="display: flex; margin-left: 0.5rem"
        >
          {{ showGuests ? 'Ocultar' : 'Mostrar' }} Convidados
        </v-btn>
      </v-card-actions>

      <v-card-text
        v-show="event.guests && event.guests.length && showGuests"
        style="display: flex; font-size: larger; font-weight: bold"
      >
        Convidados
      </v-card-text>
      <v-list
        v-show="event.guests && event.guests.length && showGuests"
        style="display: flex; flex-direction: column; justify-content: center"
      >
        <v-list-item v-for="guest in event.guests" :key="guest">
          <v-list-item-content>
            <v-icon left>mdi-account-outline</v-icon>
            {{ guest }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item v-show="!event.guests || !event.guests.length"
        >Nenhum convidado adicionado.</v-list-item
      >
      <v-card-actions>
        <v-btn
          variant="elevated"
          color="blue"
          :to="'/'"
          style="margin-left: 0.5rem"
          >Voltar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const event = ref({});
const showGuests = ref(false);

const toggleGuests = () => {
  showGuests.value = !showGuests.value;
};

const loadEventInstance = () => {
  // vetor de objetos
  const events = JSON.parse(localStorage.getItem('eventsKey') || '[]');

  console.log(route.params);
  // busca o id do evento na url
  const eventInstanceId = route.params.id;

  // percorre todos os objetos e captura o objeto referente ao evento
  const foundEventInstance = events.find((ev) => ev.id === eventInstanceId);

  // se encontrou, atualiza o valor da event com esse objeto
  // e vamos mostrar as info. dele no template
  if (foundEventInstance) {
    event.value = foundEventInstance;
    guests: foundEventInstance.guests || []; // garantir que guests exista
  }
};

onMounted(loadEventInstance);
</script>
