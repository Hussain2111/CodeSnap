import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express()
app.use(express.json({ limit: '25mb' }))

const PICS_DIR = path.resolve(process.cwd(), 'pictures')
if (!fs.existsSync(PICS_DIR)) fs.mkdirSync(PICS_DIR, { recursive: true })

app.post('/save-picture', (req, res) => {
  try {
    const { filename, data } = req.body
    if (!filename || !data) return res.status(400).json({ error: 'filename and data required' })

    // data should be like 'data:image/jpeg;base64,/9j/4AAQ...'
    const match = data.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
    if (!match) return res.status(400).json({ error: 'invalid image data' })

    const base64 = match[2]
    const buffer = Buffer.from(base64, 'base64')
    const filepath = path.join(PICS_DIR, filename)
    fs.writeFileSync(filepath, buffer)

    return res.json({ ok: true, path: filepath })
  } catch (err) {
    console.error('save-picture error', err)
    return res.status(500).json({ error: String(err) })
  }
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`savePicture server listening on http://localhost:${port}`))
