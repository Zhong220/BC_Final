// src/pages/Product.tsx
import { useContext, useState } from 'react';
import { ProductsCtx } from '@/context/ProductsContext';
import type { Product } from "@/context/ProductsContext";
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProductCard from "@/components/ProductCard";

export default function ProductPage() {
  const ctx = useContext(ProductsCtx);
  if (!ctx) return null;
  const [state] = ctx;
  const [keyword, setKeyword] = useState('');
  const [tab, setTab] = useState<'all' | 'fav'>('all');

  const list = state.list
    .filter(p => (tab === 'fav' ? p.fav : true))
    .filter(p => p.name.includes(keyword));

  return (
    <>
      <Input
        placeholder="搜尋產品..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        className="mb-3"
      />

      <Tabs value={tab} onValueChange={v => setTab(v as any)} className="mb-3">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="fav">收藏</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {list.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
        {list.length === 0 && <p className="text-center text-gray-400">無結果</p>}
      </div>
    </>
  );
}
