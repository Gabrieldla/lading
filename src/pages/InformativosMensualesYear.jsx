import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function InformativosMensualesYear() {
  const { year } = useParams()
  const [informativos, setInformativos] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchInformativos()
  }, [year])

  const fetchInformativos = async () => {
    try {
      const { data, error } = await supabase
        .from('informativos_mensuales')
        .select('*')
        .eq('año', parseInt(year))
        .order('mes', { ascending: true })
      
      if (error) throw error
      
      setInformativos(data || [])
    } catch (error) {
      console.error('Error fetching informativos:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const months = [
    { name: 'Enero', number: 1, color: 'emerald' },
    { name: 'Febrero', number: 2, color: 'teal' },
    { name: 'Marzo', number: 3, color: 'cyan' },
    { name: 'Abril', number: 4, color: 'sky' },
    { name: 'Mayo', number: 5, color: 'blue' },
    { name: 'Junio', number: 6, color: 'indigo' },
    { name: 'Julio', number: 7, color: 'violet' },
    { name: 'Agosto', number: 8, color: 'purple' },
    { name: 'Septiembre', number: 9, color: 'fuchsia' },
    { name: 'Octubre', number: 10, color: 'pink' },
    { name: 'Noviembre', number: 11, color: 'rose' },
    { name: 'Diciembre', number: 12, color: 'red' }
  ]

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'border-emerald-500 bg-emerald-50 hover:bg-emerald-100',
      teal: 'border-teal-500 bg-teal-50 hover:bg-teal-100',
      cyan: 'border-cyan-500 bg-cyan-50 hover:bg-cyan-100',
      sky: 'border-sky-500 bg-sky-50 hover:bg-sky-100',
      blue: 'border-blue-500 bg-blue-50 hover:bg-blue-100',
      indigo: 'border-indigo-500 bg-indigo-50 hover:bg-indigo-100',
      violet: 'border-violet-500 bg-violet-50 hover:bg-violet-100',
      purple: 'border-purple-500 bg-purple-50 hover:bg-purple-100',
      fuchsia: 'border-fuchsia-500 bg-fuchsia-50 hover:bg-fuchsia-100',
      pink: 'border-pink-500 bg-pink-50 hover:bg-pink-100',
      rose: 'border-rose-500 bg-rose-50 hover:bg-rose-100',
      red: 'border-red-500 bg-red-50 hover:bg-red-100'
    }
    return colors[color] || colors.emerald
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/informativos-mensuales" className="inline-flex items-center text-green-600 hover:text-green-800 mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a años
          </Link>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
            Informativos Mensuales {year}
          </h1>
          <p className="text-gray-600 mt-2">Selecciona un mes para ver el informativo</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : informativos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No hay informativos disponibles para este año.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {informativos.map((informativo) => {
              const monthInfo = months.find(m => m.number === informativo.mes)
              return (
                <a
                  key={informativo.id}
                  href={informativo.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${getColorClasses(monthInfo?.color || 'emerald')} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 overflow-hidden group`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={informativo.imagen_url} 
                      alt={informativo.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold">
                      {monthInfo?.name}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{informativo.titulo}</h3>
                    {informativo.descripcion && (
                      <p className="text-gray-600 text-sm line-clamp-2">{informativo.descripcion}</p>
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

export default InformativosMensualesYear
