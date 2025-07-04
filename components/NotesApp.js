'use client'

import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import NoteEditor from './NoteEditor'
import Header from './Header'
import InfoModal from './InfoModal'
import Toast from './Toast'
import ConfirmModal from './ConfirmModal'

/**
 * Componente principal de la aplicación de notas
 * Maneja toda la lógica de estado y coordinación entre componentes
 */
export default function NotesApp() {
  // Estado para almacenar todas las notas
  const [notes, setNotes] = useState([])
  
  // Estado para la nota seleccionada actualmente
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  
  // Estado para mostrar/ocultar el modal de información
  const [showInfoModal, setShowInfoModal] = useState(false)
  
  // Estado para la nota que se mostrará en el modal de información
  const [infoNote, setInfoNote] = useState(null)

  // Estado para las notificaciones toast
  const [toast, setToast] = useState(null)

  // Estado para controlar el cooldown de creación de notas
  const [lastNoteCreation, setLastNoteCreation] = useState(0)

  // Estado para el modal de confirmación
  const [confirm, setConfirm] = useState(null)

  // Estado para la visibilidad de la sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true)
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 700)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Selección inicial de nota (si no hay ninguna seleccionada y hay notas)
  useEffect(() => {
    if (notes.length > 0 && !selectedNoteId) {
      setSelectedNoteId(notes[0].id)
    }
  }, [notes, selectedNoteId])

  /**
   * Efecto que se ejecuta cada vez que cambian las notas
   * Guarda las notas en localStorage automáticamente
   */
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('simple-notes', JSON.stringify(notes))
    }
  }, [notes])

  // Sincronización en tiempo real entre pestañas usando el evento 'storage'
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'simple-notes') {
        const updatedNotes = JSON.parse(event.newValue || '[]');
        setNotes(updatedNotes);
        // Si la nota seleccionada ya no existe, selecciona la primera disponible
        if (updatedNotes.length > 0 && !updatedNotes.find(n => n.id === selectedNoteId)) {
          setSelectedNoteId(updatedNotes[0].id);
        }
        // Si no hay notas, limpia la selección
        if (updatedNotes.length === 0) {
          setSelectedNoteId(null);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [selectedNoteId]);

  /**
   * Efecto que se ejecuta solo en el cliente para cargar las notas desde localStorage
   */
  useEffect(() => {
    // Solo se ejecuta en el cliente
    const savedNotes = typeof window !== 'undefined' ? localStorage.getItem('simple-notes') : null
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes)
      setNotes(parsedNotes)
      if (parsedNotes.length > 0 && !selectedNoteId) {
        setSelectedNoteId(parsedNotes[0].id)
      }
    }
    setLoading(false)
  }, [])

  /**
   * Muestra una notificación toast
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de toast ('success', 'error', 'warning', 'max')
   */
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  /**
   * Función para crear una nueva nota
   * Incluye protección contra spam (mínimo 2 segundos entre creaciones) y límite de 10 notas
   */
  const createNote = () => {
    const now = Date.now()
    const timeSinceLastCreation = now - lastNoteCreation
    
    // Protección contra spam: mínimo 2 segundos entre creaciones
    if (timeSinceLastCreation < 2000) {
      showToast('Please wait before creating another note', 'warning')
      return
    }

    // Límite de 10 notas máximo
    if (notes.length >= 10) {
      showToast('Maximum of 10 notes allowed', 'max')
      return
    }

    const newNote = {
      id: now.toString(), // ID único basado en timestamp
      title: 'New Note',
      content: '',
      createdAt: new Date().toISOString(), // Fecha de creación en formato ISO
      updatedAt: new Date().toISOString()  // Fecha de última modificación
    }
    
    setNotes(prev => [newNote, ...prev]) // Agrega la nueva nota al inicio
    setSelectedNoteId(newNote.id) // Selecciona automáticamente la nueva nota
    setLastNoteCreation(now) // Actualiza el timestamp de la última creación
  }

  /**
   * Función para actualizar una nota existente
   * @param {string} id - ID de la nota a actualizar
   * @param {object} updates - Objeto con los campos a actualizar
   */
  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, ...updates, updatedAt: new Date().toISOString() }
        : note
    ))
  }

  /**
   * Función para eliminar una nota
   * @param {string} id - ID de la nota a eliminar
   */
  const requestDeleteNote = (id) => {
    setConfirm({
      message: 'Are you sure you want to delete this note?',
      onConfirm: () => deleteNote(id)
    })
  }

  const deleteNote = (id) => {
    setConfirm(null)
    const noteToDelete = notes.find(note => note.id === id)
    setNotes(prev => prev.filter(note => note.id !== id))
    
    // Si la nota eliminada era la seleccionada, selecciona la primera disponible
    if (selectedNoteId === id) {
      const remainingNotes = notes.filter(note => note.id !== id)
      setSelectedNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null)
    }
    
    showToast('The note has been deleted', 'error')
  }

  // Encuentra la nota seleccionada actualmente
  const selectedNote = notes.find(note => note.id === selectedNoteId)

  /**
   * Función para mostrar el modal de información de una nota
   * @param {object} note - Nota de la cual mostrar información
   */
  const showNoteInfo = (note) => {
    setInfoNote(note)
    setShowInfoModal(true)
  }

  // Confirmación para descargar nota
  const requestDownloadNote = (note, downloadFn) => {
    setConfirm({
      message: 'Do you want to download this note?',
      onConfirm: () => {
        setConfirm(null)
        downloadFn()
      }
    })
  }

  // Al seleccionar una nota en móvil, ocultar la sidebar
  const handleNoteSelect = (id) => {
    setSelectedNoteId(id)
    if (isMobile) setSidebarVisible(false)
  }

  // Render condicional para evitar parpadeo de 'No notes yet'
  if (loading) {
    return null
  }

  return (
    <div className="app">
      {/* Header con botón para retraer/mostrar sidebar */}
      <Header sidebarVisible={sidebarVisible} onToggleSidebar={() => setSidebarVisible(v => !v)} />
      
      <div className="main-container">
        {/* Sidebar tipo drawer en móvil */}
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          onNoteSelect={handleNoteSelect}
          onNoteDelete={requestDeleteNote}
          onNoteInfo={showNoteInfo}
          onCreateNote={createNote}
          visible={sidebarVisible}
        />
        {/* Botón flotante para mostrar sidebar solo en móvil */}
        {isMobile && !sidebarVisible && (
          <button className="show-sidebar-btn" onClick={() => setSidebarVisible(true)} aria-label="Mostrar menú">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <line x1="9" y1="4" x2="9" y2="20" />
            </svg>
          </button>
        )}
        
        {/* Editor de notas */}
        <NoteEditor
          note={selectedNote}
          onUpdateNote={updateNote}
          onDeleteNote={requestDeleteNote}
          onShowInfo={showNoteInfo}
          sidebarVisible={sidebarVisible}
          onRequestDownload={requestDownloadNote}
          onCreateFirstNote={createNote}
        />
      </div>

      {/* Modal de información de la nota */}
      {showInfoModal && infoNote && (
        <InfoModal
          note={infoNote}
          onClose={() => setShowInfoModal(false)}
        />
      )}

      {/* Sistema de notificaciones toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Modal de confirmación personalizado */}
      {confirm && (
        <ConfirmModal
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  )
} 