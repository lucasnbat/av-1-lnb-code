<template>
  <v-container>
    <v-card class="mx-auto" max-width="650">
      <v-card-title>Novo evento</v-card-title>
      <v-spacer />
      <v-card-text>
        <v-form>
          <!-- Campos básicos requisitados -->
          <v-text-field label="Nome" variant="outlined" required />
          <v-text-field label="Data" variant="outlined" required />
          <v-text-field label="Local" variant="outlined" required />
          <v-text-field label="Descrição" variant="outlined" />

          <v-text-field label="Adicionar/Editar convidado" />

          <!-- Lista de convidados -->
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Nome do convidado aqui</v-list-item-title>
              </v-list-item-content>

              <!-- Pencil para editar -->
              <v-btn>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <!-- Pencil para deletar -->
              <v-btn>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn type="submit" color="error">Cancelar</v-btn>
            <v-spacer />
            <v-btn type="submit" color="primary">Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>

<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps(['event'])
const emit = defineEmits(['submit'])

// dados do form
const dataEventOnForm = reactive({
  // copia tudo que já está nas props do evento
  ...props.event,
  // adiciona atributo que guarda lista convidados
  // para cada evento e disponibiliza na chave guests
  guests: props.event.guests || []
})

const newGuest = ref('') // novo convidado
const guestOnEditing = ref(null) // convidado que está sendo editado

// observa a chave que guarda os convidados e atauliza dataEventOnForm(objeto com eventos e convidados)
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
  newGuest.value = dataEventOnForm.guest[index] // preenche campo com convidado selecionado
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
