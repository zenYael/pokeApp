// FavoriteSidebar.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import PokemonCard from './PokemonCard'; // Usa el componente PokemonCard existente

function FavoriteSidebar({ session, isOpen, onClose }) {
    const [favoritePokemons, setFavoritePokemons] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!session) return;

            try {
                const { data, error } = await supabase
                    .from('favoritos')
                    .select('pokemon_data')
                    .eq('user_id', session.user.id);

                if (error) throw error;

                setFavoritePokemons(data.map((item) => item.pokemon_data));
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, [session]);

    if (!isOpen) return null;

    return (
        <div className={`favorite-sidebar ${isOpen ? 'open' : ''}`}>
            <button className="close-sidebar" onClick={onClose}>
                Cerrar
            </button>
            {favoritePokemons.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} session={session} />
            ))}
        </div>
    );
}

export default FavoriteSidebar;