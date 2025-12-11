'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">İade ve Değişim Politikası</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Tiventi olarak, satın aldığınız ürünlerden tamamen memnun kalmanızı arzu ediyoruz.
            Beklentilerinizi karşılamayan veya kusurlu olduğunu düşündüğünüz ürünler için
            aşağıdaki İade ve Değişim Politikası çerçevesinde size yardımcı olmaktan memnuniyet duyarız.
            İç çamaşırı ürünlerinde hijyen koşulları nedeniyle bazı özel durumlar söz konusudur.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. İade ve Değişim Süresi</h2>
          <p className="mb-4 text-gray-700">
            Satın aldığınız ürünleri, teslimat tarihinden itibaren <strong>14 gün içinde</strong> iade veya değişim
            talebinde bulunabilirsiniz. Bu süre, yasal cayma hakkı süresi olup, kargo teslim tutanağındaki tarih esas alınır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. İade ve Değişim Koşulları</h2>
          <p className="mb-4 text-gray-700">
            İade veya değişim yapabilmeniz için ürünlerin aşağıdaki koşulları taşıması gerekmektedir:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Ürünler, orijinal ambalajında, tüm etiketleri üzerinde ve kullanılmamış, yıkanmamış, ütülenmemiş olmalıdır.</li>
            <li>Hijyenik sebeplerle, deneme de dahil olmak üzere kesinlikle kullanılmamış, giyilmemiş ve üzerinde hiçbir hasar, leke, koku vb. bulunmayan ürünler iade veya değişime kabul edilir.</li>
            <li>Orijinal fatura veya e-fatura ibrazı zorunludur.</li>
            <li>İç çamaşırı ürünlerinde, koruyucu bantları çıkarılmamış ve hijyen açısından herhangi bir şekilde kontamine olmamış ürünler iade veya değişime tabidir.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. İade/Değişim Süreci</h2>
          <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
            <li><strong>Talep Oluşturma:</strong> İade veya değişim talebinizi, sipariş numaranızla birlikte <Link href="/contact" className="text-tiventi-orange hover:underline">İletişim</Link> sayfamız üzerinden bize bildirmeniz gerekmektedir.</li>
            <li><strong>Ürün Gönderimi:</strong> Talebiniz onaylandıktan sonra, ürünü belirtilen kargo firması ve anlaşma kodu ile bize göndermelisiniz. Anlaşmalı kargo firmamız dışındaki gönderimlerde kargo ücreti tarafınızca karşılanacaktır.</li>
            <li><strong>İnceleme ve Onay:</strong> İade edilen ürünler tarafımıza ulaştığında, iade koşullarına uygunluğu kontrol edilir. Koşullara uygun olmayan ürünler iade alınmaz ve alıcı ödemeli olarak geri gönderilir.</li>
            <li><strong>Geri Ödeme/Değişim:</strong> İade koşullarının sağlanması durumunda, ödeme şeklinize bağlı olarak iade işlemi 10 iş günü içinde gerçekleştirilir. Değişim taleplerinde, stok durumuna göre yeni ürün size gönderilir.</li>
          </ol>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. Kusurlu veya Yanlış Ürünler</h2>
          <p className="mb-4 text-gray-700">
            Size gönderilen ürünün kusurlu, hasarlı veya siparişinizden farklı olması durumunda,
            teslimat tarihinden itibaren en geç 3 gün içinde <Link href="/contact" className="text-tiventi-orange hover:underline">İletişim</Link> sayfamız üzerinden
            durumu bize bildirmeniz gerekmektedir. Bu tür durumlarda kargo ücretleri Tiventi tarafından karşılanır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. Cayma Hakkının İstisnaları (İç Çamaşırı Özel)</h2>
          <p className="mb-4 text-gray-700">
            Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği uyarınca,
            tek kullanımlık ürünler, hızlı bozulan veya son kullanma tarihi geçen ürünler ile
            <strong>tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış
            olması halinde sağlık ve hijyen açısından iadesi uygun olmayan ürünler</strong> için
            cayma hakkı kullanılamaz. İç çamaşırı ürünlerimiz bu kategoride yer aldığından,
            <strong>ambalajı açılmış, denenmiş veya kullanılmış iç çamaşırı ürünlerinin iadesi veya değişimi hijyen koşulları
            gereği mümkün değildir.</strong>
            Lütfen satın almadan önce beden ve ürün açıklamalarını dikkatlice inceleyiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            İade ve değişim politikamız hakkında herhangi bir sorunuz olursa, lütfen bizimle iletişime geçmekten çekinmeyin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
