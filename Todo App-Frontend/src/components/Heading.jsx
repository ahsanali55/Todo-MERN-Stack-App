import React from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { TbAlignBoxRightMiddle } from "react-icons/tb";

const Heading = () => {
  return (
    <section className='w-full py-4 bg-white max-w-[400px] mx-auto'>
        <div className='bg-white flex justify-between items-center'>
            <h1 className='bg-whiten text-[1.7rem] font-bold bg-inherit text-[#464646] '>Groceries</h1>
            <div className='flex bg-inherit items-center gap-x-8'>

            <TbAlignBoxRightMiddle className='bg-inherit text-[18px] text-gray-300' />
            <HiDotsHorizontal className='bg-inherit text-[20px] text-gray-300' />
            </div>
        </div>
      
    </section>
  )
}

export default Heading
