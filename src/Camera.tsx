import { useEffect, useRef, useState } from 'react'

type Props = {
  onClose: () => void
}

export default function Camera({ onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [captured, setCaptured] = useState<string | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [extractedCode, setExtractedCode] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        })
        if (!mounted) return
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setError(null)
      } catch (e: any) {
        console.error('Camera error', e)
        setError(e?.message || 'Unable to access camera')
      }
    }

    startCamera()

    return () => {
      mounted = false
      // stop tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
    }
  }, [])

  function capture() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const data = canvas.toDataURL('image/jpeg', 0.92)
    setCaptured(data)
    // stop camera stream to "freeze" frame and release device
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }

  function retake() {
    setCaptured(null)
    // restart camera stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false })
      .then((stream) => {
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play().catch(() => {})
        }
      })
      .catch((e) => setError(e?.message || 'Unable to access camera'))
  }

  async function selectThis() {
    if (!captured) return
    const ts = Date.now()
    const filename = `codesnap-${ts}.jpg`
    // Prefer File System Access API when available (Chromium-based browsers)
    try {
      // @ts-ignore - showDirectoryPicker may not exist in all browsers
      if (window.showDirectoryPicker) {
        // Ask user to pick the repository folder (where your CodeSnap repo is located).
        // The picker must be pointed at the repo root so we can create/update the `pictures` folder there.
        // Note: Browsers require user interaction for this and handles are not persisted automatically.
        const proceed = window.confirm('To save directly into your local repository, please select your CodeSnap repository folder in the next dialog. Select OK to continue.')
        if (!proceed) throw new Error('user cancelled')

        // @ts-ignore
        const rootHandle: FileSystemDirectoryHandle = await window.showDirectoryPicker()
        // create or open `pictures` subdirectory inside the selected folder
        const picturesHandle = await rootHandle.getDirectoryHandle('pictures', { create: true })
        const fileHandle = await picturesHandle.getFileHandle(filename, { create: true })
        const writable = await fileHandle.createWritable()

        // data is a data URL like 'data:image/jpeg;base64,...'
        const base64 = captured.split(',')[1]
        const buffer = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
        await writable.write(buffer)
        await writable.close()

        alert(`Saved ${filename} to selected-folder/pictures (check your repo folder)`)
        return
      }
    } catch (err) {
      console.warn('File System Access API save failed or was cancelled', err)
      // fall through to download fallback
    }

    // Fallback: trigger browser download (user chooses location)
    const a = document.createElement('a')
    a.href = captured
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function analyzeImage() {
    if (!captured) return
    setExtracting(true)
    setExtractedCode(null)
    try {
      const API_BASE = (import.meta as any).env.VITE_API_BASE || 'https://code-snap-backend.vercel.app'
      const url = `${API_BASE}/extract`
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: captured }),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Extraction failed')
      }
      const json = await res.json()
      if (json.error) {
        throw new Error(json.error)
      }
      const displayText = json.code ? `Language: ${json.language}\n\n${json.code}` : 'No code extracted'
      setExtractedCode(displayText)
    } catch (err: any) {
      setExtractedCode(`ERROR: ${err?.message || String(err)}`)
    } finally {
      setExtracting(false)
    }
  }

  return (
    <div className="camera-page">
      <div className="camera-top">
        <button className="btn-ghost" onClick={onClose} aria-label="Close camera">Back</button>
        <div className="camera-title">Camera</div>
        <div />
      </div>

      <div className="video-wrap">
        {error ? (
          <div className="camera-error">{error}</div>
        ) : (
          <>
            {!captured && <video ref={videoRef} className="camera-video" playsInline muted />}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {captured && (
              <div className="capture-preview">
                <img src={captured} alt="capture preview" />
              </div>
            )}
          </>
        )}
      </div>

      <div className="camera-controls">
        {!captured ? (
          <button className="capture-btn" onClick={capture} aria-label="Capture photo">
            <span className="inner" />
          </button>
        ) : (
          <div className="capture-actions">
            <button className="btn" onClick={retake}>Retake</button>
            <a className="btn primary" href={captured} download="codesnap.jpg">Download</a>
            <button className="btn" onClick={analyzeImage} disabled={extracting}>
              {extracting ? 'Analyzing…' : 'Analyze'}
            </button>
          </div>
        )}
      </div>

      {extractedCode !== null && (
        <div className="extracted-panel">
          <h3>Extracted Code</h3>
          <pre className="extracted-code">{extractedCode}</pre>
        </div>
      )}
    </div>
  )
}
