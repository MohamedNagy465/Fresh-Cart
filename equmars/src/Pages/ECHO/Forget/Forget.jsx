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
    const toastId = toast.loading("Sending...")
    try {
      setError(null)
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "post",
        data: values
      }
      const { data } = await axios.request(options)
      toast.success("Verification code sent to your email!")

      setTimeout(() => {
        navigate("/verifyCode")
      }, 3000)
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred")
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      toast.dismiss(toastId)
      setLoading(false)
    }
  }

  const validationSchema = object({
    email: string()
      .required("Email is required")
      .email("Please enter a valid email address"),
  })

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: forgetPassword,
    validationSchema,
  })

  return (
    <div className='py-30'>
      <h1 className='text-2xl font-bold'>Forget Password</h1>

      {error && <h3 className='text-red-500 my-4 font-semibold'>{error}</h3>}

      <form className='space-y-2 mt-5' onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder='Enter your email'
            className='input bg-slate-200'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className='text-red-500 font-semibold my-2'>{formik.errors.email}</p>
          )}
        </div>

        <button
          className='btn flex justify-center items-center gap-2'
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> 
            </>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  )
}
