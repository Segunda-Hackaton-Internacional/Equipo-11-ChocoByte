import { Product } from "./product";

export interface Order {
    userId: string;
    product: string;
    quantity: number;
    paymentMethod: string;
    shippingAddress: string;
  }
  