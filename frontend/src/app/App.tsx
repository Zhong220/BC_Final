import { Outlet } from 'react-router-dom';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppShell() {
  return (
    <>
      {/* 漸層頂欄 */}
      <div className="fixed inset-x-0 top-0 z-0 h-40 rounded-b-3xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400 shadow-lg" />

      {/* 主要內容由子路由決定 */}
      <Outlet />

      {/* 全域分享 FAB */}
      <Button variant="secondary" size="icon" className="fixed bottom-6 right-6 z-20 rounded-full shadow-xl">
        <Share2 className="h-5 w-5" />
      </Button>
    </>
  );
}