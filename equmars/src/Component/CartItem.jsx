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
    <div className="flex justify-between items-center bg-gray-50 rounded-lg p-4 mb-4 shadow-sm transition hover:shadow-md flex-wrap md:flex-nowrap">
      
      {/* الصورة + زر الحذف */}
      <div className="flex items-center gap-4 mb-4 md:mb-0">
       

        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => deleteItem(item.product._id)}
            disabled={disabled}
            className="btn bg-red-400 hover:bg-red-500 disabled:opacity-50 text-sm px-3"
            title="حذف"
          >
            حذف
          </button>
          <button
            className="text-gray-400 hover:text-pink-500 text-xl"
            title="إضافة إلى المفضلة"
          >
            ❤️
          </button>
          
        </div>
         <img
          src={item.product?.imageCover}
          alt={item.product?.title}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* اسم المنتج + العداد + السعر */}
      <div className="flex flex-col items-center justify-center gap-2 flex-1">
        {/* اسم المنتج */}
        <h3 className="font-semibold text-gray-800 text-center line-clamp-1">
          {item.product?.title}
        </h3>

        {/* العداد */}
        <div className="flex items-center">
          <button
            disabled={disabled || localCount <= 0}
            onClick={() => {
              const newCount = localCount - 1;
              setLocalCount(newCount);
              updateCartItem(item.product._id, newCount);
            }}
            className="disabled:cursor-not-allowed cursor-pointer rounded-l bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
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
            className="disabled:cursor-not-allowed cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
          >
            +
          </button>
        </div>

        {/* السعر للوحدة */}
        <p className="text-sm text-gray-500">السعر للوحدة: EGP {item?.price}</p>
      </div>
    </div>
  );
}
