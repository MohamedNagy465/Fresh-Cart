import React, { useState } from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function ResetPassword() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState("password")
  const regexPassword = /^[A-Z][a-z0-9]{5,}$/

  // toggle show/hide password
  const showPassword = () => {
    setShowPass(showPass === "password" ? "text" : "password")
  }

  // validation
  const validationSchema = object({
    email: string()
      .required("Email is required")
      .email("Please enter a valid email"),
    newPassword: string()
      .required("Password is required")
      .matches(regexPassword, "Password must start with a capital letter followed by at least 5 letters or numbers"),
  })

  // send data to API
  const sendResetData = async (values) => {
    setLoading(true)
    const toastId = toast.loading("Submitting...")
    try {
      setError("")
      const trimmedValues = {
        email: values.email.trim(),
        newPassword: values.newPassword.trim()
      }
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        trimmedValues
      )
      localStorage.setItem("token", data.token)
      toast.success("Password changed successfully")
      setTimeout(() => navigate("/home"), 2000)
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred")
      toast.error(err.response?.data?.message || "An error occurred")
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
    onSubmit: sendResetData,
    validationSchema,
  })

  return (
    <div className='py-20 '>
      <h1 className='text-2xl font-bold mb-6'>Reset Password</h1>
      {error && <p className='text-red-500 font-semibold mb-4'>{error}</p>}

      <form className='space-y-4' onSubmit={formik.handleSubmit}>
        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input bg-slate-200"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-500 text-sm'>{formik.errors.email}</p>
          )}
        </div>

        {/* New Password */}
        <div className=" flex flex-col space-y-2">
          <label>New Password</label>
        <div className="relative">
            <input
            type={showPass}
            name="newPassword"  
            placeholder="Enter new password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input w-full pr-10 bg-slate-200"
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
            <p className="text-red-500 text-sm">{formik.errors.newPassword}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={loading}
          className='btn  flex justify-center items-center gap-2 cursor-pointer'
        >
          {loading ? <><Loader2 className="animate-spin w-5 h-5" /></> : "Reset Password"}
        </button>
      </form>
    </div>
  )
}
