// PokemonCard.js
import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
      <p>Tipos: {pokemon.types.join(', ')}</p>
      <p>Altura: {pokemon.height}</p>
      <p>Peso: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonCard;