// ============================================
// SEARCH BAR
//
// WHAT: Search input with optional category
//       filter dropdown
// WHEN: Any page with a filterable list
// WHY:  Reusable search + filter in one component
//       works for any data type
//
// USAGE:
// const [search, setSearch] = useState('')
// const [category, setCategory] = useState('')
//
// <SearchBar
//   search={search}
//   onSearch={setSearch}
//   category={category}
//   onCategory={setCategory}
//   categories={['Music', 'Tech', 'Cooking']}
//   placeholder="Search listings..."
// />
//
// // Filter your data
// const filtered = items.filter(item => {
//   const matchSearch = item.title
//     .toLowerCase().includes(search.toLowerCase())
//   const matchCategory = !category ||
//     item.category === category
//   return matchSearch && matchCategory
// })
//
// PROPS:
// search       (string)   — search value
// onSearch     (function) — update search
// category     (string)   — selected category
// onCategory   (function) — update category
// categories   (array)    — list of category strings
// placeholder  (string)   — input placeholder text
// ============================================

function SearchBar({
  search = '',
  onSearch,
  category = '',
  onCategory,
  categories = [],
  placeholder = 'Search...'
}) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        {search && (
          <button
            className="search-clear"
            onClick={() => onSearch('')}
          >
            ✕
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <select
          className="category-select"
          value={category}
          onChange={e => onCategory(e.target.value)}
        >
          <option value="">All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      )}
    </div>
  )
}

export default SearchBar