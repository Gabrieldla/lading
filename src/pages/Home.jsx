import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BackgroundBeamsWithCollision } from '@/components/ui/shadcn-io/background-beams-with-collision'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function Home() {
  const [galleryImages, setGalleryImages] = useState([
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  ])

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      const { data, error } = await supabase
        .from('fotogaleria')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12)
      
      if (error) throw error
      
      if (data && data.length > 0) {
        const images = data.map(item => item.imagen_url)
        setGalleryImages(images)
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    }
  }
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const fadeInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const fadeInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="bg-gradient-to-b from-white to-neutral-100 relative">
      {/* Partículas de fondo fijas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundBeamsWithCollision />
      </div>

      <div className="relative z-10">
        {/* Navbar Fixed */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200"
        >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo_bvi-2021.png" 
                alt="BVI Logo" 
                className="h-16 w-auto"
              />
              <span className="text-gray-900 font-bold text-2xl">Biblioteca Virtual de Ingenieria</span>
            </div>
            <div className="hidden md:flex space-x-8 text-lg">
              <a href="https://examurpbvi.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">ExamURP</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors opacity-50 cursor-not-allowed">Estantería Virtual</a>
              <a href="https://www.urp.edu.pe/pregrado/facultad-de-ingenieria/bvi/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">Página Oficial URP</a>
              <a href="https://landingsemanaing.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors">Semana Ingeniería</a>
              <Link to="/login" className="text-gray-700 hover:text-gray-900 transition-colors">Login</Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* SECCIÓN 1: HERO */}
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="max-w-5xl mx-auto text-center px-4 relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-gray-900 mb-6 leading-none"
          >
            Plataforma Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">BVI</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
          </motion.p>
        </div>
      </section>

      {/* SECCIÓN 2: Boletines Mensuales */}
      <section id="boletines" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft} className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800" 
                  alt="Boletines Mensuales"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} className="order-1 md:order-2">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Boletines <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Mensuales</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Accede a nuestros boletines mensuales organizados por año y mes. Información actualizada, 
                documentos importantes y novedades de cada período en un solo lugar.
              </p>
              <Link 
                to="/boletines-mensuales"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-orange-500/50"
              >
                Ver Boletines
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 3: Informativos Mensuales */}
      <section id="informativos" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInRight} className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800" 
                  alt="Informativos Mensuales"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInLeft} className="order-1 md:order-2">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Informativos <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Mensuales</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Consulta nuestros informativos mensuales con todas las actualizaciones, 
                noticias relevantes y comunicados oficiales organizados cronológicamente.
              </p>
              <Link 
                to="/informativos-mensuales"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-orange-500/50"
              >
                Ver Informativos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 4: Fotogalería */}
      <section id="galeria" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Fotogalería</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Una colección visual de nuestros eventos, actividades y logros
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              className="gallery-swiper"
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={index} style={{ width: '600px' }}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <img
                      src={image}
                      alt={`Galería ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="text-center mt-16">
              <Link
                to="/fotogaleria"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-orange-500/50"
              >
                Ver Galería Completa
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECCIÓN 5: Boletines Anuales */}
      <section id="anuales" className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInLeft} className="order-2 md:order-1">
              <div className="relative overflow-hidden rounded-lg border border-gray-300 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800" 
                  alt="Boletines Anuales"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} className="order-1 md:order-2">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Boletines <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Anuales</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Consulta los boletines anuales con los resúmenes más importantes de cada año. 
                Información consolidada y fácil acceso a documentación histórica.
              </p>
              <Link 
                to="/boletines-anuales"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full text-white font-semibold hover:scale-105 transition-transform shadow-lg shadow-orange-500/50"
              >
                Ver Boletines Anuales
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Botón para volver arriba */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#inicio"
            className="inline-flex flex-col items-center gap-2 cursor-pointer group"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-sm text-gray-500 group-hover:text-orange-600 transition-colors">Volver arriba</span>
            <div className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-orange-600 group-hover:bg-orange-100 transition-all">
              <svg className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </motion.a>
        </motion.div>
      </section>
      </div>
    </div>
  )
}

export default Home
