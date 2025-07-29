import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../Component/Loading';
import { useQuery } from '@tanstack/react-query';

export default function AllOrders() {
  const userId = localStorage.getItem("userId");

  const {
    data: orders = [],
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`).then(res => res.data),
    enabled: !!userId,
    retry: 1,
  });

  if (!userId) {
    return (
      <div className="text-center text-red-600 mt-20">
        خطأ: الرجاء تسجيل الدخول أولاً.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <span className="text-green-600 text-lg animate-pulse">
          <Loading />
        </span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-20">
        {error?.message || 'حدث خطأ أثناء جلب الطلبات'}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-gray-700 text-xl font-medium my-50">
        لا توجد طلبات حتى الآن.
      </p>
    );
  }

  return (
    <div className="container  px-4 pt-28 pb-6 min-h-screen">
      {orders.map((item) => (
        <div
          key={item.id}
          className="bg-white shadow rounded p-6 space-y-6 border border-gray-200 mb-6 max-w-full"
        >
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-4 bg-gray-100 p-4 rounded border border-gray-300">
            <p className="text-gray-800 font-semibold text-base lg:text-lg w-full lg:w-auto">
              رقم الطلب: <span className="text-gray-600 font-medium">#{item.id}</span>
            </p>
            <p className="text-gray-800 font-semibold text-base lg:text-lg w-full lg:w-auto">
              بتاريخ:{" "}
              <span className="text-gray-600 font-medium">
                {new Date(item.updatedAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </p>
            <p className="text-gray-800 font-semibold text-base lg:text-lg w-full lg:w-auto">
              الدفع: <span className="text-gray-600 font-medium">{item.paymentMethodType}</span>
            </p>
            <Link
              to="/product"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300 font-medium w-full lg:w-auto text-center"
            >
              + تسوق الآن
            </Link>
          </div>

          {/* Items */}
          <div className="flex flex-col items-start gap-5 w-full">
            {item.cartItems?.map((cartItem, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 bg-gray-50 p-3 rounded border border-gray-200 w-full"
              >
                <img
                  className="h-[100px] w-[100px] object-cover bg-white shadow rounded flex-shrink-0"
                  src={cartItem.product?.imageCover}
                  alt={cartItem.product?.title || "Product"}
                />
                <div className="flex flex-col text-left flex-grow min-w-0">
                  <p className="text-gray-600 text-lg font-semibold line-clamp-1">
                    {cartItem.product?.title?.split(" ").slice(0, 2).join(" ")}
                  </p>
                  <p className="text-gray-800 font-medium text-sm md:text-base">
                    السعر: <span className="text-gray-600">EGP {cartItem.price}</span>
                  </p>
                  <p className="text-gray-800 font-medium text-sm md:text-base">
                    الكمية: <span className="text-gray-600">{cartItem.count}</span>
                  </p>
                  <p className="text-gray-800 font-medium text-sm md:text-base truncate">
                    القسم: <span className="text-gray-600">{cartItem.product.category?.name}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-gray-100 p-4 rounded shadow-sm border border-gray-300 mt-2 w-full">
            <p className="text-gray-800 font-semibold text-base lg:text-lg mb-2">
              عدد المنتجات: <span className="text-gray-600">{item.cartItems.length}</span>
            </p>
            <p className="text-gray-800 font-semibold text-base lg:text-lg mb-2">
              الشحن: <span className="text-gray-600">EGP {item.shippingPrice}</span>
            </p>
            <p className="text-gray-800 font-semibold text-base lg:text-lg mb-2">
              الضرائب: <span className="text-gray-600">EGP {item.taxPrice}</span>
            </p>
            <p className="text-gray-800 font-semibold text-base lg:text-lg">
              الإجمالي: <span className="text-gray-600">EGP {item.totalOrderPrice}</span>
            </p>
          </div>

          {/* Order Again Button */}
          <div className="text-right w-full">
            <button
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 w-full sm:w-auto"
              onClick={() => toast.success("تم تنفيذ الطلب مرة أخرى بنجاح!")}
            >
              تنفيذ الطلب مرة أخرى
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

