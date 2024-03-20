import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore({
  id: 'pokemon',
  state: () => ({
    pokemonData: null,
    error: null,
  }),
  actions: {
    async fetchPokemonData(pokemonName: string) {
      try {
        const response = await axios.get(`http://localhost:3001/auth/Pokemon?pokemonName=${pokemonName}`);
        this.setPokemonData(response.data);
        this.setError(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.setError('No se encontró información para el Pokémon especificado');
        } else {
          this.setError('Nombre escrito incorectamente');
        }
        this.setPokemonData(null);
      }
    },
    setPokemonData(data: any) {
      this.pokemonData = data;
    },
    setError(error: string | null) {
      this.error = error;
    },
  },
});
