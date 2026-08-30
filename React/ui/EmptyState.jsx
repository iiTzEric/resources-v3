// ============================================
// EMPTY STATE
//
// WHAT: Placeholder shown when no data exists
// WHEN: Empty lists, no search results,
//       first time user with no content yet
// WHY:  Better UX than blank screen — guides
//       users on what to do next
//
// USAGE:
// {items.length === 0 && (
//   <EmptyState
//     icon="📋"
//     title="No listings yet"
//     message="Be the first to add one!"
//     action={{ label: 'Add Listing', to: '/add' }}
//   />
// )}
//
// // Without action button
// <EmptyState
//   icon="🔍"
//   title="No results found"
//   message="Try a different search term"
// />
//
// PROPS:
// icon     (string)   — emoji or any string
// title    (string)   — main heading
// message  (string)   — subtext, optional
// action   (object)   — { label, to, onClick } optional
// ============================================

import { Link } from 'react-router-dom'

function EmptyState({ icon, title, message, action }) {
  return (
    <div className="empty-state">
      {icon && <div className="empty-icon">{icon}</div>}
      <h3 className="empty-title">{title}</h3>
      {message && <p className="empty-message">{message}</p>}
      {action && (
        action.to ? (
          <Link to={action.to} className="btn-primary">
            {action.label}
          </Link>
        ) : (
          <button onClick={action.onClick} className="btn-primary">
            {action.label}
          </button>
        )
      )}
    </div>
  )
}

export default EmptyState