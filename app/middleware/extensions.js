require('dotenv').config();
const jwt = require("jsonwebtoken");
const multer = require('multer');

module.exports = {
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      console.log(req.user)
      next()
    })
  },
  refreshToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      const newToken = jwt.sign({
        id: user.id,
        email: user.email
      }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
      res.json({
        error: false,
        message: 'Refresh token success',
        data: {
          token: newToken,
          user: user
        }
      })
    })
  },
  destroyToken: (req, res, next) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken == null) return res.sendStatus(401)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403)
      res.json({
        error: false,
        message: 'Logout success'
      })
    })
  },
  generateAccessToken: (req, res, next) => {
    req.token = req.token || {}
    req.token = jwt.sign({ id: req.user.id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15s'
    })
    next()
  },
  comparePassword: (password, hash) => {
    return bcrypt.compare(password, hash)
  },
  hashPassword: (password) => {
    return bcrypt.hash(password, 10)
  },
  multerStorageUser: (req, res, next) => {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'storage_user/')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    const upload = multer({ storage: storage })
    return upload.single('image')
  }
};
