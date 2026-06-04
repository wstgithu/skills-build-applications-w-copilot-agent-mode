import express from 'express'
import { connectDatabase } from './config/database'
import usersRouter from './routes/users'
import activitiesRouter from './routes/activities'
import teamsRouter from './routes/teams'
import leaderboardRouter from './routes/leaderboard'

const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  next()
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/users', usersRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/leaderboard', leaderboardRouter)

async function start() {
  try {
    await connectDatabase()
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  } catch (err) {
    console.error('Failed to start server', err)
    process.exit(1)
  }
}

start()
