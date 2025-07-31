import React from 'react'

export default function Footer() {
  return (
    <div className="bg-slate-100 py-10">
  <div className="max-w-screen-xl mx-auto px-4 space-y-6">
    
    {/* العنوان والوصف */}
    <div>
      <h2 className="text-2xl font-semibold text-slate-800">Get The Fresh App</h2>
      <p className="text-slate-400 mt-2">
        We will send you a link, open it on your phone to download the app.
      </p>
    </div>

    {/* فورم الإيميل */}
    <form method="post" className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        placeholder="Email"
        className="input flex-1 px-4 py-2 "
      />
      <button type="submit" className="bg-mainColor text-white px-6 py-2 rounded-md w-full sm:w-auto">
        Share App Link
      </button>
    </form>

    {/* صور الدفع والتنزيل */}
    <div className="flex flex-col gap-8 lg:flex-row justify-between items-start lg:items-center pt-6">
      
      {/* وسائل الدفع */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
        <h3 className="text-slate-700 font-medium min-w-[150px]">Payment Partners:</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <img className="w-20 h-auto" src="/amazon-pay.png" alt="Amazon Pay" />
          <img className="w-20 h-auto" src="/paypal.png" alt="PayPal" />
          <img className="w-20 h-auto" src="/mastercard.webp" alt="MasterCard" />
          <img className="w-20 h-auto" src="/American-Express-Color.png" alt="American Express" />
        </div>
      </div>

      {/* روابط تحميل التطبيق */}ِِ
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
        <h3 className="text-slate-700 font-medium min-w-[150px]">Get Deliveries with FreshCart:</h3>
        <div className="flex gap-4 flex-wrap items-center">
          <img className="w-32 h-auto" src="/get-apple-store.png" alt="Download on Apple Store" />
          <img className="w-32 h-auto" src="/get-google-play.png" alt="Get it on Google Play" />
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
