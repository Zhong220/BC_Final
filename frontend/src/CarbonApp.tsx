// src/CarbonApp.tsx  (單檔示範；日後可拆成多檔)
// -------------------------------------------------
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  HeartOff,
  ChevronRight,
  ArrowLeft,
  Share2,
} from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// 型別 ------------------------------
interface Product {
  id: number;
  name: string;
  fav: boolean;
}

// 假資料 ---------------------------
const mockProducts: Product[] = [
  { id: 1, name: "鐵觀音", fav: false },
  { id: 2, name: "鐵觀音茶霜糖", fav: true },
];

// 共用元件 -------------------------
const TopBar = () => (
  <div className="fixed inset-x-0 top-0 z-0 h-40 rounded-b-3xl bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-400 shadow-lg" />
);

// 頁面：首頁 ------------------------
function HomePage() {
  const nav = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const toggleFav = (id: number) =>
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, fav: !p.fav } : p)));

  return (
    <div className="relative mx-auto mb-24 mt-24 flex w-full max-w-lg flex-1 flex-col px-4">
      {/* Profile */}
      <Card className="relative z-10 -mt-20 mb-8 w-full rounded-2xl shadow-xl">
        <CardContent className="flex items-center gap-4 p-6">
          <img
            src="https://i.pravatar.cc/100"
            alt="avatar"
            className="h-20 w-20 rounded-full border-4 border-white object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">Demo User</h2>
            <p className="text-sm text-gray-500">demo@example.com</p>
          </div>
          <Badge variant="secondary">Pro</Badge>
        </CardContent>
      </Card>

      {/* 產品清單 */}
      <h3 className="mb-3 text-lg font-semibold">產品表</h3>
      <div className="space-y-3">
        {products.map((p) => (
          <Card key={p.id} className="flex items-center justify-between p-4">
            <button
              className="mr-3 text-pink-500"
              onClick={() => toggleFav(p.id)}
              aria-label="收藏"
            >
              {p.fav ? (
                <Heart className="h-5 w-5 fill-pink-500" />
              ) : (
                <HeartOff className="h-5 w-5" />
              )}
            </button>
            <span className="flex-1 truncate font-medium">
              {p.id.toString().padStart(2, "0")} {p.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => nav(`/product/${p.id}`)}
            >
              more <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>

      {/* 浮動分享 */}
      <Button
        variant="secondary"
        size="icon"
        className="fixed bottom-6 right-6 z-20 rounded-full shadow-xl"
      >
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
}

// 頁面：產品詳情 / 填報 ----------------
function ProductPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const product = mockProducts.find((p) => p.id === Number(id));
  const phases = ["原料取得", "製造", "運輸", "銷售"] as const;
  const [phase, setPhase] = useState<(typeof phases)[number]>(phases[0]);
  const [qty, setQty] = useState(0);
  const factor = 1.2;
  const emission = qty * factor;

  if (!product) return <div className="p-6">產品不存在</div>;

  return (
    <div className="relative mx-auto mb-24 mt-24 w-full max-w-lg px-4">
      <Button variant="ghost" size="sm" onClick={() => nav(-1)} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Back
      </Button>

      <Card className="space-y-4 p-6">
        <h3 className="text-lg font-semibold">{product.name}</h3>

        <div>
          <label className="mb-1 block text-sm">階段</label>
          <select
            value={phase}
            onChange={(e) => setPhase(e.target.value as any)}
            className="w-full rounded-lg border p-2"
          >
            {phases.map((ph) => (
              <option key={ph}>{ph}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 items-end gap-4">
          <div>
            <label className="mb-1 block text-sm">使用量</label>
            <Input type="number" min="0" value={qty} onChange={(e) => setQty(+e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm">排放量 (kg CO₂e)</label>
            <div className="text-lg font-semibold">{emission.toFixed(2)}</div>
          </div>
        </div>

        <Button className="w-full">上鏈紀錄</Button>
      </Card>
    </div>
  );
}

// 頁面：Profile (示意 modal，可再拆) ------------
function ProfilePage() {
  const nav = useNavigate();
  return (
    <div className="relative mx-auto mt-24 w-full max-w-lg px-4">
      <Button variant="ghost" size="sm" onClick={() => nav(-1)} className="mb-4">
        <ArrowLeft className="mr-1 h-4 w-4" /> Close
      </Button>
      <Card className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Profile</h3>
        <Input placeholder="Name" />
        <Input placeholder="Email" disabled value="demo@example.com" />
        <Button variant="outline">Change password</Button>
        <Button variant="destructive" className="w-full">
          Sign out
        </Button>
      </Card>
    </div>
  );
}

// 入口 -------------------------------
export default function App() {
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}
