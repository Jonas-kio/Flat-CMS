import { useState, useEffect, lazy, Suspense } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { createPost, updatePost, getPost, uploadImage } from '../../services/api'
import { FiArrowLeft, FiSave, FiEye, FiImage, FiCalendar } from 'react-icons/fi'

// Lazy load Quill to avoid SSR issues
const ReactQuill = lazy(() => import('react-quill'))
import 'react-quill/dist/quill.snow.css'

const CATEGORIES = ['General', 'Rescate', 'Adopción', 'Salud', 'Eventos', 'Donaciones']

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
}

export default function AdminPostEdit() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(slug)

  const [form, setForm] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: 'General',
    status: 'draft',
    date: new Date().toISOString().slice(0, 16)
  })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)

  useEffect(() => {
    if (isEdit) {
      setLoading(true)
      getPost(slug)
        .then(r => setForm({
          ...r.data,
          date: r.data.date ? new Date(r.data.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16)
        }))
        .catch(() => navigate('/admin/posts'))
        .finally(() => setLoading(false))
    }
  }, [slug])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target?.value ?? e })

  const handleSave = async (status) => {
    if (!form.title) return alert('El título es requerido')
    setSaving(true)
    const data = { ...form, status: status || form.status }
    try {
      if (isEdit) {
        await updatePost(slug, data)
      } else {
        await createPost(data)
      }
      navigate('/admin/posts')
    } catch (e) {
      alert('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImageUploading(true)
    try {
      const r = await uploadImage(file)
      setForm(f => ({ ...f, image: r.data.url }))
    } catch {
      alert('Error al subir imagen')
    } finally {
      setImageUploading(false)
    }
  }

  if (loading) return <div className="p-6 animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/2" /></div>

  return (
    <div className="p-4 md:p-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to="/admin/posts" className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
            <FiArrowLeft />
          </Link>
          <h1 className="font-heading text-xl font-bold text-gray-800">
            {isEdit ? 'Editar noticia' : 'Nueva noticia'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="btn-outline text-sm py-2 flex items-center gap-2"
          >
            <FiSave size={14} /> Borrador
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="btn-primary text-sm py-2 flex items-center gap-2"
          >
            <FiEye size={14} /> {saving ? 'Guardando...' : 'Publicar'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          <input
            type="text"
            placeholder="Título de la noticia..."
            value={form.title}
            onChange={set('title')}
            className="w-full px-4 py-3 text-xl font-heading border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300"
          />

          <textarea
            placeholder="Resumen breve (excerpt)..."
            value={form.excerpt}
            onChange={set('excerpt')}
            rows={2}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none text-sm"
          />

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <Suspense fallback={<div className="h-48 animate-pulse bg-gray-50" />}>
              <ReactQuill
                theme="snow"
                value={form.content}
                onChange={set('content')}
                modules={quillModules}
                placeholder="Escribe el contenido de la noticia..."
              />
            </Suspense>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Publicación</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Estado</label>
                <select
                  value={form.status}
                  onChange={set('status')}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  <option value="draft">Borrador</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block flex items-center gap-1">
                  <FiCalendar size={11} /> Fecha de publicación
                </label>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={set('date')}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                />
                <p className="text-xs text-gray-400 mt-1">Si la fecha es futura, se publicará automáticamente.</p>
              </div>
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">Categoría</label>
                <select
                  value={form.category}
                  onChange={set('category')}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-4">Imagen destacada</h3>
            {form.image ? (
              <div className="relative">
                <img src={form.image} alt="" className="w-full h-36 object-cover rounded-xl" />
                <button
                  onClick={() => setForm(f => ({ ...f, image: '' }))}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg"
                >
                  Quitar
                </button>
              </div>
            ) : (
              <label className="block cursor-pointer">
                <div className="border-2 border-dashed border-gray-200 rounded-xl h-28 flex flex-col items-center justify-center text-gray-400 hover:border-primary-300 hover:text-primary-400 transition-colors">
                  {imageUploading ? (
                    <div className="animate-spin text-primary-400">⟳</div>
                  ) : (
                    <>
                      <FiImage size={24} className="mb-2" />
                      <span className="text-xs">Subir imagen</span>
                    </>
                  )}
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            )}
            <div className="mt-3">
              <input
                type="url"
                placeholder="O pega una URL de imagen..."
                value={form.image}
                onChange={set('image')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
