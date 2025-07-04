
'use client'

import { motion } from 'framer-motion'
import { UtensilsCrossed, MessageCircle, CalendarDays } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Discover',
    description: 'Get instant recommendations based on cuisine, price, or neighborhood.'
  },
  {
    icon: MessageCircle,
    title: 'Details',
    description: 'Access essential info like opening hours, menus, and contact details.'
  },
  {
    icon: CalendarDays,
    title: 'Reservations',
    description: 'Find out how to book your table directly from our chat.'
  }
]

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            What Can I Help You With?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover Montreal's vibrant dining scene with personalized recommendations tailored just for you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features?.map((feature, index) => {
            const Icon = feature?.icon
            return (
              <motion.div
                key={feature?.title || `feature-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-orange-100 rounded-full p-4 mb-6">
                    {Icon && <Icon className="h-8 w-8 text-orange-500" />}
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-poppins">
                    {feature?.title || 'Feature'}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature?.description || 'Feature description'}
                  </p>
                </div>
              </motion.div>
            )
          }) || []}
        </div>
      </div>
    </section>
  )
}
