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

</script>
