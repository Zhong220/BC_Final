// src/pages/Home.tsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductsCtx } from '@/context/ProductsContext';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const nav = useNavigate();
  const ctx = useContext(ProductsCtx);
  if (!ctx) return null;                 // Provider 還沒掛好時的保險

  const [products /* 就是 Product[] */, dispatch] = ctx;

  return (
    <div className="space-y-3">
      <h3 className="mb-3 text-lg font-semibold">產品表</h3>

      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}

      {/* 示範：新增產品 */}
      <button
        onClick={() => {
          const name = prompt('產品名稱？');
          if (name) dispatch({ type: 'add', name });
        }}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-white"
      >
        ➕ 新增產品
      </button>
    </div>
  );
}
