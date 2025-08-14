import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// サードパーティCookieをセットし、JSを返す（スクリプト埋め込み用）
app.get('/script.js', (c) => {
  c.header('Set-Cookie', 'thirdparty=world; Path=/; SameSite=None; Secure')
  c.header('Content-Type', 'application/javascript')
  return c.body('console.log("third-party script loaded");')
})

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Third-party server running on http://localhost:${info.port}`)
})