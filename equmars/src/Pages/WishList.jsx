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
        const response = await getLoggedUserWish(); // نفترض إن الدالة بترجع القايمة
        setWishData(response); // احفظ الداتا داخليًا
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
      <div className="text-center text-gray-600 my-40 flex items-center justify-center gap-1">
        <Heart /> لا توجد عناصر في المفضلة حاليًا.
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
