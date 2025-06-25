'use client'

import { useState } from 'react'

/**
 * Componente Sidebar que muestra la lista de notas
 * Incluye funcionalidad de creación y gestión de notas
 */
export default function Sidebar({ 
  notes, 
  selectedNoteId, 
  onNoteSelect, 
  onNoteDelete, 
  onNoteInfo,
  onCreateNote,
  visible 
}) {
  /**
   * Obtiene una vista previa del contenido de la nota
   * Limpia saltos de línea y trunca a 40 caracteres
   * @param {string} content - Contenido de la nota
   * @returns {string} Vista previa del contenido
   */
  const getNotePreview = (content) => {
    if (!content) return ''
    return content.length > 40 ? content.slice(0, 40) + '...' : content
  }

  return (
    <aside className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
      {/* Encabezado del sidebar */}
      <div className="sidebar-header">
        <div className="sidebar-title-section">
          <h2 className="sidebar-title-small">All Notes</h2>
          {/* Botón para crear nueva nota: solo SVG */}
          <button 
            className="action-btn"
            onClick={onCreateNote}
            aria-label="Create new note"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          </button>
        </div>
      </div>

      {/* Lista de notas */}
      <div className="notes-list">
        {notes.length === 0 ? (
          // Estado vacío cuando no hay notas
          <div className="empty-state" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%'}}>
            <span style={{marginTop: 18, textAlign: 'center', fontSize: '1.15rem', fontWeight: 500, color: '#1e293b'}}>No notes yet</span>
          </div>
        ) : (
          // Renderiza la lista de notas
          notes.map(note => (
            <div 
              key={note.id}
              className={`note-item ${selectedNoteId === note.id ? 'selected' : ''}`}
              onClick={() => onNoteSelect(note.id)}
            >
              {/* Contenido de la nota (título y preview) */}
              <div className="note-content">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-preview">{getNotePreview(note.content)}</p>
              </div>
              
              {/* Botones de acción para cada nota */}
              <div className="note-actions">
                {/* Botón de información */}
                <button
                  className="action-btn info-btn"
                  onClick={(e) => {
                    e.stopPropagation() // Evita que se seleccione la nota al hacer clic
                    onNoteInfo(note)
                  }}
                  aria-label="Note information"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>
                </button>
                
                {/* Botón de eliminar */}
                <button
                  className="action-btn delete-btn"
                  onClick={(e) => {
                    e.stopPropagation() // Evita que se seleccione la nota al hacer clic
                    onNoteDelete(note.id)
                  }}
                  aria-label="Delete note"
                >
                  {/* Icono de papelera */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  )
} 