export interface ExclusiveProperty {
  id: string;
  title: string;
  address: string;
  neighborhood: string;
  description: string;
  price: string;
  status: string;
  possession: string;
  image: string;
  isLarge?: boolean;
}

export interface ExclusiveService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ExclusiveResponse {
  results: ExclusiveProperty[];
  services: ExclusiveService[];
  count: number;
} 