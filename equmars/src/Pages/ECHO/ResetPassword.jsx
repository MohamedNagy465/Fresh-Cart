import React, { useState } from 'react'
import { useFormik } from 'formik'
import { object, string, ref } from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function ResetPassword() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)  // حالة التحميل
  const navigate = useNavigate()
  const regexPassword = /^[A-Z][a-z0-9]{5,}$/
  let [showPass, setShowPass] = useState("password")
  
  function showPassword() {
    setShowPass(showPass === "password" ? "text" : "password")
  }

  const validationSchema = object({
    email: string("email must be string")
      .required("emil is required")
      .email("email must be vaild"),
    newPassword: string("")
      .required("password is required")
      .matches(regexPassword, "[A-Z][a-z0-9]{5,}"),
  })

  async function sendLoginData(values) {
    setLoading(true)
    const toastId = toast.loading("loading ....")
    try {
      setError("")
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "put",
        data: values
      }
      const { data } = await axios.request(options)
      localStorage.setItem("token", data.token)
      toast.success("Password Change Success")
      setTimeout(() => {
        navigate("/Home")
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول")
      toast.error(error.response?.data?.message || "حدث خطأ")
    } finally {
      toast.dismiss(toastId)
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: sendLoginData,
    validationSchema,
  })

  return (
    <div className='py-30'>
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-bold '>ResetPassword</h1>
      </div>
      {error && <h3 className='text-red-500'>{error}</h3>}

      <form action="" className='space-y-2 mt-5' onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="">email</label>
          <input
            type="text"
            placeholder='email '
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
        <div className="flex flex-col space-y-2">
          <label htmlFor="password">Password</label>

          <div className="relative">
            <input
              type={showPass}
              name="newPassword"
              placeholder="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input w-full"
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={showPassword}
            >
              {showPass === "password" ? (
                <EyeOff className="text-mainColor" />
              ) : (
                <Eye className="text-mainColor" />
              )}
            </div>
          </div>
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-red-500 font-semibold text-sm">
              {formik.errors.newPassword}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
         <button
          className='btn cursor-pointer flex items-center justify-center gap-2'
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" />
            </>
          ) : (
            "rest"
          )}
        </button>

         
        </div>
      </form>
    </div>
  )
}
