import React, { useContext, useState } from 'react';
import { Heart, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import { wishListContext } from '../Context/WishListContext';
import { cartContext } from '../Context/CartContext';

export default function WishItem({ item, onRemove }) {
  const { removeItem, loading: wishLoading } = useContext(wishListContext);
  const { AddToCrt, loading: cartLoading } = useContext(cartContext);

  const [localRemoveLoading, setLocalRemoveLoading] = useState(false);
  const [localAddLoading, setLocalAddLoading] = useState(false);

  async function handleRemove() {
    try {
      setLocalRemoveLoading(true);
      await removeItem(item._id);
      if (onRemove) onRemove(item._id); 
    } catch (error) {
      console.error('فشل في الإزالة من المفضلة:', error);
    } finally {
      setLocalRemoveLoading(false);
    }
  }

  async function handleAddToCart() {
    try {
      setLocalAddLoading(true);
      await AddToCrt(item._id);
    } catch (error) {
      console.error('فشل في الإضافة إلى السلة:', error);
    } finally {
      setLocalAddLoading(false);
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 flex flex-col overflow-hidden group">
      <div className="relative">
        <img
          src={item.imageCover}
          alt={item.name || 'منتج'}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="flex flex-col p-4 gap-2">
        <h3 className="text-base font-semibold text-gray-800 truncate" title={item.name}>
          {item.name}
        </h3>

        {item.price && (
          <p className="text-green-600 font-bold text-sm">{item.price} EGP</p>
        )}

        <p className="text-sm text-gray-500 line-clamp-2">
          {item.description || item.details || ''}
        </p>

        <div className="mt-auto flex gap-2">
          <button
            disabled={localAddLoading || cartLoading}
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            {localAddLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />   add to Cart
              </>
            )}
          </button>

          <button
            disabled={localRemoveLoading || wishLoading}
            onClick={handleRemove}
            className="flex items-center justify-center gap-2 px-3 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition disabled:opacity-50"
          >
            {localRemoveLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}