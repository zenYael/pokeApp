// App.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AuthForm from './components/AuthForm';
import PokemonList from './components/PokemonList';
import FavoriteSidebar from './components/FavoriteSidebar';
import Header from './components/Header';
import './App.css';

function App() {
    const [session, setSession] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => listener.subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    return (
        <div className="app-container">
            {session ? (
                <div>
                    <Header onOpenSidebar={() => setIsSidebarOpen(true)} />
                    <PokemonList session={session} />
                    <button onClick={handleLogout} className="logout-button">
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <AuthForm />
            )}
            <FavoriteSidebar
                session={session}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
        </div>
    );
}

export default App;