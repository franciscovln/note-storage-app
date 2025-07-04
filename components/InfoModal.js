'use client'

/**
 * Componente InfoModal que muestra información detallada de una nota
 * Incluye fechas, estadísticas y permite cerrar con ESC o clic fuera
 */
export default function InfoModal({ note, onClose }) {
  /**
   * Formatea una fecha ISO a fecha y hora en inglés
   * @param {string} dateString - Fecha en formato ISO
   * @returns {string} Fecha y hora formateadas (ej: "June 25, 2025 2:30 PM")
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const datePart = date.toLocaleDateString('en-US', {
      month: 'long',      // Mes completo (ej: "June")
      day: 'numeric',     // Día en números
      year: 'numeric'     // Año en números
    })
    const timePart = date.toLocaleTimeString('en-US', {
      hour: 'numeric',    // Hora en formato 12h
      minute: '2-digit',  // Minutos con dos dígitos
      hour12: true        // Formato 12 horas con AM/PM
    })
    return `${datePart} ${timePart}`
  }

  /**
   * Cuenta el número de palabras en un texto
   * Divide por espacios y filtra elementos vacíos
   * @param {string} text - Texto a analizar
   * @returns {number} Número de palabras
   */
  const getWordCount = (text) => {
    if (!text || text.trim() === '') return 0
    return text.trim().split(/\s+/).length // Divide por espacios y cuenta
  }

  /**
   * Cuenta el número de caracteres en un texto
   * @param {string} text - Texto a analizar
   * @returns {number} Número de caracteres
   */
  const getCharacterCount = (text) => {
    return text ? text.length : 0
  }

  /**
   * Genera un ID corto de 4 dígitos basado en el ID original
   * @param {string} id - ID original de la nota
   * @returns {string} ID corto de 4 dígitos
   */
  const getShortId = (id) => {
    // Convierte el ID a número y toma los últimos 4 dígitos
    const numId = parseInt(id) || 0
    return String(numId).slice(-4).padStart(4, '0')
  }

  /**
   * Maneja el clic en el fondo del modal
   * Cierra el modal solo si se hace clic en el backdrop, no en el contenido
   * @param {Event} e - Evento de clic
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  /**
   * Maneja las teclas presionadas
   * Cierra el modal cuando se presiona la tecla ESC
   * @param {KeyboardEvent} e - Evento de teclado
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  // Render
  const created = formatDate(note.createdAt)
  const updated = formatDate(note.updatedAt)
  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="modal-content modal-content--info">
        {/* Header del modal con título y botón de cerrar */}
        <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.8rem 0.8rem 0 0.8rem' }}>
          <h2 style={{ margin: 0, padding: 0 }}>Note Information</h2>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
            style={{ width: 32, height: 32, fontSize: '1.1rem', margin: 0, padding: 0 }}
          >
            {/* Icono X para cerrar */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Cuerpo del modal con la información */}
        <div className="modal-body">
          {/* Sección del título */}
          <div className="info-section">
            <h3>Title</h3>
            <p className="info-value">{note.title}</p>
          </div>
          
          {/* Sección de fecha de creación */}
          <div className="info-section">
            <h3>Created</h3>
            <p className="info-value">{created}</p>
          </div>
          
          {/* Sección de última modificación */}
          <div className="info-section">
            <h3>Last Modified</h3>
            <p className="info-value">{updated}</p>
          </div>
          
          {/* Sección de estadísticas */}
          <div className="info-section">
            <h3>Statistics</h3>
            <div className="stats-grid">
              {/* Contador de palabras */}
              <div className="stat-item">
                <span className="stat-label">Words:</span>
                <span className="stat-value">{getWordCount(note.content)}</span>
              </div>
              
              {/* Contador de caracteres */}
              <div className="stat-item">
                <span className="stat-label">Characters:</span>
                <span className="stat-value">{getCharacterCount(note.content)}</span>
              </div>
              
              {/* ID corto de la nota */}
              <div className="stat-item">
                <span className="stat-label">ID:</span>
                <span className="stat-value id-value">{getShortId(note.id)}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer del modal con botón de cerrar */}
        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 