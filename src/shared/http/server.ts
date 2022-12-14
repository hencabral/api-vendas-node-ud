import 'reflect-metadata'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'
import routes from './routes'
import AppError from '@shared/errors/AppError'
import '@shared/typeorm'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use(errors())

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  })
})

app.listen(3333, () => console.log('Server started on port 3333!'))
