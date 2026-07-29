// ============================================
// useWindowSize
//
// WHAT: Returns the current window width and
//       height — updates automatically on resize
// WHEN: Responsive logic in JavaScript,
//       conditionally render components based
//       on screen size, canvas sizing
// WHY:  CSS handles most responsive design but
//       sometimes you need the actual pixel
//       value in JavaScript
//
// USAGE:
// const { width, height } = useWindowSize()
//
// // Conditionally render mobile vs desktop
// const isMobile = width < 640
// const isTablet = width >= 640 && width < 1024
// const isDesktop = width >= 1024
//
// return (
//   <div>
//     {isMobile ? <MobileMenu /> : <DesktopMenu />}
//   </div>
// )
//
// RETURNS:
// width  (number) — current window width in px
// height (number) — current window height in px
// ============================================

import { useState, useEffect } from 'react'

function useWindowSize() {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return size
}

export default useWindowSize