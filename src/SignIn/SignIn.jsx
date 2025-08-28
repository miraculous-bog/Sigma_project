// src/features/auth/SignIn.jsx
import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'



export default function SignIn() {
  const userRef = useRef(null)
  const errRef = useRef(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => { userRef.current?.focus() }, [])
  useEffect(() => { setErrMsg('') }, [username, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // БЕКЕНД чекає username + password
      const data = await login({ username, password }).unwrap()
      // бекенд повертає: access_token, token_type, refresh_token
      dispatch(setCredentials({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        user: username
      }))
      setUsername('')
      setPassword('')
      navigate('/welcome')
    } catch (err) {
      // RTK Query кладе код у err.status (а не originalStatus)
      const status = err?.status
      const detail = err?.data?.message || err?.data?.detail

      if (!status) setErrMsg('No Server Response')
      else if (status === 400) setErrMsg('Missing username or password')
      else if (status === 401) setErrMsg('Unauthorized')
      else setErrMsg(detail || 'Login failed')

      errRef.current?.focus()
    }
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <section className="login">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <h1>Sign In</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          ref={userRef}
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoading}>
          Sign In
        </button>
      </form>
    </section>
  )
}
