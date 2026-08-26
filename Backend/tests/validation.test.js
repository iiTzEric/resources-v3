const test = require('node:test')
const assert = require('node:assert/strict')
const { rules } = require('../mongodb/middleware/validation')

test('required rejects whitespace-only strings', () => {
  assert.equal(rules.required('title')({ title: '   ' }), 'title is required')
})

test('string rules reject non-string values', () => {
  assert.equal(rules.email('email')({ email: 42 }), 'email must be a valid email')
  assert.equal(rules.minLength('title', 2)({ title: 42 }), 'title must be at least 2 characters')
})

test('number rule rejects empty and non-finite values', () => {
  assert.equal(rules.number('count')({ count: '' }), 'count must be a number')
  assert.equal(rules.number('count')({ count: Infinity }), 'count must be a number')
})