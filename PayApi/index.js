let express    = require('express')
let logger     = require('morgan')
let bodyParser = require('body-parser')

let app = express()

let pay = require('./routes/pay')
let err404 = require('./routes/err404')
const PORT = process.env.PORT || 5003
const NAME = process.env.NAME || "Pay API"

app.use(logger('dev'))
app.use(bodyParser.json())

/**
Custom solution to catch malformed JSON error
**/
app.use((err, req, res, next) => {
	console.log(err.stack)
	res.status(500).json({
		error: 'Something broke'
	})
})

app.disable('x-powered-by')
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
	next()
})

app.use('/api/v1/pay', pay)
app.use('*', err404)

app.listen(PORT, () => {
	console.log(`${NAME} up and running on port ${PORT} 🎉`)
})
