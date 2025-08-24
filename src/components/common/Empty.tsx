import Image from 'next/image'
import React from 'react'

const Empty = ({text}:{text?:string}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <Image src="/assets/nodata.png" width={400} height={350} alt=""/>
        <p className='font-medium text-muted'>{text || 'No Data Found!'}</p>
    </div>
  )
}

export default Empty