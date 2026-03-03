import { Link } from 'react-router-dom'

export default function Nosotros() {
  return (
    <div className="pt-20 md:pt-24">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Nosotros</h1>
          <p className="text-primary-100 text-lg">Conoce nuestra historia y misión</p>
        </div>
      </div>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-heading text-3xl font-bold mb-4">Nuestra historia</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                PatitasSeguras nació de un sueño simple: que ningún animal tenga que vivir en la calle o sufrir maltrato. 
                Desde nuestros inicios, hemos rescatado, rehabilitado y dado en adopción a cientos de animales en La Paz, Bolivia.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Somos un equipo de voluntarios apasionados que dedicamos nuestro tiempo y recursos a esta causa tan importante.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=600&q=80"
                alt="Nuestro equipo"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {[
              { emoji: '', title: 'Misión', desc: 'Rescatar, rehabilitar y dar en adopción a animales en situación de vulnerabilidad, promoviendo la tenencia responsable.' },
              { emoji: '', title: 'Visión', desc: 'Una Bolivia donde todos los animales son tratados con respeto y amor, libres del abandono y el maltrato.' },
              { emoji: '', title: 'Valores', desc: 'Amor incondicional, responsabilidad, transparencia y compromiso con el bienestar animal.' },
            ].map(({ emoji, title, desc }, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-heading text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contacto" className="btn-primary text-lg">Únete a nuestra causa 🐾</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
