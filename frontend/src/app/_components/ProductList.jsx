import React from 'react'
import ProductItem from './ProductItem'
import Link from 'next/link'

function ProductList({ productList }) {
    console.log(productList)
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4'>
        {productList.map((item,index)=>(
          <Link href={`/project-detail/${item.id}`} >
            <div key={index}>
              <ProductItem product={item} />
            </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductList