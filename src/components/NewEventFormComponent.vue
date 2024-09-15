<template>
  <v-container>
    <v-card class="mx-auto" max-width="650">
      <v-card-text>
        <v-form @submit.prevent="openConfirmationDialog">
          <!-- Campos básicos requisitados -->
          <v-text-field
            prepend-icon="mdi-account"
            label="Nome"
            variant="outlined"
            v-model="dataEventOnForm.name"
            :rules="[rules.required]"
            required
          />
          <v-date-input
            label="Data"
            variant="outlined"
            v-model="dataEventOnForm.date"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            prepend-icon="mdi-map-marker-circle"
            label="Local"
            variant="outlined"
            v-model="dataEventOnForm.location"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            prepend-icon="mdi-chart-timeline"
            label="Descrição"
            variant="outlined"
            v-model="dataEventOnForm.description"
          />

          <v-text-field
            prepend-icon="mdi-account-outline"
            label="Adicionar/Editar convidado"
            :append-icon="guestOnEditing !== null ? 'mdi-check' : 'mdi-plus'"
            v-model="newGuest"
            @keyup.enter="guestOnEditing !== null ? updateGuest() : addGuest()"
            @click:append="guestOnEditing !== null ? updateGuest() : addGuest()"
          />

          <!-- Lista de convidados -->
          <v-list>
            <v-list-item
              v-for="(guest, index) in dataEventOnForm.guests"
              :key="index"
            >
              <v-list-item-content class="d-flex align-center">
                <v-col class="d-flex align-center">
                  <v-list-item-title class="ml-6">{{
                    guest
                  }}</v-list-item-title>
                </v-col>
                <v-col class="d-flex justify-end">
                  <v-btn icon @click="editGuest(index)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeGuest(index)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions>
            <v-btn type="submit" color="primary" :disabled="!isReady"
              >Salvar</v-btn
            >
            <v-spacer />
            <v-btn @click="cancel" color="error">Cancelar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>

    <!--Modal de confirmação-->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar cadastro</v-card-title>
        <v-card-text>
          Tem certeza de que deseja cadastrar este evento?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="confirmSubmit"
            >Confirmar</v-btn
          >
          <v-btn color="red darken-1" text @click="closeDialog">Voltar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--Snackbar para mensagens-->
    <v-snack v-modal="snackbar.show" @click="!snackbar.show">
      {{ snackbar.message }}
    </v-snack>
  </v-container>
</template>

<script setup>
import { defineProps, reactive, watch, ref, defineEmits, computed } from 'vue';

// Necessário definir a estrutura do event aqui,
const props = defineProps({
  event: {
    type: Object,
    default: () => ({
      name: '',
      date: null,
      location: '',
      description: '',
      guests: [], // Inicializando a lista de convidados
    }),
  },
});
const emit = defineEmits(['submit']);

// dados do form (faço um objeto para isso)
const dataEventOnForm = reactive({
  ...props.event,
  guests: props.event.guests || [],
});

const newGuest = ref(''); // novo convidado
const guestOnEditing = ref(null); // convidado que está sendo editado
const dialog = ref(false); // estado do modal
const snackbar = reactive({
  show: false,
  message: '',
  timeout: 3000,
});

// Função para adicionar novo convidado
const addGuest = () => {
  if (newGuest.value.trim()) {
    dataEventOnForm.guests.push(newGuest.value.trim());
    newGuest.value = ''; // limpa o campo após adicionar o convidado
  }
};

// Função para editar convidado
const editGuest = (index) => {
  newGuest.value = dataEventOnForm.guests[index];
  guestOnEditing.value = index;
};

// Função para atualizar o convidado
const updateGuest = () => {
  if (newGuest.value.trim() && guestOnEditing.value !== null) {
    dataEventOnForm.guests[guestOnEditing.value] = newGuest.value.trim();
    newGuest.value = '';
    guestOnEditing.value = null;
  }
};

// Função para remover convidado
const removeGuest = (index) => {
  dataEventOnForm.guests.splice(index, 1);
};

// Verifica se todos os campos estão preenchidos e há pelo menos 2 convidados
const isReady = computed(() => {
  const allFieldsFilled =
    dataEventOnForm.name && dataEventOnForm.date && dataEventOnForm.location;
  const guestsValid = dataEventOnForm.guests.length >= 2;
  return allFieldsFilled && guestsValid;
});

// Função para cancelar
const cancel = () => {
  window.location.reload();
};

// Abre o modal de confirmação
const openConfirmationDialog = () => {
  dialog.value = true;
};

// Fecha o modal de confirmação
const closeDialog = () => {
  dialog.value = false;
};

// Confirma e envia o evento
const confirmSubmit = () => {
  emit('submit', dataEventOnForm);
  dialog.value = false;
};

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  minGuests: () =>
    dataEventOnForm.guests.length >= 2 || 'Adicione pelo menos dois convidados',
};
</script>
