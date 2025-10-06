import React, { useContext, useEffect, useState } from 'react';
import { wishListContext } from '../Context/WishListContext';
import Loading from '../Component/Loading';
import WishItem from '../Component/WishItem';
import { Heart } from 'lucide-react';
export default function WishList() {
  const { getLoggedUserWish, loading } = useContext(wishListContext);
  const [wishData, setWishData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    async function fetchWish() {
      setIsFetching(true);
      try {
        const response = await getLoggedUserWish();  
        setWishData(response); 
      } catch (err) {
        console.error("فشل في تحميل المفضلة", err);
      } finally {
        setIsFetching(false);
      }
    }
    fetchWish();
  }, []);
  function handleRemoveItem(id) {
    setWishData((prev) => prev.filter((item) => item._id !== id));
  }
  if (loading || isFetching) {
    return (
      <div className="text-center text-green-500 text-lg font-medium py-20">
        <Loading />
      </div>
    );
  }

 if (!wishData.length) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-32 text-gray-500">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
        <Heart className="w-10 h-10 text-red-500 animate-pulse" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">المفضلة فارغة</h2>
      <p className="text-sm text-gray-400">لم تقم بإضافة أي منتجات حتى الآن.</p>
    </div>
  );
}

  return (
    <div className="container bg-gray-100 my-30 p-5">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">المفضلة</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishData.map((item) => (
          <WishItem key={item._id} item={item} onRemove={handleRemoveItem} />
        ))}
      </div>
</div>
);
}
