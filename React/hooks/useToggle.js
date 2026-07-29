// ============================================
// useToggle
//
// WHAT: Toggles a boolean value between
//       true and false
// WHEN: Modals, dropdowns, show/hide elements,
//       dark mode, any on/off state
// WHY:  Cleaner than writing
//       setIsOpen(!isOpen) everywhere
//
// USAGE:
// const [isOpen, toggle, setIsOpen] = useToggle(false)
//
// <button onClick={toggle}>Toggle</button>
// <button onClick={() => setIsOpen(true)}>Open</button>
// <button onClick={() => setIsOpen(false)}>Close</button>
//
// // Common patterns
// const [isDark, toggleDark] = useToggle(false)
// const [isMenuOpen, toggleMenu] = useToggle(false)
// const [showPassword, togglePassword] = useToggle(false)
//
// PROPS:
// initialValue (bool) — starting value, default false
//
// RETURNS:
// [value, toggle, setValue]
// value    (bool)     — current value
// toggle   (function) — flips the value
// setValue (function) — set to specific value
// ============================================

import { useState, useCallback } from 'react'

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  // useCallback prevents toggle from being recreated
  // on every render — safe to pass as prop
  const toggle = useCallback(() => setValue(v => !v), [])

  return [value, toggle, setValue]
}

export default useToggle