import React from 'react'
import { useApps } from '../contexts/AppsContext'

export default function Dashboard(){
  const { apps } = useApps()
  const total = apps.length
  const applied = apps.filter(a=>a.status==='Applied').length
  const interview = apps.filter(a=>a.status==='Interview Scheduled').length
  const selected = apps.filter(a=>a.status==='Selected').length
  const last5 = apps.slice(0,5)

  return (
    <div className="container">
      <div className="header">
        <h3>Dashboard</h3>
      </div>

      <div className="card-grid">
        <div className="card"><div className="small">Total</div><div className="badge">{total}</div></div>
        <div className="card"><div className="small">Applied</div><div className="badge">{applied}</div></div>
        <div className="card"><div className="small">Interview</div><div className="badge">{interview}</div></div>
        <div className="card"><div className="small">Selected</div><div className="badge">{selected}</div></div>
      </div>

      <div style={{marginTop:16}} className="card">
        <h4>Last 5 Applications</h4>
        <ul className="list">
          {last5.map(a=> (
            <li key={a.id} style={{padding:'8px 0',borderBottom:'1px solid #eef2f6'}}>
              <div><strong>{a.company}</strong> — {a.title}</div>
              <div className="small">{a.appliedDate} • {a.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
