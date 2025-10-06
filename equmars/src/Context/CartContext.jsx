  import axios from "axios";
  import { createContext, useEffect, useState } from "react";
  import toast from "react-hot-toast";
  export let cartContext = createContext(null);
  export default function CartContextProvider({ children }) {
    let [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
      async function getLoggedUserCart() {
        setLoading(true);
        try {
          const { data } = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/cart",
            {
            headers: {
            token : localStorage.getItem("token")
          }
            }
          );
          setCart(data);
        } catch (error) {
          console.log("❌ getLoggedUserCart error", error);
        } finally {
          setLoading(false);
        }
      }

    useEffect(() => {
      {
        getLoggedUserCart();
      }
    }, []);

    async function AddToCrt(productId) {
      try {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          { productId },
          {
            headers: {
          token : localStorage.getItem("token")
        }
          }
        );
        setCart(data);
        toast.success("تمت الإضافة إلى السلة");
      } catch (error) {
        toast.error(error?.response?.data?.message || "فشل في الإضافة");
        console.log(error);
      }
    }

    async function deleteItem(cartItemId) {
      try {
        const { data } = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
          {
            headers: {
          token : localStorage.getItem("token")
        }
          }
        );
        setCart(data);
        toast.success("clear Item");
      } catch (error) {
        toast.error(error?.response?.data?.message || "فشل في الحذف");
        console.log(error);
      }
    }

    async function clearItem() {
      try {
        setDisabled(true);
        const { data } = await axios.delete(
          `https://ecommerce.routemisr.com/api/v1/cart`,
          {
          headers: {
          token : localStorage.getItem("token")
        }
          }
        );
        setCart(data);
        toast.success("تم مسح السلة");
      } catch (error) {
        toast.error(error?.response?.data?.message || "فشل في مسح السلة");
        console.log(error);
      } finally {
        setDisabled(false);
      }
    }

    async function updateCartItem(cartItemId, count) {
      try {
        setDisabled(true);
        const { data } = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${cartItemId}`,
          { count },
          {
            headers: {
          token : localStorage.getItem("token")
          }
          }
        );
        setCart(data);
        toast.success("تم التحديث");
      } catch (error) {
        toast.error(error?.response?.data?.message || "فشل في التحديث");
        console.log(error);
      } finally {
        setDisabled(false);
      }
    }

    return (
      <cartContext.Provider
        value={{
          cart,
          setDisabled,
          disabled,
          AddToCrt,
          getLoggedUserCart,
          loading,
          deleteItem,
          clearItem,
          updateCartItem,
        }}
      >
        {children}
      </cartContext.Provider>
    );
  }

    