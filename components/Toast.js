'use client'

import { useState, useEffect } from 'react'

/**
 * Componente Toast para mostrar notificaciones temporales
 * Se auto-oculta después de 2 segundos con animación de salida
 */
export default function Toast({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Auto-oculta el toast después de 2 segundos
    const timer = setTimeout(() => {
      setIsExiting(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose()
      }, 300) // Espera la animación de salida
    }, 2000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  // Permitir tipo 'max' para toast de máximo de notas
  const toastClass = type === 'max' ? 'toast toast-max' : `toast toast-${type}`

  return (
    <div className={`${toastClass} ${isExiting ? 'toast-exit' : ''}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button 
          className="toast-close"
          onClick={() => {
            setIsExiting(true)
            setTimeout(() => {
              setIsVisible(false)
              onClose()
            }, 300)
          }}
          aria-label="Close notification"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  )
} 