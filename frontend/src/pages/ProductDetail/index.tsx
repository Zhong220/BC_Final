import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetail() {
  const nav = useNavigate();
  const { id } = useParams();
  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => nav(-1)} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>
      <h2 className="mb-2 text-xl font-bold">產品 #{id}</h2>
      <Outlet />
    </>
  );
}
