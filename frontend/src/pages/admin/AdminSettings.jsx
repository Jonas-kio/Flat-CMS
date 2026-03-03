import { useState, useEffect } from 'react'
import { getSettings, updateSettings, uploadImage } from '../../services/api'
import { FiSave } from 'react-icons/fi'

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSettings().then(r => setSettings(r.data)).finally(() => setLoading(false))
  }, [])

  const set = (field) => (e) => setSettings(s => ({ ...s, [field]: e.target.value }))

  const handleSave = async () => {
    setSaving(true)
    await updateSettings(settings)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="p-6 animate-pulse"><div className="h-8 bg-gray-200 rounded w-1/2" /></div>

  const fields = [
    { label: 'Título del sitio', key: 'title', type: 'text' },
    { label: 'Descripción', key: 'description', type: 'textarea' },
    { label: 'Título hero (portada)', key: 'heroTitle', type: 'text' },
    { label: 'Subtítulo hero', key: 'heroSubtitle', type: 'text' },
    { label: 'Email de contacto', key: 'email', type: 'email' },
    { label: 'Teléfono', key: 'phone', type: 'text' },
    { label: 'Dirección', key: 'address', type: 'text' },
    { label: 'Facebook URL', key: 'facebook', type: 'url' },
    { label: 'Instagram URL', key: 'instagram', type: 'url' },
  ]

  return (
    <div className="p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold text-gray-800">Ajustes del sitio</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <FiSave size={14} />
          {saved ? '¡Guardado!' : saving ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        {fields.map(({ label, key, type }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
            {type === 'textarea' ? (
              <textarea
                value={settings[key] || ''}
                onChange={set(key)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
              />
            ) : (
              <input
                type={type}
                value={settings[key] || ''}
                onChange={set(key)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
