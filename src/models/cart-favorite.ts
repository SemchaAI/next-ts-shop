import type { IProduct } from './products';

export interface IChangeCommon {
  productId: string; //IProduct
  userId: string | null; //IUser
  // entity: 'cart' | 'favorite';
  // mode: 'add' | 'delete';
}
export interface IUserProduct {
  userId: string;
  productId: string;
}

export interface ISlice {
  _id: null | string;
  items: IProduct[];
}
