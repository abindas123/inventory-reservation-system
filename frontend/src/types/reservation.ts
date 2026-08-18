export interface Reservation {
  id: string;
  productId: string;
  quantity: number;
  status: string;
  expiresAt: string;

  product: {
    id: string;
    name: string;
    description: string;
    price: string;
    stock: number;
  };
}