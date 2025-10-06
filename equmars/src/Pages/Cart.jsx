import { useContext, useEffect } from 'react'
import { cartContext } from '../Context/CartContext'
import CartItem from '../Component/CartItem'
import CheckOut from '../Component/CheckOut'

export default function Cart() {
  let {cart, getLoggedUserCart, loading, clearItem ,disabled}= useContext(cartContext)
  useEffect(()=>{
    getLoggedUserCart()
  },[])
    if(loading){
      return  <div className="bg-white my-20 p-5">
  <h1 className="mb-10 text-center text-2xl font-bold animate-pulse bg-gray-300 h-8 w-1/2 mx-auto"></h1>
  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
      <div className="animate-pulse bg-gray-300 h-24 rounded-lg mb-4"></div>
      <div className="animate-pulse bg-gray-300 h-24 rounded-lg mb-4"></div>
      <div className="animate-pulse bg-gray-300 h-24 rounded-lg mb-4"></div>
    </div>
    <div className="mt-6 h-full rounded-lg bg-gray-200 p-6 md:mt-0 md:w-1/3">
      <div className="mb-2 flex justify-between">
        <div className="animate-pulse bg-gray-300 h-4 w-1/3"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-1/4"></div>
      </div>
      <div className="flex justify-between">
        <div className="animate-pulse bg-gray-300 h-4 w-1/3"></div>
        <div className="animate-pulse bg-gray-300 h-4 w-1/4"></div>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between">
        <div className="animate-pulse bg-gray-300 h-6 w-1/4"></div>
        <div>
          <div className="animate-pulse bg-gray-300 h-4 w-1/2 mb-1"></div>
          <div className="animate-pulse bg-gray-300 h-4 w-1/3"></div>
        </div>
      </div>
      <button className="mt-6 w-full rounded-md bg-gray-300 py-1.5 font-medium text-gray-50 animate-pulse"></button>
    </div>
  </div>
</div> }
  return (
    <div className=" bg-gray-100 my-20 p-5">
  <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    {!cart?.data?.products?.length ? 
      <h2 className="text-center text-3xl text-red-600 py-10">🛒  No Item</h2>
    : <div className=" justify-center px-6 md:flex md:space-x-6 xl:px-0">
    <div className="rounded-lg md:w-2/3">
       {cart?.data?.products?.map((item)=>{
        return <CartItem  key={item._id} item={item}/>
      })}    
  
      
    </div>
    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
    <button onClick={clearItem}
      disabled={disabled}
    className='disabled:cursor-not-allowed  btn bg-red-500 hover:bg-red-700 my-4 w-full'>clear</button>
       <span className="text-lg font-semibold">
          Total: {cart?.data?.totalCartPrice}
          <span className="text-green-600">
            EGP 
          </span>
        </span>
      <hr className="my-3 text-main" />
      <CheckOut />

    </div>
        
      </div>}
  </div>
  )
}
