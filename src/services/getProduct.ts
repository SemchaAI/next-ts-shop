// import { cache } from 'react';
import type { IServerError } from '@/models/errors';
import type { IProduct } from '@/models/products';

export const getProduct = async (params: {
  productId: string;
}): Promise<IProduct | IServerError> => {
  let product;
  try {
    product = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL_BD}/api/product/${params.productId}`
    );
    product = await product.json();
  } catch (error) {
    console.log('error', error);
  }
  return product;
};
