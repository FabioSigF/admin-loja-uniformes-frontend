import type { SaleItemProductReceive } from "./SaleItemProduct";

export interface SaleItemReceive {
  id: string;
  product: SaleItemProductReceive;
  price: number;
  amount: number;
}
