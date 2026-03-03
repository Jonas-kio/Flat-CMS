import { Link } from 'react-router-dom'
import { GiPawPrint } from 'react-icons/gi'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GiPawPrint className="text-primary-400 text-2xl" />
              <span className="font-heading font-bold text-white text-xl">PatitasSeguras</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Refugio de animales comprometido con dar un hogar seguro y lleno de amor a cada patita necesitada.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaWhatsapp size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Inicio'],
                ['/noticias', 'Noticias'],
                ['/galeria', 'Galería'],
                ['/nosotros', 'Nosotros'],
                ['/contacto', 'Contacto'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-primary-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">¿Cómo ayudar?</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contacto" className="hover:text-primary-400 transition-colors">Adoptar un animal</Link></li>
              <li><Link to="/contacto" className="hover:text-primary-400 transition-colors">Ser padrino</Link></li>
              <li><Link to="/contacto" className="hover:text-primary-400 transition-colors">Hacer una donación</Link></li>
              <li><Link to="/contacto" className="hover:text-primary-400 transition-colors">Voluntariado</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MdLocationOn className="text-primary-400 flex-shrink-0" />
                <span>Cochabamba, Bolivia</span>
              </li>
              <li className="flex items-center gap-2">
                <MdPhone className="text-primary-400 flex-shrink-0" />
                <span>+591 74303768</span>
              </li>
              <li className="flex items-center gap-2">
                <MdEmail className="text-primary-400 flex-shrink-0" />
                <span>contacto@patitasseguras.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PatitasSeguras. Todos los derechos reservados.</p>
          <Link to="/admin" className="hover:text-gray-400 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
