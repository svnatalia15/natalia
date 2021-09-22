import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import { renderToStaticNodeStream } from 'react-dom/server'
import React from 'react'

import cookieParser from 'cookie-parser'
import config from './config'
import Html from '../client/html'

const { readFile, writeFile } = require('fs/promises')

require('colors')

let Root
try {
  // eslint-disable-next-line import/no-unresolved
  Root = require('../dist/assets/js/ssr/root.bundle').default
} catch {
  console.log('SSR not found. Please run "yarn run build:ssr"'.red)
}

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist/assets')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const [htmlStart, htmlEnd] = Html({
  body: 'separator',
  title: 'Skillcrucial'
}).split('separator')



server.get('/', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

server.get('/tasks', async (req, res) => {
  console.log("HERE")
  const result  = await readFile('./tasks.json');
  res.json(JSON.parse(result))
})

server.post('/tasks', async (req, res) => {
  console.log("HERE")
  const result  = await readFile('./tasks.json')
  const tasks = JSON.parse(result);  
  const newTasks = [...tasks, req.body]
  await writeFile('./tasks.json', JSON.stringify(newTasks))
  const newRusult  = await readFile('./tasks.json');
  res.json(JSON.parse(newRusult))
})

server.put('/tasks/:id', async (req, res) => { 
  const result  = await readFile('./tasks.json')
  const tasks = JSON.parse(result);  
  const newTasks = tasks.map((item, index) => {
    if (index === req.params.id){
      return {...item, status: req.body.status}
    } return item
    
  })
  await writeFile('./tasks.json', JSON.stringify(newTasks))
  const newRusult  = await readFile('./tasks.json');
  res.json(JSON.parse(newRusult))
})

server.get('/*', (req, res) => {
  const appStream = renderToStaticNodeStream(<Root location={req.url} context={{}} />)
  res.write(htmlStart)
  appStream.pipe(res, { end: false })
  appStream.on('end', () => {
    res.write(htmlEnd)
    res.end()
  })
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
