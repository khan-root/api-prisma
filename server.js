import express from 'express'
import mainRouter from './route/index.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/check', (req, res)=>{
    res.send('check')
})


app.use('/api', mainRouter)
app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`Listen on ${PORT}`)
})