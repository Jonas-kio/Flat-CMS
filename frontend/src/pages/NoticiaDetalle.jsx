import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPost } from '../services/api'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FiCalendar, FiArrowLeft } from 'react-icons/fi'

export default function NoticiaDetalle() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getPost(slug)
      .then(r => setPost(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="pt-28 container-custom animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
      <div className="h-64 bg-gray-200 rounded-2xl mb-6" />
      <div className="space-y-3">
        {[1,2,3,4].map(i => <div key={i} className="h-4 bg-gray-200 rounded" />)}
      </div>
    </div>
  )

  if (error || !post) return (
    <div className="pt-28 container-custom text-center py-20">
      <p className="text-gray-500 text-lg mb-4">Noticia no encontrada</p>
      <Link to="/noticias" className="btn-primary">Volver a noticias</Link>
    </div>
  )

  return (
    <div className="pt-20 md:pt-24">
      {/* Hero */}
      {post.image && (
        <div className="h-64 md:h-96 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <article className="container-custom max-w-3xl py-10">
        <Link to="/noticias" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-500 mb-6 text-sm">
          <FiArrowLeft /> Volver a noticias
        </Link>

        {post.category && (
          <span className="bg-primary-100 text-primary-600 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-2 text-gray-400 text-sm mb-8 pb-8 border-b border-gray-100">
          <FiCalendar />
          {post.date && format(new Date(post.date), "EEEE d 'de' MMMM, yyyy", { locale: es })}
        </div>

        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-primary-500"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />
      </article>
    </div>
  )
}
