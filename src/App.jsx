// App.js
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import AuthForm from './components/AuthForm';
import PokemonList from './components/PokemonList'; // Importa el componente
import './App.css';

function App() {
  const [session, setSession] = useState(null);

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
    <div>
      {session ? (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>
          <PokemonList /> {/* Usa el componente PokemonList */}
          <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Cerrar sesión
          </button>
        </div>
      ) : (
        <AuthForm />
      )}
    </div>
  );
}

export default App;