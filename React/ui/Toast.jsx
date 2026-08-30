// ============================================
// TOAST NOTIFICATION
//
// WHAT: Temporary notification that appears
//       and disappears automatically
// WHEN: After any user action — save, delete,
//       error, success, info
// WHY:  Non-blocking feedback — better than alert()
//
// USAGE:
// const [toast, setToast] = useState(null)
//
// // Show toast
// setToast({ message: 'Saved!', type: 'success' })
// setToast({ message: 'Error!', type: 'error' })
// setToast({ message: 'Note', type: 'info' })
//
// // In JSX
// <Toast toast={toast} onClose={() => setToast(null)} />
//
// PROPS:
// toast   (object | null) — { message, type }
// onClose (function)      — clears the toast
// duration (number)       — ms before auto-close, default 3000
//
// TYPES: 'success' | 'error' | 'info' | 'warning'
// ============================================

import { useEffect } from 'react'

const icons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠'
}

function Toast({ toast, onClose, duration = 3000 }) {

  // Auto-dismiss
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [toast, onClose, duration])

  if (!toast) return null

  return (
    <div className={`toast toast-${toast.type || 'info'}`}>
      <span className="toast-icon">{icons[toast.type] || icons.info}</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onClose}>✕</button>
    </div>
  )
}

export default Toast