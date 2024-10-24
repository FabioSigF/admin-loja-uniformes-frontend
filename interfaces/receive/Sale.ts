import type { CompanyReceive } from "./Company";
import type { SaleItemReceive } from "./SaleItem";

export interface SaleReceive {
  id: string;
  company: CompanyReceive;
  description: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  saleItems: SaleItemReceive[];
}
