// src/app/AppShell.tsx
import { Outlet, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AppShell() {
  const nav = useNavigate();
  return (
    <main className="relative mx-auto max-w-sm bg-gray-50 min-h-screen pb-24">
      {/* 頂部漸層條 */}
      <div className="fixed inset-x-0 top-0 z-10 h-32 rounded-b-3xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400" />
      {/* 網站 LOGO / 個人頁入口（僅示意可自行更換） */}
      <button
        className="fixed left-4 top-4 z-20 text-white font-bold"
        onClick={() => nav('/')}
      >
        🏷️ CarbonApp
      </button>
      <button
        className="fixed right-4 top-4 z-20 text-white"
        onClick={() => nav('/profile')}
      >
        😊
      </button>

      {/* 主要內容 */}
      <div className="pt-36 px-4">
        <Outlet />
      </div>

      {/* 浮動分享按鈕 */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-6 right-6 z-20 rounded-full shadow-xl"
      >
        <Share2 className="h-5 w-5" />
      </Button>

      <Toaster />
    </main>
  );
}

