import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { isValidEmail, minLen } from '../utils/validators'

export default function Login(){
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handle = (e) => setForm({...form, [e.target.name]: e.target.value})

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if(!isValidEmail(form.email)) err.email = 'Invalid email'
    if(!minLen(form.password,6)) err.password = 'Password must be 6+ chars'
    setErrors(err)
    if(Object.keys(err).length===0){
      login(form.email, form.password)
      navigate('/dashboard')
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:520,margin:'0 auto'}}>
        <h3>Login</h3>
        <form onSubmit={submit}>
          <div style={{marginBottom:10}}>
            <input className="input" name="email" placeholder="Email" value={form.email} onChange={handle} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div style={{marginBottom:10}}>
            <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={handle} />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button className="button" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
