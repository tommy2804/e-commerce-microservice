export interface CartProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface CartState {
  id: string;
  products: CartProduct[];
}
