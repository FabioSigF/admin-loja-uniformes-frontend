import type { ProductFeatureSend } from "./ProductFeature";

export interface ProductSend {
  companyId: string;
  name: string;
  description: string;
  gender: string;
  features: ProductFeatureSend[];
}
