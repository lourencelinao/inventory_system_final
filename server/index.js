const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// middleware
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/items', require('./routes/api/items'))
app.use('/api/actions', require('./routes/api/actions'))
app.use('/api/transactions', require('./routes/api/transactions'))

// port
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})