import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { object, string } from 'yup'
import { cartContext } from '../Context/CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export default function CheckOut() {
  const regexPhone = /^01[0125][0-9]{8}$/
  const { cart } = useContext(cartContext)
  const navigate = useNavigate()
  const cartId = cart?.data?._id
  const [pay, setPay] = useState("cash")
  const [loading, setLoading] = useState(false)

  async function handlePayment(values) {
    if (!cartId || !cart?.data?.products?.length) {
      toast.error("❌ لا يمكن إتمام الطلب لأن السلة فارغة")
      return
    }

    setLoading(true)
    try {
      if (pay === "cash") {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          { shippingAddress: values },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        toast.success("تم تأكيد الطلب")
        if (data.status === "success") {
          navigate("/AllOrders")
        }
      } else {
        const { data } = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
          { shippingAddress: values },
          {
            headers: {
              token: localStorage.getItem("token")
            }
          }
        )
        if (data.status === "success") {
          window.location.href = data.session.url
        }
      }
    } catch (error) {
      console.error("❌ Order failed:", error)
      toast.error("فشل في بدء عملية الدفع")
    } finally {
      setLoading(false)
    }
  }

  const validationSchema = object({
    details: string().required("must be required"),
    phone: string().required("phone is required").matches(regexPhone, "phone must be Egyptian number"),
    city: string().required("must be required"),
  })

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: ""
    },
    onSubmit: handlePayment,
    validationSchema,
  })

  return (
    <div>
      <form
        id="checkOut"
        className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary flex flex-col gap-6 mt-12"
        onSubmit={formik.handleSubmit}
      >
        <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

        <input
          className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
          autoComplete="off"
          type="text"
          placeholder="Enter Your City Name"
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.city && formik.touched.city && (
          <p className="text-red-600 font-bold text-sm -my-3">{formik.errors.city}</p>
        )}

        <input
          className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
          autoComplete="off"
          type="tel"
          placeholder="Enter Your Phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-red-600 font-bold text-sm -my-3">{formik.errors.phone}</p>
        )}

        <textarea
          className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
          placeholder="Details"
          name="details"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.details && formik.touched.details && (
          <p className="text-red-600 font-bold text-sm -my-3">{formik.errors.details}</p>
        )}

        <div className="flex max-md:flex-col gap-4 justify-between items-center">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setPay("cash")
              formik.handleSubmit()
            }}
            className="btn cursor-pointer bg-primary hover:bg-darkPrimary text-white w-full flex py-2 text-nowrap items-center justify-center gap-2"
          >
            {loading && pay === "cash" ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
              </>
            ) : (
              <span>Cash Order</span>
            )}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setPay("online")
              formik.handleSubmit()
            }}
            className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-blue-600 text-darkPrimary w-full"
          >
            {loading && pay === "online" ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
              </>
            ) : (
              <span>Online Order</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
