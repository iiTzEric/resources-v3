// ============================================
// CONFIRM DIALOG
//
// WHAT: Modal that asks user to confirm
//       a destructive or important action
// WHEN: Before deleting, before leaving page,
//       before any irreversible action
// WHY:  Prevents accidental destructive actions
//       Better than window.confirm()
//
// USAGE:
// const [confirm, setConfirm] = useState(null)
//
// // Trigger it
// setConfirm({
//   title: 'Delete listing?',
//   message: 'This cannot be undone.',
//   onConfirm: () => handleDelete(id)
// })
//
// // In JSX
// <ConfirmDialog
//   confirm={confirm}
//   onClose={() => setConfirm(null)}
// />
//
// PROPS:
// confirm  (object | null) — { title, message, onConfirm,
//                             confirmLabel, cancelLabel }
// onClose  (function)      — clears the dialog
// ============================================

function ConfirmDialog({ confirm, onClose }) {
  if (!confirm) return null

  const handleConfirm = () => {
    confirm.onConfirm()
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {confirm.title || 'Are you sure?'}
          </h2>
        </div>
        <div className="modal-body">
          {confirm.message && (
            <p className="confirm-message">{confirm.message}</p>
          )}
          <div className="confirm-actions">
            <button className="btn-outline" onClick={onClose}>
              {confirm.cancelLabel || 'Cancel'}
            </button>
            <button className="btn-danger" onClick={handleConfirm}>
              {confirm.confirmLabel || 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog