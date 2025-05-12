import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const phases = ['原料取得', '製造', '運輸', '銷售'] as const;

export default function StageForm() {
  const [phase, setPhase] = useState<(typeof phases)[number]>('原料取得');
  const [qty, setQty] = useState(0);
  const factor = 1.2;
  const emission = qty * factor;

  return (
    <div className="space-y-4">
      <select
        value={phase}
        onChange={e => setPhase(e.target.value as any)}
        className="w-full rounded-lg border p-2"
      >
        {phases.map(p => (
          <option key={p}>{p}</option>
        ))}
      </select>

      <div className="grid grid-cols-2 items-end gap-4">
        <div>
          <label className="mb-1 block text-sm">使用量</label>
          <Input
            type="number"
            min="0"
            value={qty}
            onChange={e => setQty(+e.target.value)}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm">排放量 (kg CO₂e)</label>
          <div className="text-lg font-semibold">{emission.toFixed(2)}</div>
        </div>
      </div>

      <Button className="w-full">上鏈紀錄</Button>
    </div>
  );
}
