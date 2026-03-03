import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1200&q=80',
    title: 'Cada animal merece un hogar',
    subtitle: 'En PatitasSeguras encontramos familias llenas de amor para cada mascota.',
    cta: 'Adoptar ahora',
    link: '/contacto'
  },
  {
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80',
    title: 'Sé su héroe',
    subtitle: 'Apadrina a un animal y cambia su vida para siempre.',
    cta: 'Conoce más',
    link: '/nosotros'
  },
  {
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=1200&q=80',
    title: 'Tu donación salva vidas',
    subtitle: 'Cada aporte nos ayuda a brindar atención veterinaria y alimentación.',
    cta: 'Donar',
    link: '/contacto'
  }
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((index) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setTransitioning(false)
    }, 300)
  }, [transitioning])

  const prev = () => go((current - 1 + slides.length) % slides.length)
  const next = useCallback(() => go((current + 1) % slides.length), [current, go])

  useEffect(() => {
    const t = setTimeout(next, 5000)
    return () => clearTimeout(t)
  }, [next])

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden bg-gray-900 mt-16 md:mt-20">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className={`max-w-xl transition-all duration-700 ${
                i === current && !transitioning ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-lg text-gray-200 mb-8">{slide.subtitle}</p>
                <Link to={slide.link} className="btn-primary text-base">
                  {slide.cta} 🐾
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm">
        <FiChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all backdrop-blur-sm">
        <FiChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'w-8 bg-primary-400' : 'w-2 bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
