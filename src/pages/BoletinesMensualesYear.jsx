import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function BoletinesMensualesYear() {
  const { year } = useParams()
  const [boletines, setBoletines] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchBoletines()
  }, [year])

  const fetchBoletines = async () => {
    try {
      const { data, error } = await supabase
        .from('boletines_mensuales')
        .select('*')
        .eq('año', parseInt(year))
        .order('mes', { ascending: true })
      
      if (error) throw error
      
      setBoletines(data || [])
    } catch (error) {
      console.error('Error fetching boletines:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const months = [
    { name: 'Enero', number: 1, color: 'blue' },
    { name: 'Febrero', number: 2, color: 'indigo' },
    { name: 'Marzo', number: 3, color: 'purple' },
    { name: 'Abril', number: 4, color: 'pink' },
    { name: 'Mayo', number: 5, color: 'red' },
    { name: 'Junio', number: 6, color: 'orange' },
    { name: 'Julio', number: 7, color: 'amber' },
    { name: 'Agosto', number: 8, color: 'yellow' },
    { name: 'Septiembre', number: 9, color: 'lime' },
    { name: 'Octubre', number: 10, color: 'green' },
    { name: 'Noviembre', number: 11, color: 'teal' },
    { name: 'Diciembre', number: 12, color: 'cyan' }
  ]

  const getColorClasses = (color) => {
    const colors = {
      blue: 'border-blue-500 bg-blue-50 hover:bg-blue-100',
      indigo: 'border-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      purple: 'border-purple-500 bg-purple-50 hover:bg-purple-100',
      pink: 'border-pink-500 bg-pink-50 hover:bg-pink-100',
      red: 'border-red-500 bg-red-50 hover:bg-red-100',
      orange: 'border-orange-500 bg-orange-50 hover:bg-orange-100',
      amber: 'border-amber-500 bg-amber-50 hover:bg-amber-100',
      yellow: 'border-yellow-500 bg-yellow-50 hover:bg-yellow-100',
      lime: 'border-lime-500 bg-lime-50 hover:bg-lime-100',
      green: 'border-green-500 bg-green-50 hover:bg-green-100',
      teal: 'border-teal-500 bg-teal-50 hover:bg-teal-100',
      cyan: 'border-cyan-500 bg-cyan-50 hover:bg-cyan-100'
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/boletines-mensuales" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a años
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Boletines Mensuales {year}
          </h1>
          <p className="text-gray-600 mt-2">Selecciona un mes para ver el boletín</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : boletines.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay boletines disponibles para este año.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boletines.map((boletin) => {
              const monthInfo = months.find(m => m.number === boletin.mes)
              return (
                <a
                  key={boletin.id}
                  href={boletin.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${getColorClasses(monthInfo?.color || 'blue')} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 overflow-hidden group`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={boletin.imagen_url} 
                      alt={boletin.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
                      {monthInfo?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{boletin.titulo}</h3>
                    {boletin.descripcion && (
                      <p className="text-gray-600 text-sm line-clamp-2">{boletin.descripcion}</p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default BoletinesMensualesYear
