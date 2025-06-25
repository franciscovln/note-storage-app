'use client'

import { useState, useEffect } from 'react'

// Límite máximo de caracteres por nota
const MAX_CHARACTERS = 5000

/**
 * Componente NoteEditor para crear y editar notas
 * Maneja la edición del título y contenido con límite de caracteres
 */
export default function NoteEditor({ note, onUpdateNote, onDeleteNote, onShowInfo, sidebarVisible, onRequestDownload, onCreateFirstNote }) {
  // Estado para el título de la nota
  const [title, setTitle] = useState('')
  
  // Estado para el contenido de la nota
  const [content, setContent] = useState('')
  
  // Estado para el contador de caracteres
  const [characterCount, setCharacterCount] = useState(0)

  /**
   * Efecto que se ejecuta cuando cambia la nota seleccionada
   * Actualiza los estados locales con los datos de la nota
   */
  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setContent(note.content || '')
      setCharacterCount((note.content || '').length)
    } else {
      // Si no hay nota seleccionada, limpia los campos
      setTitle('')
      setContent('')
      setCharacterCount(0)
    }
  }, [note])

  /**
   * Maneja el cambio del título de la nota
   * Actualiza el estado local y notifica al componente padre
   * @param {string} newTitle - Nuevo título de la nota
   */
  const handleTitleChange = (newTitle) => {
    setTitle(newTitle)
    if (note) {
      onUpdateNote(note.id, { title: newTitle })
    }
  }

  /**
   * Maneja el cambio del contenido de la nota
   * Valida el límite de caracteres antes de actualizar
   * @param {string} newContent - Nuevo contenido de la nota
   */
  const handleContentChange = (newContent) => {
    if (newContent.length <= MAX_CHARACTERS) {
      setContent(newContent)
      setCharacterCount(newContent.length)
      if (note) {
        onUpdateNote(note.id, { content: newContent })
      }
    }
    // Si excede el límite, no se actualiza (previene escritura)
  }

  /**
   * Descarga la nota actual como archivo .txt
   * Crea un blob con el contenido y lo descarga automáticamente
   */
  const downloadNote = () => {
    if (!note) return
    if (onRequestDownload) {
      onRequestDownload(note, () => {
        const fileContent = `${note.title}\n\n${note.content}`
        const blob = new Blob([fileContent], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const fileName = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      })
    }
  }

  /**
   * Cuenta el número de palabras en un texto
   * @param {string} text - Texto a analizar
   * @returns {number} Número de palabras
   */
  const getWordCount = (text) => {
    if (!text || text.trim() === '') return 0
    return text.trim().split(/\s+/).length
  }

  // Eliminar nota (solo confirmación personalizada)
  const handleDelete = () => {
    if (note) {
      onDeleteNote(note.id)
    }
  }

  // Si no hay nota seleccionada, muestra un mensaje de bienvenida centralizado y un botón grande
  if (!note) {
    return (
      <div className={`note-editor ${!sidebarVisible ? 'full-width expanded-editor' : ''}`}>
        <div className="no-note-selected expanded-center" style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="no-note-content" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 340, margin: '0 auto', marginTop: '-18vh'}}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{marginBottom: 18}}>
              <rect x="3" y="4" width="18" height="16" rx="2" fill="#f1f5f9" stroke="#3b82f6"/>
              <path d="M7 8h10M7 12h6M7 16h4" stroke="#3b82f6" strokeWidth="1.5"/>
            </svg>
            <h2 style={{margin: 0, marginBottom: 8, textAlign: 'center', fontWeight: 600, color: '#1e293b', fontSize: '1.25rem'}}>No notes yet</h2>
            <p style={{textAlign: 'center', color: '#64748b', marginBottom: 18, fontSize: '1rem'}}>Click the button below to create your first note and start writing your ideas!</p>
            <button
              className="btn btn-blue"
              style={{fontSize: '1rem', padding: '0.7rem 1.5rem', borderRadius: '0.5rem', fontWeight: 600, marginTop: 4}}
              onClick={onCreateFirstNote}
            >
              Create your first note
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`note-editor ${!sidebarVisible ? 'full-width expanded-editor' : ''}`}>
      {/* Header del editor con título y botones de acción */}
      <div className="editor-header">
        {/* Sección del título */}
        <div className="editor-title-section">
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Note title..."
            className="title-input"
            maxLength={100} // Límite de 100 caracteres para el título
          />
        </div>
        
        {/* Botones de acción del editor */}
        <div className="editor-actions">
          {/* Botón de información con SVG proporcionado */}
          <button
            className="action-btn info-btn"
            onClick={() => onShowInfo(note)}
            aria-label="Note information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
          </button>
          
          {/* Botón de descarga con confirmación personalizada */}
          <button
            className="action-btn download-btn"
            onClick={downloadNote}
            aria-label="Download note"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7,10 12,15 17,10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </button>
          
          {/* Botón de eliminar con confirmación personalizada */}
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            aria-label="Delete note"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Área de contenido del editor */}
      <div className="editor-content">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Write your note here..."
          className="content-textarea"
          rows={20} // Altura inicial del textarea
        />
      </div>
      
      {/* Contador de palabras y caracteres en esquina inferior derecha */}
      <div className="editor-stats">
        <span className="word-count">{getWordCount(content)} words</span>
        <span className="character-count">{characterCount} characters</span>
      </div>
      
      {/* Advertencia cuando se alcanza el límite de caracteres */}
      {characterCount >= MAX_CHARACTERS && (
        <div className="character-warning limit-reached">
          You have reached the maximum character limit
        </div>
      )}
    </div>
  )
} 