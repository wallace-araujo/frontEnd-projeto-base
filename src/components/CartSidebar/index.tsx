'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui';

import { ShoppingCart } from 'lucide-react';
import Image from "next/image";
import { useCart } from '@/context/CartContext';
import { calculateItemTotal } from '@/app/utils';

export function CartSidebar() {
  const {
    cart, addItem, removeItem, clearCart
  } = useCart();
  const { items, quantity, total } = cart

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {quantity || 0}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:w-[400px] flex flex-col p-10">
        <SheetHeader>
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Seu carrinho está vazio</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{calculateItemTotal(item.price, item.quantity)}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-6 w-6 p-0"
                      >
                        -
                      </Button>
                      <span className="text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addItem(item.product_id, 1)}
                        className="h-6 w-6 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id, item.quantity)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remover
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 space-y-2 mb-8">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>R$ {calculateItemTotal(total, 1)}</span>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" asChild>
                <a href="/checkout">Finalizar Compra</a>
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={clearCart}
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}