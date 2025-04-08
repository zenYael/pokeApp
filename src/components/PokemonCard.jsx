// PokemonCard.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import FavoriteButton from './FavoriteButtton';

function PokemonCard({ pokemon, session }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [buttonColor, setButtonColor] = useState('#fff3f8'); // Color claro por defecto

    useEffect(() => {
        const checkFavorite = async () => {
            if (!session) return;

            try {
                const { data, error } = await supabase
                    .from('favoritos')
                    .select('*')
                    .eq('user_id', session.user.id)
                    .eq('pokemon_name', pokemon.name);

                if (error) throw error;

                if (data && data.length > 0) {
                    setIsFavorite(true);
                    setButtonColor('#e91e63'); // Color rosa fuerte si es favorito
                }
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        };

        checkFavorite();
    }, [session, pokemon.name]);

    const toggleFavorite = async () => {
        if (!session) {
            alert('Debes iniciar sesión para agregar favoritos.');
            return;
        }

        try {
            if (isFavorite) {
                // Eliminar de favoritos
                const { error: deleteError } = await supabase
                    .from('favoritos')
                    .delete()
                    .eq('user_id', session.user.id)
                    .eq('pokemon_name', pokemon.name);

                if (deleteError) throw deleteError;
                setIsFavorite(false);
                setButtonColor('#fff3f8'); // Color claro
                alert('Pokémon eliminado de favoritos.');
            } else {
                // Agregar a favoritos
                const { error: insertError } = await supabase.from('favoritos').insert({
                    user_id: session.user.id,
                    pokemon_name: pokemon.name,
                    pokemon_data: pokemon,
                });

                if (insertError) throw insertError;
                setIsFavorite(true);
                setButtonColor('#e91e63'); // Color rosa fuerte
                alert('Pokémon agregado a favoritos.');
            }
        } catch (error) {
            alert('Error toggling favorite: ' + error.message);
        }
    };

    return (
        <div className="pokemon-card">
            <FavoriteButton
                isFavorite={isFavorite}
                buttonColor={buttonColor}
                toggleFavorite={toggleFavorite}
            />
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p>Tipos: {pokemon.types.join(', ')}</p>
            <p>Peso: {pokemon.weight}</p>
            <p>Altura: {pokemon.height}</p>
        </div>
    );
}

export default PokemonCard;