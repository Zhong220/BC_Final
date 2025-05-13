// src/context/ProductsContext.tsx
import { createContext, useReducer } from "react";
import type { Dispatch, ReactNode } from "react";

// ✅ 型別定義
export interface Product {
  id: number;
  name: string;
  fav: boolean;
}

type Action =
  | { type: "toggleFav"; id: number }
  | { type: "add"; name: string }
  | { type: "remove"; id: number };

type State = Product[];

const mock: Product[] = [
  { id: 1, name: "鐵觀音", fav: false },
  { id: 2, name: "鐵觀音茶霜糖", fav: true },
];

// ✅ Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "toggleFav":
      return state.map(p => p.id === action.id ? { ...p, fav: !p.fav } : p);
    case "add":
      return [...state, { id: Date.now(), name: action.name, fav: false }];
    case "remove":
      return state.filter(p => p.id !== action.id);
    default:
      return state;
  }
}

// ✅ Context（**這裡才唯一定義與匯出**）
export const ProductsCtx = createContext<[State, Dispatch<Action>] | null>(null);

// ✅ Provider
export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const hook = useReducer(reducer, mock);
  return <ProductsCtx.Provider value={hook}>{children}</ProductsCtx.Provider>;
};
