import Roulette from '@/components/Roulette'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Match = () => {
  return (
    <section className='flex items-center min-h-screen flex-col'>
      <header className='flex relative mb-32 w-full justify-center gap-20'>
        <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
          <Link href={"/"}>
              <Image
                  src="icons/arrow-left.svg"
                  alt='Profile image'
                  width={40}
                  height={40}
                  className='pt-10'
              />
          </Link>
        </div>
        <div className='flex mt-10 p-5 justify-end bg-gradient-to-b from-[#12003b] to-[#38006b] w-full rounded-r-2xl'>
          <div className='flex flex-col mr-3'>
            <h1 className='text-white'>Samuel</h1>
            <p className='text-pink-500'>samy@correo.com</p>
          </div>
          <div className="footer_name">
            <p className='text-xl font-bold text-gray-700'>
                S
            </p>
          </div>
          <div className="flex size-10 ml-28 items-center justify-center rounded-md bg-gray-200">
            <p className='text-xl font-bold text-gray-700'>
                1
            </p>
          </div>
        </div>
        <div className='flex mt-10 p-5 bg-gradient-to-b from-[#12003b] to-[#38006b] w-full rounded-l-2xl'>
          <div className="flex size-10 mr-28 items-center justify-center rounded-md bg-gray-200">
            <p className='text-xl font-bold text-gray-700'>
                2
            </p>
          </div>
          <div className="footer_name">
            <p className='text-xl font-bold text-gray-700'>
                N
            </p>
          </div>
          <div className='flex flex-col ml-3'>
            <h1 className='text-white'>Napoleon</h1>
            <p className='text-pink-500'>napo@correo.com</p>
          </div>
        </div>
      </header>
      <Roulette/>
    </section>
  )
}

export default Match 