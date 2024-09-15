<template>
  <v-container>
    <v-card v-for="event in events" :key="event.id" class="mb-4">
      <v-card-title>{{ event.name }}</v-card-title>
      <v-card-subtitle>Agendado para: {{ event.date }}</v-card-subtitle>

      <v-card-text style="display: flex; flex-direction: column; gap: 1rem">
        <v-card-actions style="display: flex; padding-left: 0rem">
          <!-- Botão para redirecionar para a página de detalhes -->
          <v-btn
            variant="elevated"
            :to="'/EventInstancePage/' + event.id"
            color="blue"
            >Detalhes</v-btn
          >

          <v-btn
            variant="elevated"
            :to="'/NewEventPage/' + event.id"
            color="green"
            >Editar</v-btn
          >

          <!-- Botão para excluir o evento -->
          <v-btn variant="elevated" @click="openDeleteModal(event)" color="red"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar exclusão</v-card-title>
        <v-card-text
          >Tem certeza que deseja excluir o evento
          {{ eventToDelete?.name }}?</v-card-text
        >
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="handleConfirmDelete"
            >Confirmar</v-btn
          >
          <v-btn color="red darken-1" text @click="closeDeleteModal"
            >Voltar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
defineProps(['events']);

// sem isso você não consegue receber a função e usar ela para deletar
const emit = defineEmits(['delete-event']);

const dialog = ref(false);
const eventToDelete = ref(null);

const openDeleteModal = (event) => {
  eventToDelete.value = event; // campo evento a deletar preenchido
  dialog.value = true; // abre caixa de dialogo
};

const closeDeleteModal = () => {
  dialog.value = false;
  eventToDelete.value = null;
};

const handleConfirmDelete = () => {
  if (eventToDelete.value) {
    emit('delete-event', eventToDelete.value.id);
    closeDeleteModal();
  }
};
</script>
