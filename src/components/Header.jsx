// Header.js
import React from 'react';

function Header({ onOpenSidebar }) {
    return (
        <header className="app-header">
            <h1>PokeApp</h1>
            <button onClick={onOpenSidebar}>Ver favoritos</button>
        </header>
    );
}

export default Header;