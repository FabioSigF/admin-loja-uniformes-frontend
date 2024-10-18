import type { SaleItemReceive } from "./SaleItem";

export interface SaleReceive {
  id: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  saleItems: SaleItemReceive[];
}
