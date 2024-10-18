import type { ProductFeatureReceive } from "./ProductFeature";

export interface ProductReceive {
  id: string;
  companyId: string;
  name: string;
  description: string;
  gender: string;
  features: ProductFeatureReceive[];
}