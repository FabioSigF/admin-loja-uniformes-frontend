export interface CompanyReceive {
  id: string;
  name: string;
  cnpj: string;
  category: string;
  phones: string[];
  createdAt: string;
  updatedAt: string;
}

export interface PagedCompanyReceive {
  content: CompanyReceive[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}