import type {
  IProduct,
  IProductRates,
  IRate,
  IRateSuccess,
  IType,
} from '@/models/products';
import { baseApi } from './api/baseApi';
import {
  PRODUCT_ROUTE,
  PRODUCT_ROUTE_TYPE,
  PRODUCT_TAG,
  RATING_ROUTE,
  RATING_TAG,
  TYPE_TAG,
} from '@/lib/utils/consts';
import type { IFormRate, IFormRateUpdate, IRateRefs } from '@/models/forms';

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ selectedType, limit, page, title }) => ({
        url: PRODUCT_ROUTE,
        method: 'GET',
        params: { typeId: selectedType, limit, page, title },
      }),
      providesTags: [PRODUCT_TAG],
    }),
    getTypes: build.query<IType[], null>({
      query: () => ({
        url: PRODUCT_ROUTE_TYPE,
        method: 'GET',
      }),
      providesTags: [TYPE_TAG],
    }),
    getOneProduct: build.query<IProduct, string>({
      query: (id) => ({
        url: `${PRODUCT_ROUTE}/${id}`,
        method: 'GET',
      }),
    }),
    createType: build.mutation<IType, { name: string }>({
      query: (name) => ({
        url: PRODUCT_ROUTE_TYPE,
        method: 'POST',
        body: name,
      }),
      invalidatesTags: [TYPE_TAG],
    }),
    createProduct: build.mutation<IProduct, FormData>({
      query: (body) => {
        return {
          url: PRODUCT_ROUTE,
          method: 'POST',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          body,
        };
      },
      invalidatesTags: [PRODUCT_TAG],
    }),

    getProductRates: build.query<
      IProductRates,
      { productId: string; page: number }
    >({
      query: ({ productId, page }) => ({
        url: `${RATING_ROUTE}/rates`,
        method: 'GET',
        params: { productId, page },
      }),
      providesTags: [RATING_TAG],
    }),
    createRate: build.mutation<IRate, IFormRate>({
      query: (body) => ({
        url: `${RATING_ROUTE}/rate`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [RATING_TAG],
    }),
    updateRate: build.mutation<IRate, IFormRate>({
      query: (body) => ({
        url: `${RATING_ROUTE}/rate/update`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [RATING_TAG],
    }),
    checkRate: build.mutation<IRateSuccess, IRateRefs>({
      query: (body) => ({
        url: `${RATING_ROUTE}/rate/check`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [RATING_TAG],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTypesQuery,
  useGetOneProductQuery,
  useCreateTypeMutation,
  useCreateProductMutation,
  useGetProductRatesQuery,
  useCreateRateMutation,
  useUpdateRateMutation,
  useCheckRateMutation,
} = productApi;
