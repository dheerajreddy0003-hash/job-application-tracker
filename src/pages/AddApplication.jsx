import React, { useState } from 'react'
import { useApps } from '../contexts/AppsContext'

const initial = { company:'', title:'', type:'Full-time', status:'Applied', location:'', appliedDate:'', notes:'' }

export default function AddApplication(){
  const { addApp } = useApps()
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')

  const handle = (e) => setForm({...form, [e.target.name]: e.target.value})

  const validate = () => {
    const e = {}
    if(!form.company.trim()) e.company='Company required'
    if(!form.title.trim()) e.title='Job Title required'
    if(!form.type) e.type='Job Type required'
    if(!form.status) e.status='Status required'
    if(!form.location.trim()) e.location='Location required'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if(Object.keys(e).length===0){
      addApp(form)
      setForm(initial)
      setSuccess('Application added!')
      setTimeout(()=>setSuccess(''),2500)
    }
  }

  return (
    <div className="container">
      <div className="card" style={{maxWidth:800,margin:'0 auto'}}>
        <h3>Add Job Application</h3>
        <form onSubmit={submit}>
          <div className="form-row">
            <input className="input" name="company" placeholder="Company" value={form.company} onChange={handle} />
            <input className="input" name="title" placeholder="Job Title" value={form.title} onChange={handle} />
          </div>
          {errors.company && <div className="error">{errors.company}</div>}
          {errors.title && <div className="error">{errors.title}</div>}

          <div className="form-row">
            <select className="input" name="type" value={form.type} onChange={handle}>
              <option>Full-time</option>
              <option>Internship</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
            <select className="input" name="status" value={form.status} onChange={handle}>
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>
          </div>

          <div className="form-row">
            <input className="input" name="location" placeholder="Location" value={form.location} onChange={handle} />
            <input className="input" name="appliedDate" type="date" value={form.appliedDate} onChange={handle} />
          </div>

          <textarea className="input" name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handle} />

          <div style={{marginTop:12,display:'flex',gap:8,alignItems:'center'}}>
            <button className="button" type="submit">Add Application</button>
            {success && <div className="success">{success}</div>}
          </div>
        </form>
      </div>
    </div>
  )
}
