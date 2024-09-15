<template>
  <v-container>
    <v-card class="mx-auto" max-width="650">
      <v-card-text>
        <v-form @submit.prevent="handleFormSubmit" ref="form">
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
          <!-- <v-text-field label="Data" variant="outlined" v-model="dataEventOnForm.date" required /> -->
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
            <v-btn type="submit" color="primary">Salvar</v-btn>
            <v-spacer />
            <v-btn :to="'/'" color="error">Cancelar</v-btn>
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

    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      color="error"
    >
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false">Fechar</v-btn>
    </v-snackbar>
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
  // copia tudo que já está na estrutura da var props
  ...props.event,
  // define que a chave guests sempre será preenchida com o valor da chave
  // props.event.guests do objeto props ou com um array vazio
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

// *observa a chave que guarda os convidados e atauliza dataEventOnForm
// (objeto com detalhes do evento, eventos e convidados)
watch(
  () => props.event,
  (newEvent) => {
    Object.assign(dataEventOnForm, newEvent);
  }
);

const addGuest = () => {
  if (newGuest.value.trim()) {
    //se tiver valor no campo...
    dataEventOnForm.guests.push(newGuest.value.trim()); // add convidado
    newGuest.value = ''; // limpa o campo
  }
};

const editGuest = (index) => {
  newGuest.value = dataEventOnForm.guests[index]; // preenche campo com convidado selecionado
  guestOnEditing.value = index; // marca quem está sendo editado
};

const updateGuest = () => {
  if (newGuest.value.trim() && guestOnEditing.value !== null) {
    // procura o convidado com index marcado como em edição e atualiza com o valor do campo
    dataEventOnForm.guests[guestOnEditing.value] = newGuest.value.trim();
    newGuest.value = ''; // limpa campo
    guestOnEditing = null; // agora nenhum guest está sendo editado
  }
};

const removeGuest = (index) => {
  dataEventOnForm.guests.splice(index, 1); // a partir do indice em questão, remove 1
};

const openConfirmationDialog = () => {
  dialog.value = true; // Abre o modal de confirmação
};

const closeDialog = () => {
  dialog.value = false; // Fecha o modal de confirmação
};

const confirmSubmit = () => {
  emit('submit', dataEventOnForm); // Emite o evento de submissão
  dialog.value = false; // Fecha o modal após confirmar
};

const handleFormSubmit = () => {
  const form = refs.form;
  if (form.validate() && rules.minGuests()) {
    openConfirmationDialog();
  } else {
    snackbar.message =
      'Preencha todos os campos obrigatórios e adicione pelo menos 2 convidados!';
    snackbar.show = true;
  }
};

const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  minGuests: () =>
    dataEventOnForm.guests.length >= 2 || 'Adicione pelo menos dois convidados',
};
</script>
