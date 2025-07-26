import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { object, string } from 'yup'

export default function VerifyCode() {
  const [error , setError]= useState()
  const naviget = useNavigate()
  async function verifyCode(values){
     const loading = toast.loading("loading ....")
    try {
      setError("")
      const options = {
      url : "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      method: "post",
      data : values
    }
    const {data} = await axios.request(options) 
    toast.success("success")
    console.log(data)
     setTimeout(() => {
      naviget ("/resetPassword")
    }, 3000);
    } catch (error) {
    toast.error("expierd")
      console.log(error)
    }finally{
      toast.dismiss(loading)
    }
  }
    const validationSchema = object({
      resetCode:string("email must be string").required("code is required")
,
    })
  const formik =useFormik({
    initialValues:{
     resetCode :""
    },
    onSubmit:verifyCode,
    validationSchema,
  })
  return (
     <div className='py-30'>
              <h1 className='text-2xl font-bold'>VerifyCode</h1> 

          {error&&<h3 className='text-red-500'>{error}</h3>}

      <form action="" className='space-y-2 mt-5' onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="">code</label>
          <input type="text" placeholder='resetCode ' className='input'
          name='resetCode'
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          {formik.errors.resetCode && formik.touched.resetCode && <p className='text-red-500 font-semibold my-4'>{formik.errors.resetCode}</p>}
        </div>
          <button className='btn' type='submit'>submit</button>

      </form>
    </div>
  )
}
