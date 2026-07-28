// ============================================
// PAGINATION
//
// WHAT: Page navigation for long lists
// WHEN: Any list with more items than itemsPerPage
// WHY:  Loading all items at once is slow —
//       pagination keeps UI fast and clean
//
// USAGE:
// const [page, setPage] = useState(1)
// const itemsPerPage = 10
// const totalPages = Math.ceil(items.length / itemsPerPage)
//
// const paginated = items.slice(
//   (page - 1) * itemsPerPage,
//   page * itemsPerPage
// )
//
// {paginated.map(item => <Card key={item.id} {...item} />)}
//
// <Pagination
//   page={page}
//   totalPages={totalPages}
//   onPageChange={setPage}
// />
//
// PROPS:
// page         (number)   — current page number
// totalPages   (number)   — total number of pages
// onPageChange (function) — called with new page number
// maxButtons   (number)   — max page buttons shown, default 5
// ============================================

function Pagination({ page, totalPages, onPageChange, maxButtons = 5 }) {
  if (totalPages <= 1) return null

  // Calculate range of page buttons to show
  const half = Math.floor(maxButtons / 2)
  let start = Math.max(1, page - half)
  let end = Math.min(totalPages, start + maxButtons - 1)

  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1)
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  )

  return (
    <div className="pagination">
      {/* Previous */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        ← Prev
      </button>

      {/* First page if not visible */}
      {start > 1 && (
        <>
          <button
            className="pagination-page"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="pagination-dots">...</span>}
        </>
      )}

      {/* Page buttons */}
      {pages.map(p => (
        <button
          key={p}
          className={`pagination-page ${p === page ? 'active' : ''}`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      {/* Last page if not visible */}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="pagination-dots">...</span>
          )}
          <button
            className="pagination-page"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next →
      </button>
    </div>
  )
}

export default Pagination