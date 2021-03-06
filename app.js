require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const logger = require('morgan')
const cors = require('cors')
const expressValidator = require('express-validator')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const authorRouter = require('./routes/author')
const bookRouter = require('./routes/book')

const app = express()

app.use(cors())
app.use(fileUpload())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(expressValidator())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/author', authorRouter)
app.use('/book', bookRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500).json({message : err.message })
})

module.exports = app
