import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { GiPawPrint } from 'react-icons/gi'
import { FiHome, FiFileText, FiImage, FiSettings, FiExternalLink, FiGrid } from 'react-icons/fi'

const links = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', end: true },
  { to: '/admin/posts', icon: FiFileText, label: 'Noticias' },
  { to: '/admin/media', icon: FiImage, label: 'Medios' },
  { to: '/admin/settings', icon: FiSettings, label: 'Ajustes' },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-900 text-white">
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <GiPawPrint className="text-primary-400 text-xl" />
            <div>
              <div className="font-heading font-bold text-white">PatitasSeguras</div>
              <div className="text-xs text-gray-400">Panel de administración</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {links.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary-500 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <FiExternalLink size={18} />
            Ver sitio web
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900 text-white z-40 flex items-center gap-3 px-4 h-14">
        <GiPawPrint className="text-primary-400 text-xl" />
        <span className="font-bold text-sm">Admin Panel</span>
        <div className="flex gap-1 ml-auto">
          {links.map(({ to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `p-2 rounded-lg ${isActive ? 'bg-primary-500 text-white' : 'text-gray-400'}`
              }
            >
              <Icon size={16} />
            </NavLink>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  )
}
