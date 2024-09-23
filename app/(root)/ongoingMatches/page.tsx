
import { Result } from '@/components/Result';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'


const ongoingMatches = () => {

  const matches = [
    { 
      id: 1,
      friend_name: "Santino",
      score: "1 - 0",
      turn: "yours",
      status: "ongoing"
    },
    {
      id: 2,
      friend_name: "Fernando",
      score: "4 - 1",
      turn: "theirs",
      status: "ongoing"
    },
    {
      id: 3,
      friend_name: "Napoleon",
      score: "1 - 2",
      turn: "yours",
      status: "ongoing"
    },
    {
      id: 4,
      friend_name: "Pablo",
      score: "1 - 3",
      turn: "theirs",
      status: "ongoing"
    },
    {
      id: 5,
      friend_name: "Diego",
      score: "6 - 0",
      turn: "yours",
      status: "terminated"
    },
    {
      id: 6,
      friend_name: "Santino",
      score: "6 - 3",
      turn: "yours",
      status: "terminated"
    }
  ]

  const yourTurn = matches.filter(match => match.turn === "yours" && match.status === "ongoing")

  const theirTurn = matches.filter(match => match.turn === "theirs" && match.status === "ongoing")

  const terminatedMatches = matches.filter(match => match.status === "terminated")

  return (
    <section className='flex items-center flex-col'>
        <header className='relative flex justify-center p-5 bg-gradient-to-b from-[#12003b] to-[#38006b] w-full'>
          <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
            <Link href={"/"}>
              <Image
                src="icons/arrow-left.svg"
                alt='Profile image'
                width={40}
                height={40}
              />
            </Link>
          </div>
            <h2 className='text-white text-3xl font-bold'>Partidas en curso</h2>
        </header>
        <div className="w-full max-w-lg mx-auto mt-20 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
            <h3 className='text-lg font-bold text-center'>Tu turno</h3>
            <div className=' flex flex-col gap-2 mt-5'>
              {yourTurn.map((match) => (
                <div className='flex justify-center items-center' key={match.id}>
                  <div className="footer_name">
                    <p className='text-xl font-bold text-gray-700'>
                        {match.friend_name[0]}
                    </p>
                  </div>
                  <div className='w-full flex flex-col items-center'>
                    <h3>{match.friend_name}</h3>
                    <p>{match.score}</p>
                  </div>
                  <Link href={"/match"} className='w-1/2'>
                    <Button 
                      className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                    >
                        Jugar
                    </Button>
                  </Link>
                  
                </div>
              ))}
            </div>
        </div>
        <div className="w-full max-w-lg mx-auto mt-10 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
            <h3 className='text-lg font-bold text-center'>Su turno</h3>
            <div className=' flex flex-col gap-2 mt-5'>
              {theirTurn.map((match) => (
                <div className='flex justify-center items-center' key={match.id}>
                  <div className="footer_name">
                    <p className='text-xl font-bold text-gray-700'>
                        {match.friend_name[0]}
                    </p>
                  </div>
                  <div className='w-full flex flex-col items-center'>
                    <h3>{match.friend_name}</h3>
                    <p>{match.score}</p>
                  </div>
                  <Link href={"/match"} className='w-1/2'>
                    <Button 
                      className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                      disabled
                    >
                        Esperando...
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
        </div>
        <div className="w-full max-w-lg mx-auto mt-10 mb-10 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
            <h3 className='text-lg font-bold text-center'>Partidas terminadas</h3>
            <div className=' flex flex-col gap-2 mt-5'>
              {terminatedMatches.map((match) => (
                <div className='flex justify-center items-center' key={match.id}>
                  <div className="footer_name">
                    <p className='text-xl font-bold text-gray-700'>
                        {match.friend_name[0]}
                    </p>
                  </div>
                  <div className='w-full flex flex-col items-center'>
                    <h3>{match.friend_name}</h3>
                    <p>{match.score}</p>
                  </div>
                  <Link href={"/match"} className='w-1/2'>
                    <Button 
                      className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                    >
                        Revancha
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
        </div>
    </section>
  )
}

export default ongoingMatches