import { Product } from './types';
import { CartSidebar } from '@/components/CartSidebar';
import { ProductCard } from '@/components/ProductCard';
import { apiFetch } from './utils/apiFetch';
export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  try {
    const response = await apiFetch('/products', {
      cache: 'no-store'
    });

    return response;
  } catch (error) { 
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Nossos Produtos</h1>
        <CartSidebar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
