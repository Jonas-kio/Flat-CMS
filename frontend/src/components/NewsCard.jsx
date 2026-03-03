import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { FiCalendar, FiArrowRight } from 'react-icons/fi'

export default function NewsCard({ post }) {
  const date = post.date ? format(new Date(post.date), "d 'de' MMMM, yyyy", { locale: es }) : ''

  return (
    <article className="card group flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden bg-gray-100">
        {post.image ? (
          <img
            src={post.image.startsWith('http') ? post.image : post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-4xl">
            🐾
          </div>
        )}
        {post.category && (
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <FiCalendar size={12} />
          <span>{date}</span>
        </div>
        <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>
        )}
        <Link
          to={`/noticias/${post.slug}`}
          className="mt-4 inline-flex items-center gap-2 text-primary-500 font-medium text-sm hover:gap-3 transition-all"
        >
          Leer más <FiArrowRight size={14} />
        </Link>
      </div>
    </article>
  )
}
