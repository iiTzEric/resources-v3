// ============================================
// FOOTER
//
// WHAT: Simple site footer with links
//       and copyright text
// WHEN: Bottom of every page
// WHY:  Consistent footer across all pages
//
// USAGE:
// // In App.jsx after Routes
// <Footer
//   logo="MyApp"
//   links={[
//     { to: '/', label: 'Home' },
//     { to: '/about', label: 'About' },
//     { to: '/contact', label: 'Contact' },
//   ]}
// />
//
// PROPS:
// logo  (string) — app name
// links (array)  — [{ to, label }] footer links
// ============================================

import { Link } from 'react-router-dom'

function Footer({ logo = 'App', links = [] }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">{logo}</Link>

        {links.length > 0 && (
          <div className="footer-links">
            {links.map(link => (
              <Link key={link.to} to={link.to} className="footer-link">
                {link.label}
              </Link>
            ))}
          </div>
        )}

        <p className="footer-copy">
          © {year} {logo}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer