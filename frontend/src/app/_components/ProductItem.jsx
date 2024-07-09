import Image from 'next/image'
import React from 'react'

function ProductItem({product}) {
  return (
   <div className='cursor-pointer'>
     <div>
        <Image className='rounded-t-lg object-cover h-[230px]' src={product.image} width={400} height={300} alt='image' />
    </div>
    <div className='p-2'>
        <h2 className='text-sm font-medium line-clamp-2'>{product.name}</h2>
        <h2 className='text-sm font-medium text-gray-400'>{product.category}</h2>
        <h2 className='text-lg font-bold mt-2'>${product.price}</h2>
    </div>
   </div>
  )
}

export default ProductItem