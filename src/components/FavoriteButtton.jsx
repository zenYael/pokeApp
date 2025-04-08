// FavoriteButton.js
import React from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function FavoriteButton({ isFavorite, buttonColor, toggleFavorite }) {
    return (
        <button className="favorite-button" onClick={toggleFavorite}>
            {isFavorite ? (
                <AiFillHeart size={24} color={buttonColor} />
            ) : (
                <AiOutlineHeart size={24} color={buttonColor} />
            )}
        </button>
    );
}

export default FavoriteButton;