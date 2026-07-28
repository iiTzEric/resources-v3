// ============================================
// MODAL
//
// WHAT: Overlay popup that displays any content
// WHEN: Confirmations, forms, image previews,
//       alerts — any popup dialog
// WHY:  One component handles all popup needs
//
// USAGE:
// const [isOpen, setIsOpen] = useState(false)
//
// <Modal
//   isOpen={isOpen}
//   onClose={() => setIsOpen(false)}
//   title="Delete Item"
// >
//   <p>Are you sure?</p>
//   <button onClick={handleDelete}>Confirm</button>
// </Modal>
//
// PROPS:
// isOpen   (bool)     — show or hide modal
// onClose  (function) — called when closed
// title    (string)   — modal heading
// size     (string)   — 'sm' | 'md' | 'lg' default 'md'
// children (node)     — modal content
// ============================================

import { useEffect } from 'react'

const sizes = {
  sm: '380px',
  md: '480px',
  lg: '640px'
}

function Modal({ isOpen, onClose, title, size = 'md', children }) {

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        style={{ maxWidth: sizes[size] }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-header">
          {title && <h2 className="modal-title">{title}</h2>}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal