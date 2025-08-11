
"use client";
import { Product } from '@/app/types';
import { calculateItemTotal } from '@/app/utils';
import { Button, Card, CardContent, CardFooter, CardHeader } from '@/components/ui';
import { useCart } from '@/context/CartContext';
import Image from "next/image";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, loading } = useCart();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        <Image
          src={product.photo || '/placeholder-product.jpg'}
          alt={product.name}
          width={300}
          height={200}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <div className="flex items-center gap-2 mt-2">
          {product.promotional_price ? (
            <>
              <span className="text-primary font-bold">
                {calculateItemTotal(product.promotional_price, 1)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                {calculateItemTotal(product.price, 1)}
              </span>
            </>
          ) : (
            <span className="font-bold">{calculateItemTotal(product.price, 1)}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={() => addItem(product.id, 1)}
          disabled={loading}>
          {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </Button>
      </CardFooter>
    </Card>
  );
}
