<template>
  <v-form>
    <!-- Campos básicos requisitados -->
    <v-text-field label="Nome" required />
    <v-text-field label="Data" required />
    <v-text-field label="Local" required />
    <v-text-field label="Descrição" />

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

    <v-btn type="submit" color="primary">Salvar</v-btn>
  </v-form>

</template>

<script setup>

</script>
