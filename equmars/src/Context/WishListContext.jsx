import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const wishListContext = createContext(null);


export default function WishListContextProvider({children}) {
  let[wish,setWish]=useState(null)
   const [loading, setLoading] = useState(false);
    async function getLoggedUserWish() {
    try {
      setLoading(true)
      let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
        headers: {
          token : localStorage.getItem("token")
        }
      })
      console.log(data.data)
        setWish(data.data)
        setWish(data?.data);
    return data?.data; 
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
    }
    async function addToWishList(productId) {
     try {
       let {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{
        productId
      },{
         headers: {
          token : localStorage.getItem("token")
        }
      })
      setWish(data.data)
      toast.success("add to wishList");
     } catch (error) {
      toast.error(error?.response?.data?.message)
     }
    }
    async function removeItem(idItem) {
      try {
        let {data} = await axios.delete(`https:ecommerce.routemisr.com/api/v1/wishlist/${idItem}`,{
          headers: {
          token : localStorage.getItem("token")
        }
        })
        setWish(data.data)

        toast.success("تم الحذف")
      } catch (error) {
         toast.error(error?.response?.data?.message)
      }
    }
    useEffect(()=>{
      getLoggedUserWish()
    },[])



  return (
    <wishListContext.Provider value={{
      wish,
      getLoggedUserWish,
      addToWishList,
      loading,
      removeItem
      }}>
      {children}
    </wishListContext.Provider>
)
}
