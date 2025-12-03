import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function InformativosMensuales() {
  const [years, setYears] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchYears()
  }, [])

  const fetchYears = async () => {
    try {
      const { data, error } = await supabase
        .from('informativos_mensuales')
        .select('año')
        .order('año', { ascending: false })
      
      if (error) throw error
      
      // Obtener años únicos
      const uniqueYears = [...new Set(data.map(item => item.año))]
      setYears(uniqueYears)
    } catch (error) {
      console.error('Error fetching years:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header con imagen de portada */}
      <header className="bg-white shadow-md">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img 
            src="/InformativosMensuales.jpg" 
            alt="Informativos Mensuales"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 py-6">
            <Link to="/" className="inline-flex items-center text-white hover:text-green-200 mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver al inicio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              Informativos Mensuales
            </h1>
            <p className="text-white/90 mt-2 text-lg">Selecciona un año para ver los informativos mensuales</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : years.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay informativos mensuales disponibles aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {years.map((year) => (
              <Link 
                key={year}
                to={`/informativos-mensuales/${year}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-green-600 font-semibold mb-2">AÑO</div>
                      <h2 className="text-4xl font-bold text-gray-800">{year}</h2>
                      <p className="text-gray-600 mt-2">Ver informativos</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                      <svg className="w-6 h-6 text-green-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default InformativosMensuales
