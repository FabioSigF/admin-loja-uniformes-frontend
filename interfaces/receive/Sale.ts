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

export interface PagedSaleReceive {
  content: SaleReceive[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}