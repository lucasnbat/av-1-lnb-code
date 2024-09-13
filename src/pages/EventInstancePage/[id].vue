<template>
  <v-container>
    <v-card>
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-subtitle>{{ event.description }}</v-card-subtitle>

      <v-card-text v-if="event.guests && event.guests.length">Convidados</v-card-text>
      <v-list v-if="event.guests && event.guests.length">
        <v-list-item v-for="guest in event.guests" :key="guest">
          <v-list-item-content>
            {{ guest }}
          </v-list-item-content>

        </v-list-item>
      </v-list>
      <v-list-item v-else>Nenhum convidado adicionado.</v-list-item >
    </v-card>

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

  console.log(route.params)
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
