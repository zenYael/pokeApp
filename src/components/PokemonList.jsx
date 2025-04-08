// PokemonList.js
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();

        const detailedPokemonList = await Promise.all(
          data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            return {
              name: pokemon.name,
              imageUrl: pokemonData.sprites.front_default,
              types: pokemonData.types.map((type) => type.type.name),
              weight: pokemonData.weight,
              height: pokemonData.height, // Añade la altura
            };
          })
        );

        setPokemonList(detailedPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, []);

  return (
    <div className="pokemon-list-container">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;