'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-4">Gizlilik Politikası</h1>

          <p className="mb-4 text-gray-700">
            <strong>Son Güncelleme:</strong> 6 Aralık 2025
          </p>

          <p className="mb-6 text-gray-700">
            Tiventi olarak ("biz", "bize" veya "bizim"), gizliliğinize büyük önem veriyoruz.
            Bu Gizlilik Politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda
            kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, açıklandığını ve korunduğunu açıklar.
            Hizmetlerimizi kullanarak, bu politikada açıklanan bilgilerin toplanmasını ve kullanılmasını kabul edersiniz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">1. Topladığımız Bilgiler</h2>
          <p className="mb-4 text-gray-700">
            Hizmetlerimizi size sunmak ve deneyiminizi geliştirmek için çeşitli türde bilgileri topluyoruz.
            Topladığımız kişisel bilgiler şunları içerebilir:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li><strong>Kişisel Tanımlayıcı Bilgiler:</strong> Adınız, e-posta adresiniz, telefon numaranız, teslimat adresiniz, fatura adresiniz.</li>
            <li><strong>Ödeme Bilgileri:</strong> Ödeme yöntemlerinizle ilgili bilgiler (örneğin kredi kartı numarası, son kullanma tarihi, CVC – ancak bu bilgiler doğrudan tarafımızca saklanmaz, güvenli ödeme işlemcileri aracılığıyla işlenir).</li>
            <li><strong>İşlem Bilgileri:</strong> Satın aldığınız ürünler, sipariş numaraları, ödeme geçmişi.</li>
            <li><strong>Kullanım Verileri:</strong> IP adresiniz, tarayıcı türünüz, işletim sisteminiz, ziyaret ettiğiniz sayfalar, ziyaret saati ve tarihi, sitede harcadığınız süre ve diğer tanılayıcı veriler.</li>
            <li><strong>Çerezler ve Takip Teknolojileri:</strong> Tercihlerinizi hatırlamak ve kullanımınızı izlemek için çerezler ve benzeri takip teknolojileri kullanıyoruz.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">2. Bilgilerinizi Nasıl Kullanıyoruz</h2>
          <p className="mb-4 text-gray-700">
            Topladığımız bilgileri çeşitli amaçlarla kullanırız:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Siparişlerinizi işlemek ve teslim etmek.</li>
            <li>Hesabınızı yönetmek.</li>
            <li>Sizinle iletişim kurmak ve sorularınıza yanıt vermek.</li>
            <li>Hizmetlerimizi ve web sitemizi geliştirmek.</li>
            <li>Pazarlama ve tanıtım iletişimleri göndermek (tercihlerinize bağlı olarak).</li>
            <li>Web sitesi performansını analiz etmek ve iyileştirmek.</li>
            <li>Dolandırıcılığı önlemek ve güvenliği sağlamak.</li>
            <li>Yasal yükümlülüklerimize uymak.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">3. Bilgilerinizi Kimlerle Paylaşıyoruz</h2>
          <p className="mb-4 text-gray-700">
            Kişisel bilgilerinizi üçüncü taraflarla aşağıdaki durumlarda paylaşabiliriz:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li><strong>Hizmet Sağlayıcılar:</strong> Ödeme işlemcileri, kargo şirketleri, pazarlama hizmetleri, web sitesi barındırma hizmetleri gibi hizmetlerimizi destekleyen üçüncü taraf şirketlerle.</li>
            <li><strong>Yasal Gereklilikler:</strong> Yasal bir yükümlülüğe uymak, haklarımızı veya mülkümüzü korumak, olası ihlalleri araştırmak veya kamu güvenliğini sağlamak amacıyla gerektiğinde.</li>
            <li><strong>İş Transferleri:</strong> Bir birleşme, satın alma veya varlık satışı durumunda kişisel bilgileriniz transfer edilebilir.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">4. Veri Güvenliği</h2>
          <p className="mb-6 text-gray-700">
            Kişisel bilgilerinizin güvenliğini sağlamak için ticari olarak kabul edilebilir önlemler alıyoruz.
            Ancak, İnternet üzerinden hiçbir iletim yönteminin veya elektronik depolama yönteminin %100 güvenli olmadığını
            unutmayın. Bu nedenle, mutlak güvenliği garanti edemeyiz.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">5. Haklarınız</h2>
          <p className="mb-4 text-gray-700">
            Belirli veri koruma yasalarına bağlı olarak, kişisel bilgilerinizle ilgili belirli haklara sahip olabilirsiniz:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
            <li>Bilgilerinize erişme, düzeltme, güncelleme veya silme hakkı.</li>
            <li>Pazarlama iletişimlerini almaktan vazgeçme hakkı.</li>
            <li>Verilerinizin işlenmesine itiraz etme hakkı.</li>
          </ul>
          <p className="mb-6 text-gray-700">
            Bu hakları kullanmak için lütfen <Link href="/contact" className="text-tiventi-orange hover:underline">İletişim</Link> sayfamız aracılığıyla bizimle iletişime geçin.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">6. Çerezler</h2>
          <p className="mb-6 text-gray-700">
            Web sitemizin nasıl çalıştığı hakkında bilgi toplamak için çerezleri ve benzeri izleme teknolojilerini kullanırız.
            Daha fazla bilgi için lütfen <Link href="/policies/cookie" className="text-tiventi-orange hover:underline">Çerez Politikamızı</Link> inceleyin.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">7. Bu Politikadaki Değişiklikler</h2>
          <p className="mb-6 text-gray-700">
            Gizlilik Politikamızı zaman zaman güncelleyebiliriz. Herhangi bir değişiklik olduğunda yeni politikayı bu sayfada
            yayınlayarak sizi bilgilendireceğiz. Değişiklikler bu sayfada yayınlandığı anda yürürlüğe girer.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">8. Bize Ulaşın</h2>
          <p className="mb-4 text-gray-700">
            Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçin:
          </p>
          <p className="mb-4 text-gray-700">
            <strong>E-posta:</strong> support@tiventi.com
          </p>
          <p className="mb-4 text-gray-700">
            <strong>Adres:</strong> [Şirket Adresiniz Buraya Gelecek]
          </p>
        </motion.div>
      </div>
    </div>
  );
}
