// ============================================
// PAGE WRAPPER
//
// WHAT: Consistent max-width container for
//       page content
// WHEN: Every page that needs centered content
// WHY:  One place to control page width and
//       padding across the whole app
//
// USAGE:
// function Dashboard() {
//   return (
//     <PageWrapper>
//       <h1>Dashboard</h1>
//       ...
//     </PageWrapper>
//   )
// }
//
// // With custom max width
// <PageWrapper maxWidth="600px">
//   <Settings />
// </PageWrapper>
//
// // With top padding removed
// <PageWrapper noPadding>
//   <HeroSection />
// </PageWrapper>
//
// PROPS:
// children  (node)    — page content
// maxWidth  (string)  — CSS max-width, default '900px'
// noPadding (bool)    — remove top/bottom padding
// ============================================

function PageWrapper({
  children,
  maxWidth = '900px',
  noPadding = false
}) {
  return (
    <div
      className={`page-wrapper ${noPadding ? 'no-padding' : ''}`}
      style={{ maxWidth }}
    >
      {children}
    </div>
  )
}

export default PageWrapper