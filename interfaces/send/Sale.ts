import type { SaleItemSend } from "./SaleItem";

export interface SaleSend {
   companyId: string;
    saleItems: SaleItemSend[];
}