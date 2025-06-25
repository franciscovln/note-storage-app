'use client'

// Modal de confirmación reutilizable
export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop" tabIndex={-1}>
      <div className="modal-content" style={{ maxWidth: 360 }}>
        <div className="modal-header">
          <h2>Confirmation</h2>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '1rem', color: '#1e293b', textAlign: 'center' }}>{message}</p>
        </div>
        <div className="modal-footer" style={{ justifyContent: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={onCancel} style={{ minWidth: 100 }}>Cancel</button>
          <button className="btn btn-blue" onClick={onConfirm} style={{ minWidth: 100 }}>Confirm</button>
        </div>
      </div>
    </div>
  )
} 