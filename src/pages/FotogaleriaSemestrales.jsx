import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function FotogaleriaSemestrales() {
  const [galerias, setGalerias] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalerias()
  }, [])

  const fetchGalerias = async () => {
    try {
      const { data, error } = await supabase
        .from('fotogaleria_semestrales')
        .select('*')
        .order('año', { ascending: false })
        .order('semestre', { ascending: false })
      
      if (error) throw error
      setGalerias(data || [])
    } catch (error) {
      console.error('Error fetching galerias:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSemestreColor = (semestre) => {
    return semestre === 1 ? 'bg-blue-600' : 'bg-orange-600'
  }

  const getSemestreBorder = (semestre) => {
    return semestre === 1 ? 'border-blue-500' : 'border-orange-500'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-rose-600 hover:text-rose-800 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-orange-600">
            Fotogalería Semestral
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Consulta las galerías semestrales por periodo</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
          </div>
        ) : galerias.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay galerías semestrales disponibles aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galerias.map((galeria) => (
              <a
                key={galeria.id}
                href={galeria.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 ${getSemestreBorder(galeria.semestre)} overflow-hidden`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={galeria.imagen_url} 
                    alt={galeria.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <div className={`${getSemestreColor(galeria.semestre)} text-white px-3 py-1 rounded-full font-semibold text-sm`}>
                      {galeria.semestre === 1 ? '1er Semestre' : '2do Semestre'}
                    </div>
                    <div className="bg-gray-800 text-white px-3 py-1 rounded-full font-bold text-sm">
                      {galeria.año}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{galeria.titulo}</h3>
                  {galeria.descripcion && (
                    <p className="text-gray-600 text-sm line-clamp-2">{galeria.descripcion}</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default FotogaleriaSemestrales
