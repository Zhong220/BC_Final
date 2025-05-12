// ── src/components/ui/FactorSelect.tsx ───────
import { SelectHTMLAttributes } from 'react';
const options = [
  { label:'預設 1.0', value:1 },
  { label:'茶葉 1.2', value:1.2 },
  { label:'包材 0.8', value:0.8 },
];
export default function FactorSelect({value,onChange}:{value:number,onChange:(v:number)=>void}){
  return (
    <select value={value} onChange={e=>onChange(+e.target.value)} className="w-full rounded-lg border p-2">
      {options.map(o=> <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}