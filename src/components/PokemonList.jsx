// PokemonList.js
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ session }) {
    const [pokemonList, setPokemonList] = useState([]);

    useEffect(() => {
        const fetchRandomPokemons = async () => {
            try {
                const randomIds = [];
                for (let i = 0; i < 20; i++) { // Obtener 20 Pokémon aleatorios
                    randomIds.push(Math.floor(Math.random() * 898) + 1); // Números de 1 a 898
                }

                const detailedPokemonList = await Promise.all(
                    randomIds.map(async (id) => {
                        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                        const pokemonData = await response.json();
                        return {
                            name: pokemonData.name,
                            imageUrl: pokemonData.sprites.front_default,
                            types: pokemonData.types.map((type) => type.type.name),
                            weight: pokemonData.weight,
                            height: pokemonData.height,
                        };
                    })
                );

                setPokemonList(detailedPokemonList);
            } catch (error) {
                console.error('Error fetching random Pokemon list:', error);
            }
        };

        fetchRandomPokemons();
    }, []);

    return (
        <div className="pokemon-list-container">
            {pokemonList.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} session={session} />
            ))}
        </div>
    );
}

export default PokemonList;