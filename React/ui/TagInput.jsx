// ============================================
// TAG INPUT
//
// WHAT: Input that lets users add and remove
//       tags stored as an array
// WHEN: Skills, keywords, categories, interests
//       — any time you need multiple string values
// WHY:  Better UX than comma-separated input —
//       users see and remove individual tags
//
// USAGE:
// const [tags, setTags] = useState([])
//
// <TagInput
//   tags={tags}
//   onChange={setTags}
//   placeholder="Add a skill..."
//   maxTags={10}
// />
//
// // tags will be an array like:
// // ['React', 'Node', 'Python']
//
// PROPS:
// tags        (array)    — current tags
// onChange    (function) — receives new tags array
// placeholder (string)   — input placeholder
// maxTags     (number)   — max tags allowed, default unlimited
// allowDupes  (bool)     — allow duplicate tags, default false
// ============================================

import { useState } from 'react'

function TagInput({
  tags = [],
  onChange,
  placeholder = 'Add a tag...',
  maxTags,
  allowDupes = false
}) {
  const [input, setInput] = useState('')

  const addTag = (value) => {
    const tag = value.trim().replace(/,/g, '')
    if (!tag) return
    if (!allowDupes && tags.includes(tag)) return
    if (maxTags && tags.length >= maxTags) return
    onChange([...tags, tag])
    setInput('')
  }

  const removeTag = (index) => {
    onChange(tags.filter((_, i) => i !== index))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    }
    if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const isMaxed = maxTags && tags.length >= maxTags

  return (
    <div className="tag-input">
      <div className={`tag-list ${isMaxed ? 'tag-list-full' : ''}`}>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => removeTag(index)}
              aria-label={`Remove ${tag}`}
            >
              ✕
            </button>
          </span>
        ))}
        {!isMaxed && (
          <input
            type="text"
            className="tag-input-field"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addTag(input)}
            placeholder={tags.length === 0 ? placeholder : ''}
          />
        )}
      </div>
      <p className="tag-hint">
        {isMaxed
          ? `Maximum ${maxTags} tags reached`
          : 'Press Enter or comma to add'
        }
      </p>
    </div>
  )
}

export default TagInput