const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema.js')
const cors = require('cors')
const port = process.env.PORT || 4000;

const app = express()

app.use(cors())

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true
}));

app.listen(port, () => {
    console.log("server is up")
})