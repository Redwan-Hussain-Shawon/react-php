'use client'
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SkeltonProjectinfo from "./SkeltonProjectinfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "@/app/_utils/GlobalApi";
import { CartContext } from "@/app/_context/CartContex";

function ProjectInfo({ productDetail }) {
  const [isLoading,setIsLoading] = useState(false);
  const [responseData,setResponseData] = useState(null); 
  const user = useSession();
  const router = useRouter();
  const {cart,setCart} = useContext(CartContext);
  const onAddToCartClick= async ()=>{
    if(user.data === null){
      router.push('/login');
      return;
    }else{
      setIsLoading(true);
      const data={
          email:user?.data?.user.email,
          product_id:productDetail?.id
      }
      const response = await axios.post('addToCart.php',data)
      setResponseData(response.data);
      setIsLoading(false);
    }
  }
  useEffect(()=>{
    if(responseData){
      if(responseData.status==='success'){
      setCart([...cart,productDetail])
      }
    alert(responseData.message)
    }
  },[responseData])
  return ( 
      <div>
        {productDetail ? 
          <div>
            <h2 className="text-[20px]">{productDetail.name}</h2>
            <h2 className="text-[15px] text-gray-400">
              {productDetail.category}
            </h2>
            <h2 className="text-[15px] mt-5 text-gray-700">
              {productDetail.description}
            </h2>
            <h2 className="text-[35px] text-primary font-medium mt-5">
              ${productDetail.price}
            </h2>
            <button onClick={onAddToCartClick} className="bg-primary hover:bg-blue-600 gap-2 p-3 text-white flex items-center rounded-lg px-10 mt-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-shopping-cart"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {isLoading?'Loading...':
              'Add to Cart'
}
            </button>
          </div>
         : 
        <SkeltonProjectinfo />
        }
      </div>
    
  );
}

export default ProjectInfo;
