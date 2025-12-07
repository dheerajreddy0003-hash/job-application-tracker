import React, { useMemo, useState } from 'react'
import { useApps } from '../contexts/AppsContext'

export default function Applications(){
  const { apps, deleteApp } = useApps()
  const [q, setQ] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')
  const [sortBy, setSortBy] = useState(null)
  const [page, setPage] = useState(1)
  const perPage = 5

  const filtered = useMemo(()=>{
    let out = apps.slice()
    if(q.trim()){
      const s = q.toLowerCase()
      out = out.filter(a => a.company.toLowerCase().includes(s) || a.title.toLowerCase().includes(s))
    }
    if(filterType !== 'All') out = out.filter(a => a.type === filterType)
    if(filterStatus !== 'All') out = out.filter(a => a.status === filterStatus)
    if(sortBy === 'company') out.sort((a,b)=>a.company.localeCompare(b.company))
    if(sortBy === 'date') out.sort((a,b)=> new Date(b.appliedDate) - new Date(a.appliedDate))
    return out
  },[apps,q,filterType,filterStatus,sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const visible = filtered.slice((page-1)*perPage, page*perPage)

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h3>Applications</h3>
          <div style={{display:'flex',gap:8}}>
            <input className="input" placeholder="Search company or title" value={q} onChange={e=>{setQ(e.target.value); setPage(1)}} />
            <select className="input" value={filterType} onChange={e=>{setFilterType(e.target.value); setPage(1)}}>
              <option>All</option>
              <option>Full-time</option>
              <option>Internship</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
            <select className="input" value={filterStatus} onChange={e=>{setFilterStatus(e.target.value); setPage(1)}}>
              <option>All</option>
              <option>Applied</option>
              <option>Interview Scheduled</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>
          </div>
        </div>

        <div style={{marginBottom:8}}>
          <button className="button" onClick={()=>{setSortBy('company')}}>Sort by Company (A–Z)</button>
          <button className="button" style={{marginLeft:8}} onClick={()=>{setSortBy('date')}}>Sort by Applied Date</button>
          <button className="button" style={{marginLeft:8}} onClick={()=>setSortBy(null)}>Reset Sorting</button>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Type</th>
              <th>Status</th>
              <th>Location</th>
              <th>Applied Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.map(a=> (
              <tr key={a.id}>
                <td>{a.company}</td>
                <td>{a.title}</td>
                <td>{a.type}</td>
                <td>{a.status}</td>
                <td>{a.location}</td>
                <td>{a.appliedDate}</td>
                <td>
                  <button className="button" onClick={()=>{if(confirm('Delete?')) deleteApp(a.id)}}>Delete</button>
                </td>
              </tr>
            ))}
            {visible.length===0 && (
              <tr><td colSpan={7} className="small">No applications found.</td></tr>
            )}
          </tbody>
        </table>

        <div style={{marginTop:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div className="small">Page {page} of {totalPages}</div>
          <div className="pager">
            <button className="button" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Previous</button>
            <button className="button" onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
