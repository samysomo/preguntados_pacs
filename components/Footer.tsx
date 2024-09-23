import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({user, setUserInfo}: any) => {
    const router = useRouter()
    const handleLogOut = () => {
        setUserInfo(undefined)
        router.push("/sign-in")
    }

  return (
    <footer className='footer'>
        <div className={"footer_name"}>
            <p className='text-xl font-bold text-gray-700'>
                {user?.username[0]}
            </p>
        </div>
        <div className={"footer_email"}>
            <h1 className='text-14 truncate text-[#ff77e9] font-semibold'>
                {user?.username}
            </h1>
            <p className='text-14 truncate font-normal text-white'>
                {user?.email}
            </p>
        </div>
        <div className='footer_image' onClick={handleLogOut}>
            <Image
                src="icons/logout.svg"
                alt='Profile image'
                fill
            />
        </div>
    </footer>
  )
}

export default Footer