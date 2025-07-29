import axios from 'axios';
import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { object, string } from 'yup';

export default function VerifyCode() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function verifyCode(values) {
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      setError("");

      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      );

      toast.success("Code verified successfully!");
      console.log(data);

      setTimeout(() => {
        navigate("/resetPassword");
      }, 1000);

    } catch (error) {
      const msg = error.response?.data?.message || "Expired or invalid code";
      toast.error(msg);
      setError(msg);
      console.log(error);
    } finally {
      toast.dismiss(toastId);
      setLoading(false);
    }
  }

  const validationSchema = object({
    resetCode: string().required("Code is required"),
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: verifyCode,
    validationSchema,
  });

  return (
    <div className="py-30">
      <h1 className="text-2xl font-bold">Verify Code</h1>

      {error && <h3 className="text-red-500">{error}</h3>}

      <form className="space-y-2 mt-5" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="resetCode">Code</label>
          <input
            type="text"
            placeholder="Enter reset code"
            className="input"
            name="resetCode"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resetCode && formik.errors.resetCode && (
            <p className="text-red-500 font-semibold my-2">
              {formik.errors.resetCode}
            </p>
          )}
        </div>
        <button
          className="btn flex justify-center items-center gap-2"
          type="submit"
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
  );
}
