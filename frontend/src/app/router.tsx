// ── src/app/router.tsx ───────────────────────
import { createBrowserRouter } from 'react-router-dom';
import AppShell    from '@/app/AppShell';

// 單層頁
import Home        from '@/pages/Home';
import Product     from '@/pages/Product';
import Profile     from '@/pages/Profile';
import Records     from '@/pages/Records';

// 巢狀頁（/product/:id/**）
import ProductDetail   from '@/pages/ProductDetail';
import StageForm       from '@/pages/ProductDetail/StageForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,            // 有 TopBar + Outlet
    children: [
      { index: true,     element: <Home /> },
      { path: 'product', element: <Product /> },
      { path: 'profile', element: <Profile /> },
      { path: 'records', element: <Records /> },
      {
        path: 'product/:id',
        element: <ProductDetail />,   // 會再包一層 Outlet
        children: [
          { index: true,    element: <StageForm /> },      // /product/:id
          { path: 'stage',  element: <StageForm /> }       // /product/:id/stage
        ]
      }
    ]
  }
]);
