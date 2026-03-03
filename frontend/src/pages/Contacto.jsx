import { useState } from 'react'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = () => {
    if (!form.nombre || !form.email || !form.mensaje) return
    
    setSent(true)
  }

  return (
    <div className="pt-20 md:pt-24">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-primary-100 text-lg">Estamos para ayudarte</p>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">¿Cómo puedo ayudar?</h2>
              <div className="space-y-4 mb-8">
                {[
                  { icon: MdLocationOn, label: 'Cochabamba, Bolivia' },
                  { icon: MdPhone, label: '+591 74303768' },
                  { icon: MdEmail, label: 'somos@patitasseguras.org' },
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                      <Icon className="text-primary-500" size={20} />
                    </div>
                    <span className="text-gray-700">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mb-8">
                <a href="#" className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors"><FaFacebook /></a>
                <a href="#" className="w-10 h-10 bg-pink-500 text-white rounded-xl flex items-center justify-center hover:bg-pink-600 transition-colors"><FaInstagram /></a>
                <a href="#" className="w-10 h-10 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-colors"><FaWhatsapp /></a>
              </div>

              <div className="bg-primary-50 rounded-2xl p-6">
                <h3 className="font-semibold text-primary-700 mb-2">🐾 Adopciones</h3>
                <p className="text-gray-600 text-sm">
                  Para iniciar un proceso de adopción, escríbenos o llámanos. Te guiaremos en cada paso.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card p-6">
              {sent ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🐾</div>
                  <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">¡Gracias!</h3>
                  <p className="text-gray-500">Nos pondremos en contacto pronto.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-semibold mb-4">Envíanos un mensaje</h3>
                  <input
                    type="text" name="nombre" placeholder="Tu nombre"
                    value={form.nombre} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                  <input
                    type="email" name="email" placeholder="Tu correo"
                    value={form.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300"
                  />
                  <select
                    name="asunto" value={form.asunto} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 text-gray-600"
                  >
                    <option value="">Selecciona un asunto</option>
                    <option>Adopción</option>
                    <option>Apadrinamiento</option>
                    <option>Donación</option>
                    <option>Voluntariado</option>
                    <option>Otro</option>
                  </select>
                  <textarea
                    name="mensaje" placeholder="Tu mensaje" rows={4}
                    value={form.mensaje} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none"
                  />
                  <button onClick={handleSubmit} className="btn-primary w-full">
                    Enviar mensaje 🐾
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
