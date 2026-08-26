// ============================================
// USER MODEL
//
// WHAT: Mongoose schema for user accounts
// WHEN: Every app that needs authentication
// WHY:  Defines the shape and validation rules
//       for user data in the database
//
// CUSTOMIZE:
// - Add fields between the markers
// - Add validation rules per field
// - Add methods as needed
//
// IMPORTANT:
// - Never store plain text passwords
// - Always hash with bcrypt before saving
// - Select -password in queries by default
// ============================================

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [50, 'Name must be at most 50 characters']
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false  // never returned in queries by default
  },

  // ── Add custom fields here ───────────────
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },

  avatar: {
    type: String,
    default: ''
  },

  isPro: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  }
  // ─────────────────────────────────────────

}, {
  timestamps: true,   // adds createdAt and updatedAt
  toJSON: {
    transform(doc, ret) {
      delete ret.password  // never send password in JSON
      return ret
    }
  }
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash if password was modified
  if (!this.isModified('password')) return next()

  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Instance method — compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Instance method — get public profile
userSchema.methods.toPublicJSON = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    avatar: this.avatar,
    isPro: this.isPro,
    createdAt: this.createdAt
  }
}

// Static method — find by email with password
userSchema.statics.findByCredentials = async function(email, password) {
  const user = await this.findOne({ email }).select('+password')
  if (!user) throw new Error('Invalid credentials')

  const isMatch = await user.comparePassword(password)
  if (!isMatch) throw new Error('Invalid credentials')

  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User