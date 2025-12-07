import React, { createContext, useContext, useState } from 'react'
import { SAMPLE_APPS } from '../data/sampleApps'

const AppsContext = createContext()

export const AppsProvider = ({ children }) => {
  const [apps, setApps] = useState(() => {
    const raw = localStorage.getItem('jat_apps')
    return raw ? JSON.parse(raw) : SAMPLE_APPS
  })

  const addApp = (app) => {
    const newApp = { ...app, id: Date.now() }
    const next = [newApp, ...apps]
    setApps(next)
    localStorage.setItem('jat_apps', JSON.stringify(next))
  }

  const updateApp = (id, updates) => {
    const next = apps.map(a => a.id === id ? { ...a, ...updates } : a)
    setApps(next)
    localStorage.setItem('jat_apps', JSON.stringify(next))
  }

  const deleteApp = (id) => {
    const next = apps.filter(a => a.id !== id)
    setApps(next)
    localStorage.setItem('jat_apps', JSON.stringify(next))
  }

  return (
    <AppsContext.Provider value={{ apps, addApp, updateApp, deleteApp }}>
      {children}
    </AppsContext.Provider>
  )
}

export const useApps = () => useContext(AppsContext)
