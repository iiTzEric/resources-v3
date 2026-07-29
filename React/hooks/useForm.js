// ============================================
// useForm
//
// WHAT: Manages form state, validation and
//       submission in one hook
// WHEN: Any form with multiple fields and
//       validation requirements
// WHY:  Removes repetitive form boilerplate
//       from every component
//
// USAGE:
// const { form, errors, loading, handleChange,
//         handleSubmit, setError } = useForm(
//   // Initial values
//   { name: '', email: '', password: '' },
//
//   // Validation rules
//   {
//     name: (v) => !v ? 'Name required' : null,
//     email: (v) => !v.includes('@') ? 'Invalid email' : null,
//     password: (v) => v.length < 8 ? 'Min 8 chars' : null,
//   },
//
//   // Submit handler
//   async (values) => {
//     await api.post('/api/auth/signup', values)
//     navigate('/login')
//   }
// )
//
// <form onSubmit={handleSubmit}>
//   <input name="email" value={form.email} onChange={handleChange} />
//   {errors.email && <p>{errors.email}</p>}
//   <button disabled={loading}>Submit</button>
// </form>
// ============================================

import { useState } from 'react'

function useForm(initialValues = {}, validationRules = {}, onSubmit) {
  const [form, setForm] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value

    setForm(prev => ({ ...prev, [name]: newValue }))

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  // Validate a single field
  const validateField = (name, value) => {
    const rule = validationRules[name]
    return rule ? rule(value, form) : null
  }

  // Validate all fields
  const validateAll = () => {
    const newErrors = {}
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, form[name])
      if (error) newErrors[name] = error
    })
    return newErrors
  }

  // Handle blur — validate on leave
  const handleBlur = (e) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    // Validate all fields
    const newErrors = validateAll()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await onSubmit(form)
    } catch (err) {
      setSubmitError(
        err.response?.data?.message || 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  // Manually set a field value
  const setValue = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Manually set an error
  const setError = (name, message) => {
    setErrors(prev => ({ ...prev, [name]: message }))
  }

  // Reset form to initial values
  const reset = () => {
    setForm(initialValues)
    setErrors({})
    setSubmitError(null)
  }

  return {
    form,
    errors,
    loading,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    setValue,
    setError,
    reset
  }
}

export default useForm