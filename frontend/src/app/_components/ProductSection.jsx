'use client'
import React, { useEffect, useState } from 'react'
import ProductList from './ProductList'
import axios from '../_utils/GlobalApi';

function ProductSection() {
    const [productList,setProductList] = useState([]);
    const getLatestProducts = ()=>{
      try{
        const data = axios.get('productShow.php').then((res=>{
            setProductList(res.data);
            console.log(res.data)
        }))
      }catch(error){
        console.log(error);
      }
    }
    useEffect(()=>{
        getLatestProducts();
    },[])

  return productList &&(
    <div  className='px-10 md:px-20 py-6'>
        <h2 className='text-2xl my-8 font-bold'>Brand New</h2>
    <ProductList productList={productList} />
    </div>
  )
}

export default ProductSection