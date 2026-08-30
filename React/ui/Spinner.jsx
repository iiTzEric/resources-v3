// ============================================
// SPINNER
//
// WHAT: Loading indicator for async operations
// WHEN: Fetching data, submitting forms,
//       any operation that takes time
// WHY:  Tells users something is happening
//
// USAGE:
// // Full page
// if (loading) return <Spinner />
//
// // Centered full page
// if (loading) return <Spinner fullPage />
//
// // Small inline
// <Spinner size="sm" />
//
// // Inside button
// <button disabled={loading}>
//   {loading ? <Spinner size="sm" /> : 'Submit'}
// </button>
//
// PROPS:
// size     (string)  — 'sm' | 'md' | 'lg' default 'md'
// fullPage (bool)    — center on full screen
// color    (string)  — CSS color, default uses accent var
// ============================================

function Spinner({ size = 'md', fullPage = false, color }) {
  const spinner = (
    <div
      className={`spinner spinner-${size}`}
      style={color ? { borderTopColor: color } : undefined}
    />
  )

  if (fullPage) {
    return (
      <div className="spinner-fullpage">
        {spinner}
      </div>
    )
  }

  return spinner
}

export default Spinner