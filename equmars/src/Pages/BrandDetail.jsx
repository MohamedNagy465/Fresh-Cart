import React from 'react';
import Loading from '../Component/Loading';
import Card from '../Component/Card';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export default function BrandDetails() {
  const { id } = useParams();

  const {
    data: brandData,
    isLoading: isBrandLoading,
    isError: isBrandError,
  } = useQuery({
    queryKey: ['brand', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`),
  });

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useQuery({
    queryKey: ['brand-products', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`),
  });

  const isLoading = isBrandLoading || isProductsLoading;
  const isError = isBrandError || isProductsError;
  const brand = brandData?.data?.data;
  const products = productsData?.data?.data || [];

  return (
    <div className="pt-[80px] min-h-[calc(100vh-80px)] bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <Loading />
        </div>
      ) : isError ? (
        <h3 className="text-2xl text-red-600 text-center py-10">
          ❌ حدث خطأ أثناء تحميل بيانات البراند أو المنتجات.
        </h3>
      ) : (
        <div className="container mx-auto px-4 py-5">
          {brand && (
            <h2 className="text-3xl font-semibold text-center text-green-600 mb-6">
              {brand.name}
            </h2>
          )}

          {products.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map((product) => (
                <Card key={product._id} item={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-lg">
              لا توجد منتجات لهذا البراند.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
