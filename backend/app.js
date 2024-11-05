import express from "express"
import cors from "cors"
import db from "./database/db.js"
import blogRoutes from "./routes/routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use('/blogs', blogRoutes)

try{
    await db.authenticate()
    console.log('Exito')
}catch(error){
    console.log('Fracaso: ${error}')
}

app.get('/', (req, res) =>{
    res.send('Hola mundo')
})

app.listen(8000, () =>{
    console.log('Server UP running in http://localhost:8000/')
})