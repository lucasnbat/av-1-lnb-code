<template>
  <v-container>
    <h1>{{ event.name }}</h1>
    <p>{{ event.description }}</p>

    <h2 v-if="event.guests.length">Convidados</h2>
    <ul v-if="event.guests.length">
      <li v-for="guest in event.guests" :key="guest">{{ guest }}</li>
    </ul>
    <p v-else>Nenhum convidado adicionado.</p>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const event = ref({})

const loadEventInstance = () => {
  // vetor de objetos
  const events = JSON.parse(localStorage.getItem('eventsKey') || '[]')

  // busca o id do evento na url
  const eventInstanceId = route.params.id

  // percorre todos os objetos e captura o objeto referente ao evento
  const foundEventInstance = events.find((ev) => ev.id === eventInstanceId)

  // se encontrou, atualiza o valor da event com esse objeto
  // e vamos mostrar as info. dele no template
  if (foundEventInstance) {
    event.value = foundEventInstance
    guests: foundEventInstance.guests || [] // garantir que guests exista
  }
}

onMounted(loadEventInstance)

</script>
