<template>
  <v-container>
    <v-card class="mx-auto" max-width="650">
      <v-card-text>
        <v-form @submit.prevent="submit">
          <!-- Campos básicos requisitados -->
          <v-text-field label="Nome" variant="outlined" v-model="dataEventOnForm.name" required />
          <v-text-field label="Data" variant="outlined" v-model="dataEventOnForm.date" required />
          <v-text-field label="Local" variant="outlined" v-model="dataEventOnForm.location" required />
          <v-text-field label="Descrição" variant="outlined" v-model="dataEventOnForm.description" />

          <v-text-field label="Adicionar/Editar convidado"
            :append-icon="guestOnEditing !== null ? 'mdi-check' : 'mdi-plus'" v-model="newGuest"
            @keyup.enter="guestOnEditing !== null ? updateGuest() : addGuest()"
            @click:append="guestOnEditing !== null ? updateGuest() : addGuest()" />

          <!-- Lista de convidados -->
          <v-list>
            <v-list-item v-for="(guest, index) in dataEventOnForm.guests" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ guest }}</v-list-item-title>
              </v-list-item-content>

              <!-- Pencil para editar -->
              <v-btn icon @click="editGuest(index)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!-- Pencil para deletar -->
              <v-btn icon @click="removeGuest(index)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn color="error">Cancelar</v-btn>
            <v-spacer />
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script setup>
import { defineProps, reactive, watch, ref, defineEmits } from 'vue';

// Necessário definir a estrutura do event aqui,
const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      name: '',
      date: '',
      location: '',
      description: '',
      guests: []  // Inicializando a lista de convidados
    })
  }
})
const emit = defineEmits(['submit'])

// dados do form (faço um objeto para isso)
const dataEventOnForm = reactive({
  // copia tudo que já está na estrutura da var props
  ...props.event,
  // define que a chave guests sempre será preenchida com o valor da chave
  // props.event.guests do objeto props ou com um array vazio
  guests: props.event.guests || []
})

const newGuest = ref('') // novo convidado
const guestOnEditing = ref(null) // convidado que está sendo editado

// *observa a chave que guarda os convidados e atauliza dataEventOnForm
// (objeto com detalhes do evento, eventos e convidados)
watch(() => props.event, (newEvent) => {
  Object.assign(dataEventOnForm, newEvent)
})

const addGuest = () => {
  if (newGuest.value.trim()) { //se tiver valor no campo...
    dataEventOnForm.guests.push(newGuest.value.trim()) // add convidado
    newGuest.value = ''; // limpa o campo
  }
}

const editGuest = (index) => {
  newGuest.value = dataEventOnForm.guests[index] // preenche campo com convidado selecionado
  guestOnEditing.value = index // marca quem está sendo editado
}

const updateGuest = () => {
  if (newGuest.value.trim() && guestOnEditing.value !== null) {
    // procura o convidado com index marcado como em edição e atualiza com o valor do campo
    dataEventOnForm.guests[guestOnEditing.value] = newGuest.value.trim()
    newGuest.value = '' // limpa campo
    guestOnEditing = null // agora nenhum guest está sendo editado
  }
}

const removeGuest = (index) => {
  dataEventOnForm.guests.splice(index, 1) // a partir do indice em questão, remove 1
}

const submit = () => {
  emit('submit', dataEventOnForm) // emite os dados do form
}


</script>
