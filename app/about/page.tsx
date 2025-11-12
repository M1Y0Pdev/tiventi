'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Award, Users, Sparkles } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Ayşe Yılmaz',
      role: 'Kurucu & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'Zeynep Demir',
      role: 'Tasarım Müdürü',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
    {
      name: 'Elif Kaya',
      role: 'Müşteri Deneyimi',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    },
    {
      name: 'Selin Öztürk',
      role: 'Pazarlama Direktörü',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
    },
  ]

  const values = [
    {
      icon: Heart,
      title: 'Kalite Tutkusu',
      description: 'Her kadını özgüvenli ve güzel hissettiren iç çamaşırı yaratma konusunda tutkuluyuz.',
    },
    {
      icon: Award,
      title: 'Tasarımda Mükemmellik',
      description: 'Tasarımlarımız zarafeti konforla birleştirerek en iyi görünmenizi ve hissetmenizi sağlar.',
    },
    {
      icon: Users,
      title: 'Müşteri Önceliğimiz',
      description: 'Memnuniyetiniz önceliğimizdir. Dinleriz, önemseriz ve olağanüstü hizmet sunarız.',
    },
    {
      icon: Sparkles,
      title: 'İnovasyon',
      description: 'İç giyimde en son trendleri ve teknolojileri sunmak için sürekli yenilik yapıyoruz.',
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop"
          alt="About Tiventi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center">
          <div className="container-custom text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Tiventi Hakkında</h1>
              <p className="text-xl text-gray-200">
                2020'den beri kadınları zarif, rahat ve özgüvenli iç çamaşırlarıyla güçlendiriyoruz
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Hikayemiz</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Tiventi, basit bir inançtan doğdu: Her kadın, kendi teninde güzel, 
                  özgüvenli ve rahat hissetmeyi hak ediyor. 2020'de kurulduğumuzda, lüksü 
                  erişilebilirlikle birleştirerek iç çamaşırı sektöründe devrim yaratmayı amaçladık.
                </p>
                <p>
                  Yolculuğumuz, kurucumuz Ayşe Yılmaz'ın piyasada stil ve konfordan ödün vermeyen 
                  yüksek kaliteli, uygun fiyatlı iç çamaşırı konusunda bir boşluk fark etmesiyle başladı. 
                  Modaya olan tutkusu ve kadınları güçlendirme taaahhüdüyle Tiventi yaratıldı.
                </p>
                <p>
                  Bugün, dünya çapında binlerce müşteriye hizmet vermekten gurur duyuyoruz ve 
                  kadınlığı her biçimiyle kutlayan özenle seçilmiş bir iç çamaşırı koleksiyonu sunuyoruz. 
                  Günlük temel parçalardan özel gün parçalarına kadar her ürün sizin için tasarlandı.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=500&fit=crop"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Misyon ve Vizyon</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-tiventi-orange">Misyonumuz</h3>
              <p className="text-gray-600">
                Her kadına her gün kendini özgüvenli ve güzel hissettiren lüks, rahat ve uygun fiyatlı 
                iç çamaşırı sağlamak. Harika iç çamaşırının harika özgüvenin temeli olduğuna inanıyoruz.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-tiventi-orange">Vizyonumuz</h3>
              <p className="text-gray-600">
                Çeşitliliği kutlayan, beden pozitifliğini teşvik eden ve kadınları benzersiz güzelliklerini 
                kucaklamaya güçlendiren önde gelen küresel iç çamaşırı markası olmak. Her kadının kendi teninde 
                rahat ve özgüvenli hissettiği bir dünya hayal ediyoruz.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Değerlerimiz</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bu temel değerler Tiventi'de yaptığımız her şeye rehberlik eder
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-tiventi-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 group hover:bg-tiventi-orange transition-colors">
                    <Icon className="w-10 h-10 text-tiventi-orange group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Ekibimizle Tanışın</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Size en iyisini sunmak için yorulmadan çalışan Tiventi'nin tutkulu insanları
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-tiventi-orange">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-tiventi-orange to-orange-600 text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Tiventi Ailesine Katılın</h2>
            <p className="text-xl mb-8 opacity-90">
              Konfor, stil ve özgüvenin mükemmel karışımını deneyimleyin
            </p>
            <motion.a
              href="/products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-tiventi-orange px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Alışverişe Başla
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
