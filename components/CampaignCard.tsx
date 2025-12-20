'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Campaign } from '@/types'

interface CampaignCardProps {
  campaign: Campaign
  index?: number
}

const CampaignCard = ({ campaign, index = 0 }: CampaignCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="relative group overflow-hidden rounded-2xl shadow-xl"
    >
      <Link href={campaign.link}>
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={campaign.image}
            alt={campaign.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          {/* Badge */}
          {campaign.badge && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute top-4 right-4"
            >
              <span className="bg-tiventi-orange text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                {campaign.badge}
              </span>
            </motion.div>
          )}
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl font-bold mb-2"
            >
              {campaign.title}
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 mb-4"
            >
              {campaign.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 text-tiventi-orange font-semibold group-hover:gap-4 transition-all"
            >
              Shop Now
              <ArrowRight size={20} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default CampaignCard
