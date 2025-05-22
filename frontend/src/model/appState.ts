export interface StateProduct {
  productId: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface AppState {
  productos: StateProduct[];
};