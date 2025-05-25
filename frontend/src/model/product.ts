export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  nftId?: string;
  type: 'Cacao' | 'Café';
  presentation: 'Grano' | 'Molido';
  quantity: number;
  weight: number;
}
