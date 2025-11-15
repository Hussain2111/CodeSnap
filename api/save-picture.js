import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Vercel Serverless Function to save base64 image to S3
// Expects JSON POST: { filename: string, data: string }

const REGION = process.env.AWS_REGION
const BUCKET = process.env.S3_BUCKET

const s3 = new S3Client({ region: REGION })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { filename, data } = req.body
    if (!filename || !data) return res.status(400).json({ error: 'filename and data required' })

    const match = data.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/)
    if (!match) return res.status(400).json({ error: 'invalid image data' })

    const contentType = match[1]
    const base64 = match[2]
    const buffer = Buffer.from(base64, 'base64')

    const key = `pictures/${filename}`

    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: 'public-read',
    })

    await s3.send(cmd)

    // Construct public URL (works if bucket allows public read)
    const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`

    return res.json({ ok: true, url: publicUrl })
  } catch (err) {
    console.error('save-picture api error', err)
    return res.status(500).json({ error: String(err) })
  }
}
