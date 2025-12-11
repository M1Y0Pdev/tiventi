'use client'

import { motion } from 'framer-motion';

export default function CookiePolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Çerez Politikası</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Tiventi web sitesi ("Web Sitesi") olarak, kullanıcı deneyiminizi geliştirmek,
            web sitemizin nasıl kullanıldığını anlamak ve size kişiselleştirilmiş içerik
            sunmak amacıyla çerezler ve benzeri teknolojiler kullanmaktayız.
            Bu Çerez Politikası, çerezlerin ne olduğunu, bunları nasıl kullandığımızı ve
            çerez tercihlerinizi nasıl yönetebileceğinizi açıklamaktadır.
            Web Sitemizi kullanarak, bu politikada açıklanan çerez kullanımına
            onay vermiş olursunuz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. Çerez Nedir?</h2>
          <p className="mb-4 text-gray-700">
            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla
            cihazınıza (bilgisayar, tablet, akıllı telefon vb.) depolanan küçük metin
            dosyalarıdır. Bu dosyalar, web sitesinin sizi hatırlamasını ve sonraki
            ziyaretlerinizde daha iyi bir deneyim sunmasını sağlar.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. Çerezleri Nasıl Kullanıyoruz?</h2>
          <p className="mb-4 text-gray-700">
            Tiventi olarak, farklı amaçlar için çeşitli türde çerezler kullanmaktayız:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevleri için gereklidir. Örneğin, oturum açma, alışveriş sepeti gibi özelliklerin çalışmasını sağlarlar. Bu çerezler olmadan web sitesi düzgün çalışamaz.</li>
            <li><strong>Performans ve Analiz Çerezleri:</strong> Web sitesinin nasıl kullanıldığı hakkında bilgi toplarlar. Ziyaretçi sayısı, en çok ziyaret edilen sayfalar, hata mesajları gibi verileri analiz ederek web sitesinin performansını ve kullanıcı deneyimini iyileştirmemize yardımcı olurlar.</li>
            <li><strong>İşlevsel Çerezler:</strong> Web sitesinin tercihlerinizi (dil, bölge gibi) hatırlamasını sağlayarak size daha kişiselleştirilmiş bir deneyim sunar.</li>
            <li><strong>Hedefleme ve Reklam Çerezleri:</strong> İlgi alanlarınıza göre size özel reklamlar sunmak için kullanılırlar. Web sitesi içinde veya üçüncü taraf sitelerde gezinme geçmişinizi izleyerek alakalı reklamlar göstermeyi hedeflerler.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. Üçüncü Taraf Çerezleri</h2>
          <p className="mb-4 text-gray-700">
            Web Sitemizi ziyaret ettiğinizde, hizmet sağlayıcılarımız (örneğin Google Analytics)
            gibi üçüncü taraf çerezleri de cihazınızda depolanabilir. Bu çerezler,
            analiz ve pazarlama gibi amaçlarla kullanılır. Üçüncü taraf çerezlerinin
            kullanımı, ilgili üçüncü tarafların kendi gizlilik politikalarına tabidir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. Çerez Tercihlerinizi Yönetme</h2>
          <p className="mb-4 text-gray-700">
            Çerezleri kabul etmek veya reddetmek tamamen sizin kontrolünüzdedir.
            Çoğu web tarayıcısı, çerezleri otomatik olarak kabul eder, ancak
            tarayıcı ayarlarınızı değiştirerek çerezleri reddedebilir veya
            çerez gönderildiğinde sizi uyaracak şekilde ayarlayabilirsiniz.
            Ancak, çerezleri reddetmeniz durumunda, Web Sitemizin bazı
            özelliklerinin düzgün çalışmayabileceğini lütfen unutmayın.
          </p>
          <p className="mb-6 text-gray-700">
            Tarayıcınızın ayarlarını nasıl değiştireceğiniz hakkında daha fazla bilgi için,
            tarayıcınızın yardım menüsüne bakabilirsiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. Bu Politikadaki Değişiklikler</h2>
          <p className="mb-6 text-gray-700">
            Bu Çerez Politikası'nı zaman zaman güncelleyebiliriz. Herhangi bir değişiklik olduğunda
            yeni politikayı bu sayfada yayınlayarak sizi bilgilendireceğiz.
            Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            Çerez Politikamız hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
