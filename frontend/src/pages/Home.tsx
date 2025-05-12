// ── src/pages/Home.tsx ───────────────────────
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, HeartOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProductsCtx } from '@/context/ProductsContext';

export default function Home(){
  const nav = useNavigate();
  const ctx = useContext(ProductsCtx);
  if(!ctx) return null;
  const [state, dispatch] = ctx;
  return (
    <div className="relative mx-auto mb-24 mt-24 w-full max-w-lg px-4">
      <h3 className="mb-3 text-lg font-semibold">產品表</h3>
      <div className="space-y-3">
        {state.list.map(p=> (
          <Card key={p.id} className="flex items-center justify-between p-4">
            <button className="mr-3 text-pink-500" onClick={()=>dispatch({type:'toggleFav',id:p.id})}>
              {p.fav? <Heart className="h-5 w-5 fill-pink-500"/>:<HeartOff className="h-5 w-5"/>}
            </button>
            <span className="flex-1 truncate font-medium">{String(p.id).padStart(2,'0')} {p.name}</span>
            <Button variant="outline" size="sm" onClick={()=>nav(`/product/${p.id}`)}>more</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}