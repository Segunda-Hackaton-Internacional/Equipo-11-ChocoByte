import { Product } from "./product";

export interface StateProduct {
  productId: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface AppState {
  productos: StateProduct[];
  catalogo: Product[];
};