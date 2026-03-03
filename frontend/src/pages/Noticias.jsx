import { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard'
import { getPosts } from '../services/api'
import { GiPawPrint } from 'react-icons/gi'
import { FiSearch } from 'react-icons/fi'

export default function Noticias() {
  const [posts, setPosts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts()
      .then(r => { setPosts(r.data); setFiltered(r.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['Todas', ...new Set(posts.map(p => p.category).filter(Boolean))]

  useEffect(() => {
    let result = posts
    if (category !== 'Todas') result = result.filter(p => p.category === category)
    if (search) result = result.filter(p =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
  }, [search, category, posts])

  return (
    <div className="pt-20 md:pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Noticias</h1>
          <p className="text-primary-100 text-lg">Lo último de PatitasSeguras</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar noticias..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
                  category === cat
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl bg-gray-100 h-72 animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => <NewsCard key={post.slug} post={post} />)}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <GiPawPrint className="text-6xl mx-auto mb-4 text-primary-200" />
            <p className="text-lg">No se encontraron noticias</p>
          </div>
        )}
      </div>
    </div>
  )
}
