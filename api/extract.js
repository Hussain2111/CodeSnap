import { GoogleGenerativeAI } from '@google/generative-ai'

// Serverless API to call Gemini Vision and extract code from an image
// Expects JSON POST: { data: 'data:image/jpeg;base64,...' }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return res.status(500).json({ error: 'Missing GEMINI_API_KEY' })

  try {
    const { data } = req.body
    if (!data) return res.status(400).json({ error: 'Missing image data' })

    const match = data.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
    if (!match) return res.status(400).json({ error: 'Invalid data URL' })

    const mimeType = match[1]
    const base64 = match[2]

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const prompt = `Extract ONLY the code from this image. Return exactly the code with original indentation and nothing else — no explanations, no markdown, no backticks. If the image is unreadable, respond with: ERROR: Image quality too low.`

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64, mimeType } }
    ])

    const text = (result?.response?.text && typeof result.response.text === 'function') ? result.response.text() : (result?.response?.text ?? '')

    return res.json({ code: text })
  } catch (err) {
    console.error('extract api error', err)
    return res.status(500).json({ error: String(err) })
  }
}
