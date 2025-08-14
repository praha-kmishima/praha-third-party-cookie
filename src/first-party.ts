import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

// 先にサードパーティーのAPIをngrokでURL生成して、生成されたURLに書き換える
const thirdPartyScriptUrl = 'https://organic-parakeet-g6774gqvv4xc9pv5-8000.app.github.dev/script.js'

app.get('/', (c) => {
  c.header('Set-Cookie', 'firstparty=hello; Path=/; SameSite=Lax')
  return c.html(`
    <html>
      <body>
        <h1>First Party Page</h1>
        <script src="${thirdPartyScriptUrl}"></script>
      </body>
    </html>
  `)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`First-party server running on http://localhost:${info.port}`)
})