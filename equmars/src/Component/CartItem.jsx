import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../Context/CartContext';

export default function CartItem({ item }) {
  const { deleteItem, updateCartItem, disabled } = useContext(cartContext);
  const [localCount, setLocalCount] = useState(item.count);

  useEffect(() => {
    setLocalCount(item.count);
  }, [item.count]);

  function handleManualChange(e) {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setLocalCount(value);
    updateCartItem(item.product._id, value);
  }

  return (
    <div className="flex items-center bg-gray-50 rounded-lg p-4 mb-4 shadow-sm transition hover:shadow-md">
      {/* أزرار الحذف والمفضلة */}
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => deleteItem(item.product._id)}
          disabled={disabled}
          className="btn bg-red-400 hover:bg-red-500 disabled:opacity-50"
          title="حذف"
        >
          حذف
        </button>
        <button
          className="text-gray-400 hover:text-pink-500"
          title="إضافة إلى المفضلة"
        >
          ❤️
        </button>
      </div>

      {/* صورة المنتج */}
      <img
        src={item.product?.imageCover}
        alt={item.product?.title}
        className="w-20 h-20 object-cover rounded-lg mr-4"
      />

      {/* تفاصيل المنتج */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800 line-clamp-1">
          {item.product?.title}
        </h3>
        <p className="text-sm text-gray-500">السعر للوحدة: EGP {item?.price}</p>
      </div>

      {/* التحكم في العدد */}
      <div className="flex items-center border-gray-100">
        <button
          disabled={disabled || localCount <= 0}
          onClick={() => {
            const newCount = localCount - 1;
            setLocalCount(newCount);
            updateCartItem(item.product._id, newCount);
          }}
          className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
        >
          -
        </button>

        <input
          className="h-8 w-20 border bg-white text-center text-xs outline-none"
          type="number"
          value={localCount}
          min={0}
          onChange={handleManualChange}
        />

        <button
          disabled={disabled}
          onClick={() => {
            const newCount = localCount + 1;
            setLocalCount(newCount);
            updateCartItem(item.product._id, newCount);
          }}
          className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
        >
          +
        </button>
      </div>

      {/* السعر الإجمالي */}
      <div className="w-24 text-right font-medium text-green-700">
        EGP {item?.price * localCount}
      </div>
    </div>
  );
}
cartContext