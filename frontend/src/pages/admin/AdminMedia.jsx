import { useState, useEffect, useRef } from 'react'
import { getMedia, uploadImage, deleteMedia } from '../../services/api'
import { FiUpload, FiTrash2, FiCopy, FiCheck } from 'react-icons/fi'

export default function AdminMedia() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState(null)
  const inputRef = useRef()

  const load = () => {
    getMedia().then(r => setImages(r.data)).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleUpload = async (files) => {
    if (!files || !files.length) return
    setUploading(true)
    for (const file of Array.from(files)) {
      try { await uploadImage(file) } catch {}
    }
    setUploading(false)
    load()
  }

  const handleDelete = async (filename) => {
    if (!confirm('¿Eliminar esta imagen?')) return
    await deleteMedia(filename)
    load()
  }

  const copyUrl = (url) => {
    const full = window.location.origin + url
    navigator.clipboard.writeText(full)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-800">Medios</h1>
          <p className="text-gray-500 text-sm">{images.length} imágenes</p>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <FiUpload size={14} />
          {uploading ? 'Subiendo...' : 'Subir imagen'}
        </button>
        <input
          ref={inputRef} type="file" multiple accept="image/*" className="hidden"
          onChange={e => handleUpload(e.target.files)}
        />
      </div>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center text-gray-400 mb-6 hover:border-primary-300 transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); handleUpload(e.dataTransfer.files) }}
        onDragOver={e => e.preventDefault()}
      >
        <FiUpload size={32} className="mx-auto mb-2" />
        <p className="text-sm">Arrastra imágenes aquí o haz click para subir</p>
        <p className="text-xs mt-1">JPG, PNG, GIF, WEBP · Máx 10MB</p>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {images.map(img => (
            <div key={img.filename} className="group relative aspect-square">
              <img src={img.url} alt="" className="w-full h-full object-cover rounded-xl" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => copyUrl(img.url)}
                  className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                  title="Copiar URL"
                >
                  {copied === img.url ? <FiCheck size={14} className="text-green-500" /> : <FiCopy size={14} />}
                </button>
                <button
                  onClick={() => handleDelete(img.filename)}
                  className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <p>No hay imágenes aún</p>
        </div>
      )}
    </div>
  )
}
