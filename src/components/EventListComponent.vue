<template>

  <v-card>
    <v-card-title>Eventos cadastrados</v-card-title>
    <v-spacer />
    <v-card-text>
      <v-list>
        <v-list-item v-for="event in events">
          <v-list-item-content>
            <v-list-item-title>{{ event.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ event.date }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-card-actions>
            <!-- Aqui cria-se como que uma abertura para enviarmos uma função de deletar para esse componente -->
            <!-- Uma vez que ele tenha essa função em mãos, ele envia o event.id e executa a eliminação-->
            <v-btn @click="$emit('delete-event', event.id)" color="red">Excluir</v-btn>
            <v-btn :to="'/event/' + event.id">Detalhes</v-btn>
          </v-card-actions>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
//define uma propriedade que o componente pode receber e manipular
defineProps(['events'])
</script>
