import type { ProductSend } from "./Product";

export interface CompanySend {
  name: string;
  cnpj: string;
  category: string;
  phones: string[];
  products: ProductSend[];
}