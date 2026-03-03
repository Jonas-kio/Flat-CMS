import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import NewsCard from '../components/NewsCard'
import { getPosts } from '../services/api'
import { GiPawPrint } from 'react-icons/gi'
import { FiArrowRight } from 'react-icons/fi'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(r => setPosts(r.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      <HeroSlider />

      {/* Noticias principales */}
      <section className="py-16">
        <div className="container-custom">

          {/* Título sección */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="section-title mb-1">Últimas noticias</h2>
              <p className="text-gray-500">Lo más reciente de PatitasSeguras</p>
            </div>
            <Link to="/noticias" className="btn-outline hidden sm:inline-flex items-center gap-2">
              Ver todas <FiArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-2xl bg-gray-100 h-72 animate-pulse" />
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Noticia destacada */}
              {featured && (
                <div className="mb-8">
                  <Link to={`/noticias/${featured.slug}`} className="group grid md:grid-cols-2 gap-0 card overflow-hidden">
                    <div className="h-64 md:h-80 overflow-hidden bg-gray-100">
                      {featured.image ? (
                        <img
                          src={featured.image}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-6xl">
                          🐾
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      {featured.category && (
                        <span className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-3">
                          {featured.category}
                        </span>
                      )}
                      <h3 className="font-heading text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                        {featured.title}
                      </h3>
                      {featured.excerpt && (
                        <p className="text-gray-500 leading-relaxed mb-4">{featured.excerpt}</p>
                      )}
                      <span className="inline-flex items-center gap-2 text-primary-500 font-medium text-sm">
                        Leer más <FiArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </div>
              )}

              {/* Grid resto de noticias */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(post => <NewsCard key={post.slug} post={post} />)}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <GiPawPrint className="text-5xl mx-auto mb-3 text-primary-200" />
              <p>Pronto tendremos noticias. ¡Vuelve a visitarnos!</p>
            </div>
          )}

          <div className="text-center mt-8 sm:hidden">
            <Link to="/noticias" className="btn-outline">Ver todas las noticias</Link>
          </div>
        </div>
      </section>

      {/* CTA adopción */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="container-custom text-center">
          <GiPawPrint className="text-5xl mx-auto mb-4 text-primary-200" />
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Un pequeño gesto cambia todo
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
            Miles de animales esperan una oportunidad. Tú puedes dársela.
          </p>
          <Link to="/contacto" className="bg-white text-primary-600 font-bold px-8 py-4 rounded-full hover:bg-primary-50 transition-colors shadow-lg">
            Quiero ayudar 🐾
          </Link>
        </div>
      </section>
    </div>
  )
}