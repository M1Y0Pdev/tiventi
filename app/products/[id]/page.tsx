import { products } from '@/lib/data'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-tiventi-orange font-bold mb-6">{product.price} TL</p>
        <p className="text-gray-600 mb-8">{product.description}</p>
        <Link href="/products" className="btn-primary inline-block">
          Ürünlere Dön
        </Link>
      </div>
    </div>
  )
}
