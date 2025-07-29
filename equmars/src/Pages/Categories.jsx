import axios from 'axios';
import React from 'react';
import Card from '../Component/Card';
import Loading from '../Component/Loading';
import { useQuery } from '@tanstack/react-query';

export default function Categories() {
  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get("https://ecommerce.routemisr.com/api/v1/categories"),
  });

  return (
    <div className="pt-20">
      {isLoading ? (
        <div className="text-center text-green-500 text-lg font-medium py-10">
          <Loading />
        </div>
      ) : isError ? (
        <h3 className='text-6xl text-red-600 text-center'>There are no categories</h3>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 py-5">
          {data?.data?.data?.map((item) => (
            <Card key={item?._id} item={item} type="category" />
          ))}
        </div>
      )}
    </div>
  );
}
