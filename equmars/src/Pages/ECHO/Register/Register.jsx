import React, { useState } from 'react'
import { useFormik } from "formik"
import axios from 'axios';
import { object, ref, string } from 'yup';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';


export default function Register() {
  const regexPassword = /^[A-Z][a-z0-9]{5,}$/
  const regexPhone = /^01[0125][0-9]{8}$/
  const [show, setShow] = useState("password")
  const [showConfirmPass, setShowConfirmPass] = useState("password");
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)   
  const navigate = useNavigate()
  function showPassword() {
    setShow(show === "password" ? "text" : "password")
  }

  function showRePassword() {
    setShowConfirmPass(showConfirmPass === "password" ? "text" : "password")
  }

  async function sendDateToRegister(value) {
    setLoading(true)
    const toastId = toast.loading("جاري التسجيل...")
    try {
      setError("")
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "post",
        data: value
      }
      const { data } = await axios.request(options)
      toast.success("تم إنشاء الحساب بنجاح")
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch (error) {
      setError("Please fill in all required fields correctly.");
      toast.error(error.response?.data?.message)
    } finally {
      toast.dismiss(toastId)
      setLoading(false)
    }
  }
const validationSchema = object({
  name: string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 20 characters"),

  email: string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  password: string()
    .required("Password is required")
    .matches(regexPassword, "Password must start with a capital letter followed by 5 letters or numbers"),

  rePassword: string()
    .required("Password confirmation is required")
    .oneOf([ref("password")], "Passwords do not match"),

  phone: string()
    .required("Phone number is required")
    .matches(regexPhone, "Phone number must be a valid Egyptian number")
});

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    onSubmit: sendDateToRegister,
    validationSchema,
  })

  return (
    <div className='py-30'>
      <h1 className='text-2xl font-bold'>Register Form</h1>
      {error && <h3 className='text-red-500'>{error}</h3>}
      <form className='space-y-2' onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2 mt-2 ">
          <label>UserName</label>
          <input
            type="text"
            className='input bg-slate-200'
            placeholder='UserName'
            name='name'
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className='text-red-500 font-semibold my-4'>{formik.errors.name}</p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label>Email</label>
          <input
            type="text"
            className='input bg-slate-200'
            placeholder='Email'
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
          <label>Password</label>
          <div className="relative">
            <input
              type={show}
              className="input w-full pr-10"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={showPassword}
            >
              {show === "password" ? (
                <EyeOff className="text-mainColor" />
              ) : (
                <Eye className="text-mainColor" />
              )}
            </div>
          </div>
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 font-semibold text-sm">
              {formik.errors.password}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label>Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPass}
              className="input w-full pr-10"
              placeholder="Confirm Password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={showRePassword}
            >
              {showConfirmPass === "password" ? (
                <EyeOff className="text-mainColor" />
              ) : (
                <Eye className="text-mainColor" />
              )}
            </div>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 font-semibold text-sm">
              {formik.errors.rePassword}
            </p>
          )}
        </div>

        <div className="flex flex-col space-y-2 ">
          <label>Phone</label>
          <input
            type="text"
            className='input bg-slate-200'
            placeholder='Phone'
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className='text-red-500 font-semibold my-4'>{formik.errors.phone}</p>
          )}
        </div>

        <button
          className='btn flex justify-center items-center gap-2'
          type='submit'
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5" /> جاري التسجيل...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  )
}
