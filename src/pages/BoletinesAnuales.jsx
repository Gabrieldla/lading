import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function BoletinesAnuales() {
  const [boletines, setBoletines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBoletines()
  }, [])

  const fetchBoletines = async () => {
    try {
      const { data, error } = await supabase
        .from('boletines_anuales')
        .select('*')
        .order('año', { ascending: false })
      
      if (error) throw error
      
      setBoletines(data || [])
    } catch (error) {
      console.error('Error fetching boletines anuales:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
            Boletines Anuales
          </h1>
          <p className="text-gray-600 mt-2">Consulta los boletines anuales por año</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : boletines.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay boletines anuales disponibles aún.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boletines.map((boletin) => (
              <a
                key={boletin.id}
                href={boletin.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-orange-500 overflow-hidden"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={boletin.imagen_url} 
                    alt={boletin.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-lg">
                    {boletin.año}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{boletin.titulo}</h3>
                  {boletin.descripcion && (
                    <p className="text-gray-600 text-sm line-clamp-2">{boletin.descripcion}</p>
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

export default BoletinesAnuales
