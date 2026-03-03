import { useState, useEffect } from 'react'
import { getMedia } from '../services/api'
import { FiX, FiZoomIn } from 'react-icons/fi'

export default function Galeria() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getMedia()
      .then(r => setImages(r.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Example placeholder if no images
  const displayImages = images.length > 0 ? images : []

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Galería</h1>
          <p className="text-primary-100 text-lg">Momentos especiales de nuestras patitas</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : displayImages.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayImages.map((img, i) => (
              <button
                key={img.filename || i}
                onClick={() => setSelected(img)}
                className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100"
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <div className="text-6xl mb-4"></div>
            <p className="text-lg">La galería estará disponible próximamente</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
            onClick={() => setSelected(null)}
          >
            <FiX size={24} />
          </button>
          <img
            src={selected.url}
            alt=""
            className="max-w-full max-h-full rounded-xl"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
