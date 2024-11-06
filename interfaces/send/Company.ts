import type { ProductSend } from "./Product";

export interface CompanySend {
  name: string;
  cnpj: string;
  category: string;
  phones: CompanyPhones[];
  products: ProductSend[];
}

export interface CompanyPhones {
  number: string;
  deleted: boolean;
}