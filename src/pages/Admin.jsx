import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('boletines-mensuales')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  // Estados para formularios
  const [boletinMensual, setBoletinMensual] = useState({
    titulo: '',
    descripcion: '',
    pdf_url: '',
    imagen_url: '',
    año: new Date().getFullYear(),
    mes: new Date().getMonth() + 1
  })

  const [informativoMensual, setInformativoMensual] = useState({
    titulo: '',
    descripcion: '',
    pdf_url: '',
    imagen_url: '',
    año: new Date().getFullYear(),
    mes: new Date().getMonth() + 1
  })

  const [boletinAnual, setBoletinAnual] = useState({
    titulo: '',
    descripcion: '',
    pdf_url: '',
    imagen_url: '',
    año: new Date().getFullYear()
  })

  const [foto, setFoto] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: ''
  })

  // Función para agregar boletín mensual
  const handleAddBoletinMensual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('boletines_mensuales')
        .insert([boletinMensual])
      
      if (error) throw error
      
      setMessage('✅ Boletín mensual agregado exitosamente')
      setBoletinMensual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear(),
        mes: new Date().getMonth() + 1
      })
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  // Función para agregar informativo mensual
  const handleAddInformativoMensual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('informativos_mensuales')
        .insert([informativoMensual])
      
      if (error) throw error
      
      setMessage('✅ Informativo mensual agregado exitosamente')
      setInformativoMensual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear(),
        mes: new Date().getMonth() + 1
      })
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  // Función para agregar boletín anual
  const handleAddBoletinAnual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('boletines_anuales')
        .insert([boletinAnual])
      
      if (error) throw error
      
      setMessage('✅ Boletín anual agregado exitosamente')
      setBoletinAnual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear()
      })
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  // Función para agregar foto
  const handleAddFoto = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase
        .from('fotogaleria')
        .insert([foto])
      
      if (error) throw error
      
      setMessage('✅ Foto agregada exitosamente')
      setFoto({
        titulo: '',
        descripcion: '',
        imagen_url: ''
      })
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Panel de <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Administración</span>
            </h1>
            <p className="text-gray-600">Gestiona el contenido de la Biblioteca Virtual de Ingeniería</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </motion.div>

        {/* Mensaje de estado */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}
          >
            {message}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('boletines-mensuales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'boletines-mensuales'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Boletines Mensuales
            </button>
            <button
              onClick={() => setActiveTab('informativos-mensuales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'informativos-mensuales'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Informativos Mensuales
            </button>
            <button
              onClick={() => setActiveTab('boletines-anuales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'boletines-anuales'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Boletines Anuales
            </button>
            <button
              onClick={() => setActiveTab('fotogaleria')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fotogaleria'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fotogalería
            </button>
          </nav>
        </div>

        {/* Contenido de tabs */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Formulario: Boletines Mensuales */}
          {activeTab === 'boletines-mensuales' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Boletín Mensual</h2>
              <form onSubmit={handleAddBoletinMensual} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      required
                      value={boletinMensual.titulo}
                      onChange={(e) => setBoletinMensual({...boletinMensual, titulo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ej: Boletín de Enero 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL del PDF</label>
                    <input
                      type="url"
                      required
                      value={boletinMensual.pdf_url}
                      onChange={(e) => setBoletinMensual({...boletinMensual, pdf_url: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://ejemplo.com/boletin.pdf"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    required
                    value={boletinMensual.imagen_url}
                    onChange={(e) => setBoletinMensual({...boletinMensual, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={boletinMensual.descripcion}
                    onChange={(e) => setBoletinMensual({...boletinMensual, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción breve del boletín..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                    <input
                      type="number"
                      required
                      value={boletinMensual.año}
                      onChange={(e) => setBoletinMensual({...boletinMensual, año: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min="2020"
                      max="2099"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                    <select
                      value={boletinMensual.mes}
                      onChange={(e) => setBoletinMensual({...boletinMensual, mes: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {meses.map((mes, index) => (
                        <option key={index} value={index + 1}>{mes}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Agregando...' : 'Agregar Boletín Mensual'}
                </button>
              </form>
            </div>
          )}

          {/* Formulario: Informativos Mensuales */}
          {activeTab === 'informativos-mensuales' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Informativo Mensual</h2>
              <form onSubmit={handleAddInformativoMensual} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      required
                      value={informativoMensual.titulo}
                      onChange={(e) => setInformativoMensual({...informativoMensual, titulo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ej: Informativo Enero 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL del PDF</label>
                    <input
                      type="url"
                      required
                      value={informativoMensual.pdf_url}
                      onChange={(e) => setInformativoMensual({...informativoMensual, pdf_url: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://ejemplo.com/informativo.pdf"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    required
                    value={informativoMensual.imagen_url}
                    onChange={(e) => setInformativoMensual({...informativoMensual, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={informativoMensual.descripcion}
                    onChange={(e) => setInformativoMensual({...informativoMensual, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción breve del informativo..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                    <input
                      type="number"
                      required
                      value={informativoMensual.año}
                      onChange={(e) => setInformativoMensual({...informativoMensual, año: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min="2020"
                      max="2099"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mes</label>
                    <select
                      value={informativoMensual.mes}
                      onChange={(e) => setInformativoMensual({...informativoMensual, mes: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      {meses.map((mes, index) => (
                        <option key={index} value={index + 1}>{mes}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Agregando...' : 'Agregar Informativo Mensual'}
                </button>
              </form>
            </div>
          )}

          {/* Formulario: Boletines Anuales */}
          {activeTab === 'boletines-anuales' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Boletín Anual</h2>
              <form onSubmit={handleAddBoletinAnual} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                    <input
                      type="text"
                      required
                      value={boletinAnual.titulo}
                      onChange={(e) => setBoletinAnual({...boletinAnual, titulo: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Ej: Boletín Anual 2025"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL del PDF</label>
                    <input
                      type="url"
                      required
                      value={boletinAnual.pdf_url}
                      onChange={(e) => setBoletinAnual({...boletinAnual, pdf_url: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://ejemplo.com/boletin-anual.pdf"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de Imagen</label>
                  <input
                    type="url"
                    required
                    value={boletinAnual.imagen_url}
                    onChange={(e) => setBoletinAnual({...boletinAnual, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={boletinAnual.descripcion}
                    onChange={(e) => setBoletinAnual({...boletinAnual, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción breve del boletín anual..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                  <input
                    type="number"
                    required
                    value={boletinAnual.año}
                    onChange={(e) => setBoletinAnual({...boletinAnual, año: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="2020"
                    max="2099"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Agregando...' : 'Agregar Boletín Anual'}
                </button>
              </form>
            </div>
          )}

          {/* Formulario: Fotogalería */}
          {activeTab === 'fotogaleria' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agregar Foto a Galería</h2>
              <form onSubmit={handleAddFoto} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    required
                    value={foto.titulo}
                    onChange={(e) => setFoto({...foto, titulo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: Evento de Graduación"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen</label>
                  <input
                    type="url"
                    required
                    value={foto.imagen_url}
                    onChange={(e) => setFoto({...foto, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/foto.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={foto.descripcion}
                    onChange={(e) => setFoto({...foto, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción de la foto..."
                  />
                </div>
                {foto.imagen_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vista Previa</label>
                    <img 
                      src={foto.imagen_url} 
                      alt="Preview" 
                      className="w-full max-w-md rounded-lg shadow-md"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Agregando...' : 'Agregar Foto'}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
