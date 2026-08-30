// ============================================
// useClickOutside
//
// WHAT: Detects clicks outside a referenced
//       element and calls a callback function
// WHEN: Dropdowns, menus, modals, color pickers,
//       any element that should close when you
//       click outside of it
// WHY:  The most common UI interaction pattern
//       prevents users from getting stuck
//       in open dropdowns
//
// USAGE:
// const dropdownRef = useRef(null)
// const [isOpen, setIsOpen] = useState(false)
//
// useClickOutside(dropdownRef, () => setIsOpen(false))
//
// return (
//   <div ref={dropdownRef}>
//     <button onClick={() => setIsOpen(!isOpen)}>
//       Toggle
//     </button>
//     {isOpen && <ul>...</ul>}
//   </div>
// )
//
// PROPS:
// ref      (ref)      — ref attached to the element to watch
// callback (function) — called when outside click detected
// enabled  (bool)     — optionally disable the listener
// ============================================

import { useEffect } from 'react'

function useClickOutside(ref, callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback()
      }
    }

    // Use mousedown for faster feel than click
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [ref, callback, enabled])
}

export default useClickOutside