import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { LanguageProvider, useLanguage } from './context/LanguageContext'

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function Logo() {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl font-bold">rP</span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-900">re<span className="text-primary-600">Pla</span></span>
          <span className="text-xs text-gray-500">Team Planning</span>
        </div>
      </div>
    </div>
  );
}

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLanguage(language === 'de' ? 'en' : 'de')}
        className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
      >
        <i className="fas fa-globe"></i>
        <span>{t(`language.${language === 'de' ? 'en' : 'de'}`)}</span>
      </button>
    </div>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const { error } = await supabase
        .from('leads')
        .insert([formData])
      
      if (error) throw error
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      <header>
        <Logo />
        <LanguageToggle />
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="section-padding bg-gradient-to-b from-primary-50 to-white pt-24" aria-label="Hero">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                <span className="block">{t('hero.title.main')}</span>
                <span className="block mt-2 text-secondary-600">{t('hero.title.sub')}</span>
              </h1>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8"
              >
                <p className="text-2xl text-primary-600 font-semibold mb-4">
                  {t('hero.question')}
                </p>
                <p className="text-xl text-gray-600">
                  {t('hero.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex justify-center"
              >
                <a 
                  href="#signup" 
                  className="btn-primary" 
                  role="button" 
                  aria-label={String(t('hero.cta'))}
                >
                  {t('hero.cta')}
                </a>
              </motion.div>
            </motion.div>

            {/* Hero Background Accent */}
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-64 h-64 bg-secondary-100 rounded-full filter blur-3xl opacity-20 -z-10" aria-hidden="true"></div>
            <div className="absolute top-1/4 left-0 transform -translate-y-1/2 w-48 h-48 bg-primary-100 rounded-full filter blur-3xl opacity-20 -z-10" aria-hidden="true"></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section-padding relative overflow-hidden" aria-labelledby="features-title">
          <div className="container">
            <h2 id="features-title" className="text-3xl font-bold text-center mb-4">{t('features.title')}</h2>
            <p className="text-secondary-600 text-center mb-12 text-lg">Entdecken Sie unsere leistungsstarken Funktionen</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t('features.calendar.title'),
                  description: t('features.calendar.description'),
                  icon: 'fa-calendar-alt',
                  color: 'text-primary-600'
                },
                {
                  title: t('features.integration.title'),
                  description: t('features.integration.description'),
                  icon: 'fa-plug',
                  color: 'text-secondary-600'
                },
                {
                  title: t('features.wellbeing.title'),
                  description: t('features.wellbeing.description'),
                  icon: 'fa-heart',
                  color: 'text-primary-600'
                }
              ].map((feature, index) => (
                <motion.div
                  key={String(feature.title)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 hover:border-gray-200"
                >
                  <div className={`text-4xl mb-4 ${feature.color}`}>
                    <i className={`fas ${feature.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="section-padding bg-gray-50" aria-labelledby="benefits-title">
          <div className="container">
            <h2 id="benefits-title" className="text-3xl font-bold text-center mb-4">{t('benefits.title')}</h2>
            <p className="text-secondary-600 text-center mb-12 text-lg">Maximieren Sie die Effizienz Ihres Teams</p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: t('benefits.efficiency.title'),
                  description: t('benefits.efficiency.description'),
                  icon: 'fa-chart-line',
                  color: 'text-primary-600'
                },
                {
                  title: t('benefits.productivity.title'),
                  description: t('benefits.productivity.description'),
                  icon: 'fa-rocket',
                  color: 'text-secondary-600'
                },
                {
                  title: t('benefits.satisfaction.title'),
                  description: t('benefits.satisfaction.description'),
                  icon: 'fa-smile',
                  color: 'text-primary-600'
                }
              ].map((benefit, index) => (
                <motion.div
                  key={String(benefit.title)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className={`text-4xl mb-4 ${benefit.color}`}>
                    <i className={`fas ${benefit.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sign-up Form Section */}
        <section id="signup" className="section-padding" aria-labelledby="signup-title">
          <div className="container max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h2 id="signup-title" className="text-3xl font-bold text-center mb-2">{t('form.title')}</h2>
              <p className="text-secondary-600 text-center mb-8">Sichern Sie sich frühzeitigen Zugang</p>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Registrierungsformular">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-600 text-center">{t('form.success')}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-600 text-center">{t('form.error')}</p>
                )}
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 py-8">
        <div className="container">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} <span className="text-secondary-600 font-semibold">rePla</span>. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App 