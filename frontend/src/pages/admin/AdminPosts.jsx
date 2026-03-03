import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPostsAdmin, deletePost, updatePost } from '../../services/api'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    getPostsAdmin().then(r => setPosts(r.data)).finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (slug) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    await deletePost(slug)
    load()
  }

  const toggleStatus = async (post) => {
    const status = post.status === 'published' ? 'draft' : 'published'
    await updatePost(post.slug, { ...post, status })
    load()
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-800">Noticias</h1>
          <p className="text-gray-500 text-sm">{posts.length} en total</p>
        </div>
        <Link to="/admin/posts/nuevo" className="btn-primary flex items-center gap-2 text-sm">
          <FiPlus /> Nueva noticia
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="bg-white h-16 rounded-xl animate-pulse" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <FiPlus className="mx-auto mb-3" size={40} />
          <p>No hay noticias aún</p>
          <Link to="/admin/posts/nuevo" className="btn-primary mt-4 inline-block text-sm">
            Crear primera noticia
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-6 py-4 font-medium text-gray-500">Título</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500 hidden sm:table-cell">Fecha</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500 hidden md:table-cell">Categoría</th>
                <th className="text-left px-6 py-4 font-medium text-gray-500">Estado</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map(post => (
                <tr key={post.slug} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800 max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4 text-gray-400 hidden sm:table-cell">
                    {post.date && format(new Date(post.date), "d MMM yyyy", { locale: es })}
                  </td>
                  <td className="px-6 py-4 text-gray-400 hidden md:table-cell">{post.category || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {post.status === 'published' ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => toggleStatus(post)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                        title={post.status === 'published' ? 'Despublicar' : 'Publicar'}
                      >
                        {post.status === 'published' ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                      </button>
                      <Link
                        to={`/admin/posts/editar/${post.slug}`}
                        className="p-2 hover:bg-blue-50 rounded-lg text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug)}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
