import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Noticias from './pages/Noticias'
import NoticiaDetalle from './pages/NoticiaDetalle'
import Galeria from './pages/Galeria'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Admin from './pages/admin/Admin'
import AdminPosts from './pages/admin/AdminPosts'
import AdminPostEdit from './pages/admin/AdminPostEdit'
import AdminMedia from './pages/admin/AdminMedia'
import AdminSettings from './pages/admin/AdminSettings'
import AdminLayout from './components/AdminLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="noticias/:slug" element={<NoticiaDetalle />} />
          <Route path="galeria" element={<Galeria />} />
          <Route path="nosotros" element={<Nosotros />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/nuevo" element={<AdminPostEdit />} />
          <Route path="posts/editar/:slug" element={<AdminPostEdit />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
