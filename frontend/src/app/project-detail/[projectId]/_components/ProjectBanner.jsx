import Image from 'next/image'
import React from 'react'

function ProjectBanner({productDetail}) {
  return (
    <div className=''>
      {productDetail?
      <Image src={productDetail.image} alt='image' width={400} height={200} className='rounded-lg object-cover' />
    :
    <div className='h-[400px] animate-pulse rounded-sm w-[400px] bg-slate-200'>
    </div>
    
}
    </div>
  )
}

export default ProjectBanner