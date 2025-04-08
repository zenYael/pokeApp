import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else alert('Inicio de sesión exitoso 🎉')
    } else {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else alert('Cuenta creada, revisa tu correo 📧')
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          {isLogin ? 'Entrar' : 'Crear cuenta'}
        </button>

        <p className="auth-switch">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <span onClick={() => setIsLogin(!isLogin)} className="auth-link">
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </span>
        </p>
      </form>
    </div>
  )
}
