'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LegalNoticePage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Mesafeli Satış Sözleşmesi / Ön Bilgilendirme Formu</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Bu Ön Bilgilendirme Formu, satın alma işleminizi tamamlamadan önce
            Tiventi web sitesi ("Satıcı") ile müşteri ("Alıcı") arasında
            yapılacak olan Mesafeli Satış Sözleşmesi'nin temel şartları
            hakkında sizi bilgilendirmek amacıyla hazırlanmıştır.
            Lütfen siparişinizi onaylamadan önce bu formu dikkatlice okuyunuz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. SATICI BİLGİLERİ</h2>
          <p className="mb-4 text-gray-700">
            <strong>Ünvan:</strong> [Şirket Ünvanınız] <br />
            <strong>Adres:</strong> [Şirket Adresiniz] <br />
            <strong>Telefon:</strong> [Şirket Telefon Numaranız] <br />
            <strong>E-posta:</strong> support@tiventi.com <br />
            <strong>Mersis No:</strong> [Varsa Mersis Numaranız]
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. ALICI BİLGİLERİ</h2>
          <p className="mb-4 text-gray-700">
            Sipariş verilirken Alıcı tarafından girilen tüm bilgiler (Ad, Soyad, Adres, Telefon, E-posta vb.) geçerli kabul edilir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. SÖZLEŞME KONUSU ÜRÜN/HİZMET BİLGİLERİ</h2>
          <p className="mb-4 text-gray-700">
            Alıcı'nın satın aldığı mal/hizmetlerin temel özellikleri (cinsi, miktarı, marka/modeli, rengi, adedi, satış bedeli)
            web sitesinde ilgili ürünün sayfasında yer almaktadır. Sipariş özeti sayfasında da bu bilgilere ulaşılabilir.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. FİYAT VE ÖDEME</h2>
          <p className="mb-4 text-gray-700">
            Ürünlerin KDV dahil satış fiyatları, kargo ücretleri ve toplam ödeme tutarı sipariş özeti sayfasında belirtilmiştir.
            Ödeme, kredi kartı, banka kartı veya diğer ödeme yöntemleri ile yapılabilir.
            Alıcı, ödeme işlemini gerçekleştirdiğinde, sipariş verdiği ürün veya hizmetin bedelini ödemeyi kabul etmiş sayılır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. TESLİMAT</h2>
          <p className="mb-4 text-gray-700">
            Siparişiniz, ödeme onayı alındıktan sonra [Teslimat Süresi, örneğin 1-3 iş günü] içerisinde
            belirttiğiniz adrese kargoya verilir. Teslimat süresi ve kargo ücretleri hakkında detaylı bilgi için
            <Link href="/policies/shipping" className="text-tiventi-orange hover:underline"> Kargo Politikamızı</Link> inceleyebilirsiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. CAYMA HAKKI</h2>
          <p className="mb-4 text-gray-700">
            Alıcı, malı teslim aldığı tarihten itibaren 14 (on dört) gün içerisinde herhangi bir gerekçe göstermeksizin
            ve cezai şart ödemeksizin sözleşmeden cayma hakkına sahiptir. Ancak, hijyenik ürünler (iç çamaşırı gibi)
            için ambalajı açılması veya denenmesi halinde cayma hakkı kullanılamaz.
            Detaylı bilgi için <Link href="/policies/return" className="text-tiventi-orange hover:underline">İade ve Değişim Politikamızı</Link> inceleyiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">7. ŞİKAYET VE İTİRAZLAR</h2>
          <p className="mb-4 text-gray-700">
            Alıcı, siparişi ve/veya sözleşme konusu ürün/hizmet ile ilgili şikayetlerini
            Satıcı'nın yukarıda belirtilen iletişim kanallarından iletebilir.
            Şikayetleriniz en kısa sürede değerlendirilecek ve çözüme kavuşturulmaya çalışılacaktır.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">8. YÜRÜRLÜK</h2>
          <p className="mb-6 text-gray-700">
            Alıcı, bu Ön Bilgilendirme Formu'nu okuduğunu, anladığını ve elektronik ortamda onayladığını
            kabul ve beyan eder.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">9. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            Bu form hakkında veya diğer konularda sorularınız varsa, lütfen bizimle iletişime geçin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
