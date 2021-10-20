import { Low, JSONFile } from 'lowdb'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import router from './routes/cars.js'

const carsRouter = router

const PORT = process.env.PORT || 5000

const db = new Low(new JSONFile('./db.json'))

await db.read()
db.data = db.data || { cars: [] }
await db.write()

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cars API',
      version: '1.0.0',
      description: 'A simple Cars API',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const specs = swaggerJSDoc(options)

const app = express()

app.db = db.data.cars

app.use('*/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/cars', carsRouter)

app.listen(PORT, () =>
  console.log(`The server is running on port http://localhost:${PORT}`)
)
