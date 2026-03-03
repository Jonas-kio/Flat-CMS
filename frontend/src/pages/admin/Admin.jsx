import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPostsAdmin, getMedia } from '../../services/api'
import { FiFileText, FiImage, FiPlus } from 'react-icons/fi'

export default function Admin() {
  const [posts, setPosts] = useState([])
  const [media, setMedia] = useState([])

  useEffect(() => {
    getPostsAdmin().then(r => setPosts(r.data)).catch(() => {})
    getMedia().then(r => setMedia(r.data)).catch(() => {})
  }, [])

  const published = posts.filter(p => p.status === 'published').length
  const drafts = posts.filter(p => p.status === 'draft').length

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="font-heading text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Bienvenido al panel de administración de PatitasSeguras 🐾</p>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total noticias', value: posts.length, color: 'bg-blue-50 text-blue-600', icon: FiFileText },
          { label: 'Publicadas', value: published, color: 'bg-green-50 text-green-600', icon: FiFileText },
          { label: 'Borradores', value: drafts, color: 'bg-yellow-50 text-yellow-600', icon: FiFileText },
          { label: 'Imágenes', value: media.length, color: 'bg-purple-50 text-purple-600', icon: FiImage },
        ].map(({ label, value, color, icon: Icon }, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={18} />
            </div>
            <div className="font-heading text-2xl font-bold text-gray-800">{value}</div>
            <div className="text-gray-400 text-sm">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <h2 className="font-semibold text-gray-700 mb-4">Acciones rápidas</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/posts/nuevo" className="btn-primary flex items-center gap-2 text-sm py-2">
            <FiPlus /> Nueva noticia
          </Link>
          <Link to="/admin/media" className="btn-outline flex items-center gap-2 text-sm py-2">
            <FiImage /> Subir imagen
          </Link>
          <Link to="/admin/settings" className="btn-outline flex items-center gap-2 text-sm py-2">
            Configurar sitio
          </Link>
        </div>
      </div>

      {/* Recent posts */}
      {posts.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-700">Noticias recientes</h2>
            <Link to="/admin/posts" className="text-primary-500 text-sm">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {posts.slice(0, 5).map(post => (
              <div key={post.slug} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <div className="font-medium text-gray-700 text-sm">{post.title}</div>
                  <div className="text-xs text-gray-400">{post.category}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {post.status === 'published' ? 'Publicado' : 'Borrador'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
