import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { ProductsCtx } from '@/context/ProductsContext';
// src/components/ProductCard.tsx
import type { Product } from "@/context/ProductsContext";


export default function ProductCard({ product }: { product: Product }) {
  const nav = useNavigate();
  const ctx = useContext(ProductsCtx);
  const [, dispatch] = ctx!;
  return (
    <Card className="flex items-center justify-between p-4">
      <button
        className="mr-3 text-pink-500"
        onClick={() => dispatch({ type: 'toggleFav', id: product.id })}
      >
        {product.fav ? (
          <Heart className="h-5 w-5 fill-pink-500" />
        ) : (
          <HeartOff className="h-5 w-5" />
        )}
      </button>
      <span className="flex-1 truncate font-medium">
        {String(product.id).padStart(2, '0')} {product.name}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => nav(`/product/${product.id}`)}
      >
        more
      </Button>
    </Card>
  );
}
