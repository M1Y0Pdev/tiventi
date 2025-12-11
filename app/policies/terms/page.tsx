'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Kullanım Şartları</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Tiventi web sitesine ("Hizmet") hoş geldiniz. Hizmetlerimizi kullanarak,
            bu Kullanım Şartları'na uymayı ve bunlara bağlı kalmayı kabul etmiş olursunuz.
            Lütfen bu Şartları dikkatlice okuyunuz. Şartları kabul etmiyorsanız,
            Hizmeti kullanamazsınız.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. Hesaplar</h2>
          <p className="mb-4 text-gray-700">
            Hizmetimizde bir hesap oluşturduğunuzda, bize her zaman doğru, eksiksiz ve güncel bilgi sağlamanız gerekir.
            Yanlış, eksik veya güncel olmayan bilgiler, Hizmetimizdeki hesabınızın derhal feshedilmesine neden olabilir.
            Şifrenizi güvende tutmaktan ve hesabınız altında gerçekleşen tüm faaliyetlerden siz sorumlusunuz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. Fikri Mülkiyet</h2>
          <p className="mb-4 text-gray-700">
            Hizmet ve orijinal içeriği (kullanıcılar tarafından sağlanan İçerik hariç), özellikleri ve işlevselliği Tiventi'nin
            ve lisans verenlerinin münhasır mülkiyetindedir. Hizmet, telif hakkı, ticari marka ve diğer Türkiye ve
            yabancı ülkelerin yasalarıyla korunmaktadır. Ticari markalarımız ve ticari kıyafetlerimiz, Tiventi'nin önceden
            yazılı izni olmaksızın herhangi bir ürün veya hizmetle bağlantılı olarak kullanılamaz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. Diğer Web Sitelerine Bağlantılar</h2>
          <p className="mb-4 text-gray-700">
            Hizmetimiz, Tiventi'ye ait olmayan veya kontrol edilmeyen üçüncü taraf web sitelerine veya hizmetlerine
            bağlantılar içerebilir. Tiventi'nin herhangi bir üçüncü taraf web sitesinin veya hizmetinin içeriği,
            gizlilik politikaları veya uygulamaları üzerinde hiçbir kontrolü yoktur ve sorumluluk kabul etmez.
            Herhangi bir üçüncü taraf web sitesini veya hizmetini kullanmadan önce bunların hüküm ve koşullarını
            ve gizlilik politikalarını okumanız şiddetle tavsiye edilir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. Fesih</h2>
          <p className="mb-4 text-gray-700">
            Şartları ihlal etmeniz halinde, önceden bildirimde bulunmaksızın veya sorumluluk kabul etmeksizin
            hesabınızı derhal feshedebilir veya askıya alabiliriz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. Sorumluluğun Sınırlandırılması</h2>
          <p className="mb-4 text-gray-700">
            Tiventi, hiçbir durumda, bu Şartlardan kaynaklanan veya bunlarla ilgili olarak, kar kaybı, veri kaybı,
            iş kesintisi veya herhangi bir dolaylı, arızi, özel, cezai veya sonuç olarak ortaya çıkan zararlardan
            (ihmalden kaynaklananlar dahil) sorumlu olmayacaktır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. Değişiklikler</h2>
          <p className="mb-6 text-gray-700">
            Bu Şartları herhangi bir zamanda kendi takdirimize bağlı olarak değiştirme veya yerine koyma hakkını
            saklı tutarız. Bir revizyon önemliyse, yeni hükümlerin yürürlüğe girmesinden en az 30 gün önce bildirimde
            bulunmaya çalışacağız. Nelerin önemli bir değişiklik oluşturacağı tamamen bizim takdirimizde belirlenecektir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">7. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            Bu Kullanım Şartları hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
