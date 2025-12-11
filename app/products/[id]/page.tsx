import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ProductDetails from '@/components/ProductDetails'
import { Product } from '@/types'

// Force the page to be dynamic and not cached
export const dynamic = 'force-dynamic';

type PageProps = {
  params: {
    id: string
  }
}



async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(name)')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  if (!data) {
    return null;
  }
  
  const product: Product = {
    ...data,
    category_name: data.categories?.name || null,
    categories: undefined, // remove the nested object
  };

  return product;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProduct(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="pt-20 bg-white">
      <div className="container-custom py-12">
        {/* The ProductDetails client component handles all interactivity */}
        <ProductDetails product={product} />
      </div>
    </div>
  )
}
