'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ShippingPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Kargo Politikası</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Tiventi olarak, verdiğiniz siparişlerin en hızlı ve güvenli şekilde
            size ulaşmasını sağlamak en büyük önceliğimizdir. Bu Kargo Politikası,
            siparişlerinizin kargoya verilme, teslimat süreleri ve ücretlendirme
            hakkında bilgi vermektedir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. Sipariş Hazırlık ve Kargoya Teslim Süresi</h2>
          <p className="mb-4 text-gray-700">
            Tüm siparişleriniz, ödeme onaylandıktan sonra <strong>1-3 iş günü içerisinde</strong>
            hazırlanır ve anlaşmalı kargo firmamıza teslim edilir. Özel kampanya dönemleri veya
            yoğunluk durumlarında bu süre uzayabilir, bu tür durumlarda size bilgi verilecektir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. Teslimat Süresi</h2>
          <p className="mb-4 text-gray-700">
            Siparişiniz kargoya verildikten sonra, teslimat süresi gönderim adresine bağlı olarak
            değişkenlik göstermektedir. Ortalama teslimat süreleri:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li><strong>Şehir içi teslimatlar:</strong> 1-2 iş günü</li>
            <li><strong>Şehirler arası teslimatlar:</strong> 2-4 iş günü</li>
            <li><strong>Mobil bölgeler ve kırsal alanlar:</strong> 3-7 iş günü</li>
          </ul>
          <p className="mb-6 text-gray-700">
            Kargo takip numaranız, siparişiniz kargoya verildiğinde e-posta ile size bildirilecektir.
            Siparişinizin güncel durumunu <Link href="/order-tracking" className="text-tiventi-orange hover:underline">Sipariş Takibi</Link> sayfamızdan takip edebilirsiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. Kargo Ücretleri</h2>
          <p className="mb-4 text-gray-700">
            Kargo ücretleri, siparişinizin toplam tutarına ve teslimat adresine göre değişiklik gösterebilir.
            Belirli bir tutarın üzerindeki siparişlerde ücretsiz kargo imkanı sunulmaktadır.
            Güncel kargo ücretleri ve ücretsiz kargo limitleri, ödeme sayfasında siparişinizi tamamlarken
            açıkça belirtilecektir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. Teslimat Adresi Değişikliği</h2>
          <p className="mb-6 text-gray-700">
            Siparişiniz kargoya verilmeden önce teslimat adresinizi değiştirmek isterseniz,
            lütfen en kısa sürede <Link href="/contact" className="text-tiventi-orange hover:underline">Müşteri Hizmetleri</Link> ile iletişime geçiniz.
            Sipariş kargoya verildikten sonra adres değişikliği yapılamamaktadır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. Teslimat Sırasında Dikkat Edilmesi Gerekenler</h2>
          <p className="mb-4 text-gray-700">
            Siparişinizi teslim alırken kargo paketinde herhangi bir hasar veya açılma olup olmadığını
            kontrol ediniz. Hasarlı veya açılmış paketleri teslim almayınız ve kargo görevlisine tutanak
            tutturarak iade ediniz. Bu durumu en kısa sürede <Link href="/contact" className="text-tiventi-orange hover:underline">Müşteri Hizmetleri</Link>ne bildiriniz.
            Teslim aldığınız ürünlerde hasar tespit etmeniz durumunda, ürünün fotoğraflarını çekerek
            bize iletmeniz süreci hızlandıracaktır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. Teslim Edilemeyen Siparişler</h2>
          <p className="mb-4 text-gray-700">
            Teslimat adresinde bulunamamanız durumunda kargo firması paketi şubeye geri götürecek ve
            belirli bir süre içinde tekrar teslimat denemesi yapacaktır. Belirtilen süre içinde alınmayan
            paketler Tiventi'ye iade edilir. Bu durumda, yeniden gönderim için ek kargo ücreti talep edilebilir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">7. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            Kargo politikamız hakkında herhangi bir sorunuz veya ek bilgi ihtiyacınız olursa,
            lütfen bizimle iletişime geçmekten çekinmeyin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
