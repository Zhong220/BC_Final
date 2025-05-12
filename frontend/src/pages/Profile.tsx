// ── src/pages/Profile.tsx ─────────────────────
import { Button } from '@/components/ui/button';
import { Input }  from '@/components/ui/input';
export default function Profile(){
  return (
    <div className="mx-auto mt-24 w-full max-w-lg px-4 space-y-4">
      <h2 className="text-xl font-semibold">Profile</h2>
      <Input placeholder="Name"/>
      <Input placeholder="Email" value="demo@example.com" disabled/>
      <Button variant="outline">Change Password</Button>
      <Button variant="destructive" className="w-full">Sign out</Button>
    </div>
  );
}
