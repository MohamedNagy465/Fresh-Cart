import React, { useState } from 'react';
import Card from '../Component/Card';
import axios from 'axios';
import Loading from '../Component/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Product() {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', page],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`),
    keepPreviousData: true,
  });

  return (
    <div className="pt-20">
      <h3 className="relative text-2xl mt-10 mb-5 text-center font-bold after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-80 after:h-1 after:bg-green-500 rounded">
        Shop now by popular products
      </h3>

      {isLoading ? (
        <div className="text-center text-green-500 text-lg font-medium py-10">
          <Loading />
        </div>
      ) : isError ? (
        <h3 className="text-6xl text-red-600 text-center">There are no products</h3>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-5">
            {data?.data?.data?.map((item) => (
              <Card key={item?.id} item={item} />
            ))}
          </div>

          <div className="flex my-5 justify-center items-center gap-2 flex-wrap">
            {[...Array(data?.data?.metadata?.numberOfPages)]?.map((_, index) => (
              <button
                key={index}
                onClick={() => setPage(index + 1)}
                className={`px-4 py-2 rounded transition duration-150 font-medium ${
                  page === index + 1
                    ? 'bg-green-700 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
