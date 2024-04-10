// import { cache } from 'react';
import type { IServerError } from '@/models/errors';
import type { IProduct } from '@/models/products';

export const getProduct = async (params: {
  productId: string;
}): Promise<IProduct | IServerError> => {
  let product;
  try {
    product = await fetch(
      `http://localhost:5000/api/product/${params.productId}`
    );
    product = await product.json();
  } catch (error) {
    console.log('error', error);
  }
  return product;
};
