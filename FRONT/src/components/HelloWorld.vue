<script setup lang="ts">
import { usePokemonStore } from '../stores/ThePokedex'; // Ajusta la ruta según la ubicación real del store

const store = usePokemonStore();
let searchTerm = '';

const searchPokemon = async () => {
  if (searchTerm.trim() !== '') {
    await store.fetchPokemonData(searchTerm);
  } else {
    // Cambiar la alerta por una alerta roja
    store.setError('Nombre obligatorio: Por favor, ingresa el nombre del Pokémon que deseas buscar.');
  }
};
</script>

<template>
  <div>
    <TheHeader />

    <v-container>
      <v-card class="mt-15">
        <v-card-text>
          <h1 class="text-center">¡Hola! Bienvenido al buscador de Pokémones</h1>
        </v-card-text>
      </v-card>
    </v-container>

    <v-container class="mt-8">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-text-field class="text-center" v-model="searchTerm" label="Buscar Pokémon"
            variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row justify="center"> 
        <v-col cols="12" md="6" class="text-center"> 
          <v-btn color="blue-darken-4" @click="searchPokemon">
            Buscar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-alert v-if="store.error" type="error" :dismissible="false">
        {{ store.error }}
      </v-alert>
    </v-container>
    <v-container v-if="store.pokemonData">
      <v-container class="text-center">
        <h2>{{ store.pokemonData.name }}</h2>
        <img :src="store.pokemonData.sprites.front_default" alt="Imagen del Pokémon" />
        <p>Altura: {{ store.pokemonData.height }}</p>
        <p>Peso: {{ store.pokemonData.weight }}</p>
      </v-container>
    </v-container>

  </div>
</template>
