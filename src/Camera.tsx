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
  }

  function retake() {
    setCaptured(null)
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
            <video ref={videoRef} className="camera-video" playsInline muted />
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
          </div>
        )}
      </div>
    </div>
  )
}
