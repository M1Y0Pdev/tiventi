import { supabase } from '@/lib/supabase'
import ProductView from '@/components/ProductView'
import { Product } from '@/types'
import { Category } from '@/types' // Assuming Category type will be added to types/index.ts

// Force the page to be dynamic and not cached
export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`*, categories (name)`);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data.map((product: any) => ({
    ...product,
    category_name: product.categories?.name || null,
    categories: undefined,
  }));
}

async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data;
}

export default async function ProductsPage() {
  // Fetch products and categories in parallel
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <div className="pt-20">
      {/* Page Header (Static Part) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Shop All Products</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Explore our complete collection of premium lingerie
            </p>
          </div>
        </div>
      </section>

      {/* Products Section (Dynamic Part) */}
      <section className="py-12">
        <div className="container-custom">
          <ProductView initialProducts={products} initialCategories={categories} />
        </div>
      </section>
    </div>
  )
}