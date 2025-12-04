import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

function Admin() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('boletines-mensuales')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Estados para listas
  const [boletinesMensualesList, setBoletinesMensualesList] = useState([])
  const [informativosMensualesList, setInformativosMensualesList] = useState([])
  const [boletinesAnualesList, setBoletinesAnualesList] = useState([])
  const [fotogaleriaAnualesList, setFotogaleriaAnualesList] = useState([])
  const [fotogaleriaSemestralesList, setFotogaleriaSemestralesList] = useState([])

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

  const [fotoAnual, setFotoAnual] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: '',
    link: '',
    año: new Date().getFullYear()
  })

  const [fotoSemestral, setFotoSemestral] = useState({
    titulo: '',
    descripcion: '',
    imagen_url: '',
    link: '',
    año: new Date().getFullYear(),
    semestre: 1
  })

  // Cargar datos al cambiar de tab
  useEffect(() => {
    loadData()
  }, [activeTab])

  const loadData = async () => {
    try {
      if (activeTab === 'boletines-mensuales') {
        const { data, error } = await supabase
          .from('boletines_mensuales')
          .select('*')
          .order('año', { ascending: false })
          .order('mes', { ascending: false })
        if (error) throw error
        setBoletinesMensualesList(data || [])
      } else if (activeTab === 'informativos-mensuales') {
        const { data, error } = await supabase
          .from('informativos_mensuales')
          .select('*')
          .order('año', { ascending: false })
          .order('mes', { ascending: false })
        if (error) throw error
        setInformativosMensualesList(data || [])
      } else if (activeTab === 'boletines-anuales') {
        const { data, error } = await supabase
          .from('boletines_anuales')
          .select('*')
          .order('año', { ascending: false })
        if (error) throw error
        setBoletinesAnualesList(data || [])
      } else if (activeTab === 'fotogaleria-anuales') {
        const { data, error } = await supabase
          .from('fotogaleria_anuales')
          .select('*')
          .order('año', { ascending: false })
        if (error) throw error
        setFotogaleriaAnualesList(data || [])
      } else if (activeTab === 'fotogaleria-semestrales') {
        const { data, error } = await supabase
          .from('fotogaleria_semestrales')
          .select('*')
          .order('año', { ascending: false })
          .order('semestre', { ascending: false })
        if (error) throw error
        setFotogaleriaSemestralesList(data || [])
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  // Función para agregar/editar boletín mensual
  const handleAddBoletinMensual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const { id, created_at, ...updateData } = boletinMensual
        const { error } = await supabase
          .from('boletines_mensuales')
          .update(updateData)
          .eq('id', boletinMensual.id)
        if (error) throw error
        setMessage('✅ Boletín mensual actualizado exitosamente')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('boletines_mensuales')
          .insert([boletinMensual])
        if (error) throw error
        setMessage('✅ Boletín mensual agregado exitosamente')
      }
      
      setBoletinMensual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear(),
        mes: new Date().getMonth() + 1
      })
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const handleDeleteBoletinMensual = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este boletín?')) return
    try {
      const { error } = await supabase
        .from('boletines_mensuales')
        .delete()
        .eq('id', id)
      if (error) throw error
      setMessage('✅ Boletín eliminado exitosamente')
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
  }

  const handleEditBoletinMensual = (item) => {
    setBoletinMensual(item)
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Función para agregar/editar informativo mensual
  const handleAddInformativoMensual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const { id, created_at, ...updateData } = informativoMensual
        const { error } = await supabase
          .from('informativos_mensuales')
          .update(updateData)
          .eq('id', informativoMensual.id)
        if (error) throw error
        setMessage('✅ Informativo mensual actualizado exitosamente')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('informativos_mensuales')
          .insert([informativoMensual])
        if (error) throw error
        setMessage('✅ Informativo mensual agregado exitosamente')
      }
      
      setInformativoMensual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear(),
        mes: new Date().getMonth() + 1
      })
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const handleDeleteInformativoMensual = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este informativo?')) return
    try {
      const { error } = await supabase
        .from('informativos_mensuales')
        .delete()
        .eq('id', id)
      if (error) throw error
      setMessage('✅ Informativo eliminado exitosamente')
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
  }

  const handleEditInformativoMensual = (item) => {
    setInformativoMensual(item)
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Función para agregar/editar boletín anual
  const handleAddBoletinAnual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const { id, created_at, ...updateData } = boletinAnual
        const { error } = await supabase
          .from('boletines_anuales')
          .update(updateData)
          .eq('id', boletinAnual.id)
        if (error) throw error
        setMessage('✅ Boletín anual actualizado exitosamente')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('boletines_anuales')
          .insert([boletinAnual])
        if (error) throw error
        setMessage('✅ Boletín anual agregado exitosamente')
      }
      
      setBoletinAnual({
        titulo: '',
        descripcion: '',
        pdf_url: '',
        imagen_url: '',
        año: new Date().getFullYear()
      })
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const handleDeleteBoletinAnual = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este boletín anual?')) return
    try {
      const { error } = await supabase
        .from('boletines_anuales')
        .delete()
        .eq('id', id)
      if (error) throw error
      setMessage('✅ Boletín anual eliminado exitosamente')
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
  }

  const handleEditBoletinAnual = (item) => {
    setBoletinAnual(item)
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Función para agregar/editar foto anual
  const handleAddFotoAnual = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const { id, created_at, ...updateData } = fotoAnual
        const { error } = await supabase
          .from('fotogaleria_anuales')
          .update(updateData)
          .eq('id', fotoAnual.id)
        if (error) throw error
        setMessage('✅ Foto anual actualizada exitosamente')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('fotogaleria_anuales')
          .insert([fotoAnual])
        if (error) throw error
        setMessage('✅ Foto anual agregada exitosamente')
      }
      
      setFotoAnual({
        titulo: '',
        descripcion: '',
        imagen_url: '',
        link: '',
        año: new Date().getFullYear()
      })
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const handleDeleteFotoAnual = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta foto anual?')) return
    try {
      const { error } = await supabase
        .from('fotogaleria_anuales')
        .delete()
        .eq('id', id)
      if (error) throw error
      setMessage('✅ Foto anual eliminada exitosamente')
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
  }

  const handleEditFotoAnual = (item) => {
    setFotoAnual(item)
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Función para agregar/editar foto semestral
  const handleAddFotoSemestral = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        const { id, created_at, ...updateData } = fotoSemestral
        const { error } = await supabase
          .from('fotogaleria_semestrales')
          .update(updateData)
          .eq('id', fotoSemestral.id)
        if (error) throw error
        setMessage('✅ Foto semestral actualizada exitosamente')
        setEditingId(null)
      } else {
        const { error } = await supabase
          .from('fotogaleria_semestrales')
          .insert([fotoSemestral])
        if (error) throw error
        setMessage('✅ Foto semestral agregada exitosamente')
      }
      
      setFotoSemestral({
        titulo: '',
        descripcion: '',
        imagen_url: '',
        link: '',
        año: new Date().getFullYear(),
        semestre: 1
      })
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
    setLoading(false)
  }

  const handleDeleteFotoSemestral = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta foto semestral?')) return
    try {
      const { error } = await supabase
        .from('fotogaleria_semestrales')
        .delete()
        .eq('id', id)
      if (error) throw error
      setMessage('✅ Foto semestral eliminada exitosamente')
      loadData()
    } catch (error) {
      setMessage('❌ Error: ' + error.message)
    }
  }

  const handleEditFotoSemestral = (item) => {
    setFotoSemestral(item)
    setEditingId(item.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Volver al Inicio
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </button>
          </div>
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
              onClick={() => setActiveTab('fotogaleria-anuales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fotogaleria-anuales'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fotogalería Anuales
            </button>
            <button
              onClick={() => setActiveTab('fotogaleria-semestrales')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'fotogaleria-semestrales'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Fotogalería Semestrales
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
            <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Boletín Mensual' : 'Agregar Boletín Mensual'}
              </h2>
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
                      min="2004"
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
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (editingId ? 'Actualizando...' : 'Agregando...') : (editingId ? 'Actualizar Boletín' : 'Agregar Boletín')}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setBoletinMensual({
                          titulo: '',
                          descripcion: '',
                          pdf_url: '',
                          imagen_url: '',
                          año: new Date().getFullYear(),
                          mes: new Date().getMonth() + 1
                        })
                      }}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Boletines Mensuales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Boletines Mensuales Registrados</h2>
              <div className="space-y-4">
                {boletinesMensualesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay boletines registrados</p>
                ) : (
                  boletinesMensualesList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">{item.titulo}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            <span>Año: {item.año}</span>
                            <span>Mes: {meses[item.mes - 1]}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditBoletinMensual(item)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteBoletinMensual(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </>
          )}

          {/* Formulario: Informativos Mensuales */}
          {activeTab === 'informativos-mensuales' && (
            <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Informativo Mensual' : 'Agregar Informativo Mensual'}
              </h2>
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
                      min="2004"
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
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (editingId ? 'Actualizando...' : 'Agregando...') : (editingId ? 'Actualizar Informativo' : 'Agregar Informativo')}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setInformativoMensual({
                          titulo: '',
                          descripcion: '',
                          pdf_url: '',
                          imagen_url: '',
                          año: new Date().getFullYear(),
                          mes: new Date().getMonth() + 1
                        })
                      }}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Informativos Mensuales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informativos Mensuales Registrados</h2>
              <div className="space-y-4">
                {informativosMensualesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay informativos registrados</p>
                ) : (
                  informativosMensualesList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">{item.titulo}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            <span>Año: {item.año}</span>
                            <span>Mes: {meses[item.mes - 1]}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditInformativoMensual(item)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteInformativoMensual(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </>
          )}

          {/* Formulario: Boletines Anuales */}
          {activeTab === 'boletines-anuales' && (
            <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Boletín Anual' : 'Agregar Boletín Anual'}
              </h2>
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
                    min="2004"
                    max="2099"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (editingId ? 'Actualizando...' : 'Agregando...') : (editingId ? 'Actualizar Boletín' : 'Agregar Boletín')}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setBoletinAnual({
                          titulo: '',
                          descripcion: '',
                          pdf_url: '',
                          imagen_url: '',
                          año: new Date().getFullYear()
                        })
                      }}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Boletines Anuales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Boletines Anuales Registrados</h2>
              <div className="space-y-4">
                {boletinesAnualesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No hay boletines anuales registrados</p>
                ) : (
                  boletinesAnualesList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900">{item.titulo}</h3>
                          <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
                          <div className="flex gap-4 mt-2 text-sm text-gray-500">
                            <span>Año: {item.año}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditBoletinAnual(item)}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteBoletinAnual(item.id)}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Eliminar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </>
          )}

          {/* Formulario: Fotogaleria Anuales */}
          {activeTab === 'fotogaleria-anuales' && (
            <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Foto Anual' : 'Agregar Foto Anual a Galería'}
              </h2>
              <form onSubmit={handleAddFotoAnual} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    required
                    value={fotoAnual.titulo}
                    onChange={(e) => setFotoAnual({...fotoAnual, titulo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: Galería Anual 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen de Portada</label>
                  <input
                    type="url"
                    required
                    value={fotoAnual.imagen_url}
                    onChange={(e) => setFotoAnual({...fotoAnual, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/portada.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link de la Galería</label>
                  <input
                    type="url"
                    required
                    value={fotoAnual.link}
                    onChange={(e) => setFotoAnual({...fotoAnual, link: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://photos.google.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={fotoAnual.descripcion}
                    onChange={(e) => setFotoAnual({...fotoAnual, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción de la foto..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                  <input
                    type="number"
                    required
                    value={fotoAnual.año}
                    onChange={(e) => setFotoAnual({...fotoAnual, año: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    min="2004"
                    max="2099"
                  />
                </div>
                {fotoAnual.imagen_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vista Previa</label>
                    <img 
                      src={fotoAnual.imagen_url} 
                      alt="Preview" 
                      className="w-full max-w-md rounded-lg shadow-md"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (editingId ? 'Actualizando...' : 'Agregando...') : (editingId ? 'Actualizar Foto' : 'Agregar Foto')}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFotoAnual({
                          titulo: '',
                          descripcion: '',
                          imagen_url: '',
                          link: '',
                          año: new Date().getFullYear()
                        })
                      }}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Fotogalería Anuales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fotos Anuales en Galería</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fotogaleriaAnualesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 col-span-full">No hay fotos anuales en la galería</p>
                ) : (
                  fotogaleriaAnualesList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={item.imagen_url} alt={item.titulo} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{item.titulo}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
                        <p className="text-gray-500 text-xs mt-2">Año: {item.año}</p>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleEditFotoAnual(item)}
                            className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteFotoAnual(item.id)}
                            className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </>
          )}

          {/* Formulario: Fotogaleria Semestrales */}
          {activeTab === 'fotogaleria-semestrales' && (
            <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingId ? 'Editar Foto Semestral' : 'Agregar Foto Semestral a Galería'}
              </h2>
              <form onSubmit={handleAddFotoSemestral} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Título</label>
                  <input
                    type="text"
                    required
                    value={fotoSemestral.titulo}
                    onChange={(e) => setFotoSemestral({...fotoSemestral, titulo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Ej: Galería Primer Semestre 2024"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL de la Imagen de Portada</label>
                  <input
                    type="url"
                    required
                    value={fotoSemestral.imagen_url}
                    onChange={(e) => setFotoSemestral({...fotoSemestral, imagen_url: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://ejemplo.com/portada.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link de la Galería</label>
                  <input
                    type="url"
                    required
                    value={fotoSemestral.link}
                    onChange={(e) => setFotoSemestral({...fotoSemestral, link: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="https://photos.google.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
                  <textarea
                    value={fotoSemestral.descripcion}
                    onChange={(e) => setFotoSemestral({...fotoSemestral, descripcion: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                    placeholder="Descripción de la foto..."
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                    <input
                      type="number"
                      required
                      value={fotoSemestral.año}
                      onChange={(e) => setFotoSemestral({...fotoSemestral, año: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      min="2004"
                      max="2099"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Semestre</label>
                    <select
                      value={fotoSemestral.semestre}
                      onChange={(e) => setFotoSemestral({...fotoSemestral, semestre: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value={1}>Primer Semestre</option>
                      <option value={2}>Segundo Semestre</option>
                    </select>
                  </div>
                </div>
                {fotoSemestral.imagen_url && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vista Previa</label>
                    <img 
                      src={fotoSemestral.imagen_url} 
                      alt="Preview" 
                      className="w-full max-w-md rounded-lg shadow-md"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (editingId ? 'Actualizando...' : 'Agregando...') : (editingId ? 'Actualizar Foto' : 'Agregar Foto')}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null)
                        setFotoSemestral({
                          titulo: '',
                          descripcion: '',
                          imagen_url: '',
                          link: '',
                          año: new Date().getFullYear(),
                          semestre: 1
                        })
                      }}
                      className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Lista de Fotogalería Semestrales */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fotos Semestrales en Galería</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fotogaleriaSemestralesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 col-span-full">No hay fotos semestrales en la galería</p>
                ) : (
                  fotogaleriaSemestralesList.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      <img src={item.imagen_url} alt={item.titulo} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900">{item.titulo}</h3>
                        <p className="text-gray-600 text-sm mt-1">{item.descripcion}</p>
                        <p className="text-gray-500 text-xs mt-2">Año: {item.año} - {item.semestre === 1 ? 'Primer' : 'Segundo'} Semestre</p>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleEditFotoSemestral(item)}
                            className="flex-1 p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteFotoSemestral(item.id)}
                            className="flex-1 p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
