import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import { Loader2 } from 'lucide-react'

export default function Forget() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function forgetPassword(values) {
    setLoading(true)
    const toastId = toast.loading("جاري الإرسال ...")
    try {
      setError(null)
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "post",
        data: values
      }
      const { data } = await axios.request(options)
      toast.success("تم إرسال الكود إلى البريد الإلكتروني")

      setTimeout(() => {
        navigate("/verifyCode")
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || "حدث خطأ أثناء الإرسال")
      toast.error(error.response?.data?.message || "حدث خطأ")
    } finally {
      toast.dismiss(toastId)
      setLoading(false)
    }
  }

  const validationSchema = object({
    email: string("email must be string").required("البريد الإلكتروني مطلوب").email("يرجى إدخال بريد إلكتروني صالح"),
  })

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: forgetPassword,
    validationSchema,
  })

  return (
    <div className=' py-30'>
      <h1 className='text-2xl font-bold'>نسيت كلمة المرور</h1>

      {error && <h3 className='text-red-500'>{error}</h3>}

      <form className='space-y-2 mt-5' onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="text"
            placeholder='البريد الإلكتروني'
            className='input'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-500 font-semibold my-4'>{formik.errors.email}</p>
          )}
        </div>

        <button className='btn flex justify-center items-center gap-2' type='submit' disabled={loading}>
          {loading ? <><Loader2 className="animate-spin w-5 h-5" /> جاري الإرسال...</> : "إرسال"}
        </button>
      </form>
    </div>
  )
}
