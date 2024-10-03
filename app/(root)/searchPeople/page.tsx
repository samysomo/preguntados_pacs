import PlayersTable from '@/components/PlayersTable';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SearchPeople = () => {
    const testUsers = [
        {
          _id: "1",
          username: "JohnDoe",
          email: "john.doe@example.com"
        },
        {
          _id: "2",
          username: "JaneSmith",
          email: "jane.smith@example.com"
        },
        {
          _id: "3",
          username: "MikeJones",
          email: "mike.jones@example.com"
        }
      ];


  return (
    <section className="flex items-center flex-col">
      <header className="relative flex justify-center p-5 bg-gradient-to-b from-[#12003b] to-[#38006b] w-full">
        <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
            <Link href={"/"}>
                <Image
                    src="/icons/arrow-left.svg"
                    alt='Profile image'
                    width={40}
                    height={40}
                />
            </Link>
        </div>
        <h2 className="text-white text-3xl font-bold">Buscar Personas</h2>
      </header>
        <div className='flex justify-center items-center w-[700px] mt-32'>
            <PlayersTable
                users={testUsers}
            />
        </div>
        
      

    </section>
  )
}

export default SearchPeople