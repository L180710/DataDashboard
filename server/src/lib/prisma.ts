import 'dotenv/config'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { PrismaClient } from '../../generated/prisma/client.js'

const requiredEnv = [
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
] as const

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
}

const port = Number(process.env.DATABASE_PORT)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('DATABASE_PORT must be a valid port number')
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
})

export const prisma = new PrismaClient({
  adapter,
})
