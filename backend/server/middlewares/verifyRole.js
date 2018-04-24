module.exports = (role) => (req, res, next) => {
  if (!req.user) {
    res.status(400).json({
      success: false,
      message: 'unauthorized token',
    })
  }
  if (role === 'all' || req.user.type === role) {
    next();
  } else {
    res.status(400).json({
      success: false,
      message: 'permission denied to the requested resources',
    })
  }
}