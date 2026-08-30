// ============================================
// usePagination
//
// WHAT: Manages pagination state and slices
//       data into pages automatically
// WHEN: Any list with more items than
//       you want to show at once
// WHY:  Removes repetitive pagination logic
//       from every list component
//
// USAGE:
// const {
//   page,
//   totalPages,
//   paginated,
//   goToPage,
//   nextPage,
//   prevPage,
//   canNext,
//   canPrev
// } = usePagination(items, 10)
//
// // Render current page items
// paginated.map(item => <Card key={item.id} {...item} />)
//
// // Render pagination controls
// <button onClick={prevPage} disabled={!canPrev}>Prev</button>
// <span>{page} / {totalPages}</span>
// <button onClick={nextPage} disabled={!canNext}>Next</button>
//
// PROPS:
// items       (array)  — full list of items
// itemsPerPage (number) — items per page, default 10
//
// RETURNS:
// page       (number)   — current page (1-indexed)
// totalPages (number)   — total number of pages
// paginated  (array)    — items for current page
// goToPage   (function) — go to specific page
// nextPage   (function) — go to next page
// prevPage   (function) — go to previous page
// canNext    (bool)     — false if on last page
// canPrev    (bool)     — false if on first page
// ============================================

import { useState, useMemo } from 'react'

function usePagination(items = [], itemsPerPage = 10) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage))

  // Reset to page 1 when items change
  // (e.g. when search results update)
  useMemo(() => {
    setPage(1)
  }, [items.length])

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return items.slice(start, start + itemsPerPage)
  }, [items, page, itemsPerPage])

  const goToPage = (n) => {
    const clamped = Math.min(Math.max(1, n), totalPages)
    setPage(clamped)
  }

  const nextPage = () => goToPage(page + 1)
  const prevPage = () => goToPage(page - 1)

  return {
    page,
    totalPages,
    paginated,
    goToPage,
    nextPage,
    prevPage,
    canNext: page < totalPages,
    canPrev: page > 1
  }
}

export default usePagination