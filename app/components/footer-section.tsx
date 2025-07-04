
'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function FooterSection() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-lg font-medium">Made with passion for Montreal's food scene</span>
          </div>
          
          <p className="text-gray-400 mb-6">
            Discover the best casual dining experiences Montreal has to offer, all under $50 per person.
          </p>
          
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-500">
              © 2025 Montreal Restaurant Guide. Crafted with passion.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
