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

  /**
   * Efecto que se ejecuta al cargar la aplicación
   * Carga las notas guardadas en localStorage
   */
  useEffect(() => {
    const savedNotes = localStorage.getItem('simple-notes')
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes)
      setNotes(parsedNotes)
      // Si hay notas guardadas y no hay ninguna seleccionada, selecciona la primera
      if (parsedNotes.length > 0 && !selectedNoteId) {
        setSelectedNoteId(parsedNotes[0].id)
      }
    }
  }, [])

  /**
   * Efecto que se ejecuta cada vez que cambian las notas
   * Guarda las notas en localStorage automáticamente
   */
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('simple-notes', JSON.stringify(notes))
    }
  }, [notes])

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

  return (
    <div className="app">
      {/* Header solo con la fecha */}
      <Header />
      
      <div className="main-container">
        {/* Sidebar con lista de notas */}
        <Sidebar
          notes={notes}
          selectedNoteId={selectedNoteId}
          onNoteSelect={setSelectedNoteId}
          onNoteDelete={requestDeleteNote}
          onNoteInfo={showNoteInfo}
          onCreateNote={createNote}
          visible={true}
        />
        
        {/* Editor de notas */}
        <NoteEditor
          note={selectedNote}
          onUpdateNote={updateNote}
          onDeleteNote={requestDeleteNote}
          onShowInfo={showNoteInfo}
          sidebarVisible={true}
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