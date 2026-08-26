function errorHandler(err, req, res, next) {
  if (err.code === 'P2002') {
    return res.status(409).json({ success: false, message: 'A record with that value already exists' })
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Record not found' })
  }

  if (err.code === 'P2003') {
    return res.status(400).json({ success: false, message: 'A related record does not exist' })
  }

  if (err.code === 'P2023') {
    return res.status(400).json({ success: false, message: 'Invalid data format' })
  }

  const status = Number.isInteger(err.status) && err.status >= 400 && err.status <= 599 ? err.status : 500
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error' : err.message
  })
}

module.exports = { errorHandler }
