"use client"
import { Result } from '@/components/Result';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'


export type Answer = {
    answer?: string;
    right?: boolean;
}

const Question = () => {
    const [chosenAnswer, setChosenAnswer] = useState<Answer | null>(null)
    const answers : Answer[] = [
        {
            answer: "Answer 1",
            right: false
        },
        {
            answer: "Answer 2",
            right: false
        },
        {
            answer: "Answer 3",
            right: true
        },
        {
            answer: "Answer 4",
            right: false
        },
    ]

    const handleSelectAnswer = (answer : Answer) => {
        setChosenAnswer(answer)
    }
  return (
    <section className='flex items-center flex-col'>
        <header className='flex p-5 justify-center relative bg-gradient-to-b from-[#12003b] to-[#38006b] w-full'>
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
            <h2 className='text-white text-3xl font-bold'>Pruebas Orientadas a objetos</h2>
        </header>
        <div className="w-full max-w-md mx-auto mt-28 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
            <h3 className='text-lg font-bold'>¿Qué son las pruebas orinetadas a objetos?</h3>
            {!chosenAnswer? (
                <div className='flex flex-col gap-5 mt-8'>
                {answers.map((answer) => (
                    <Button 
                        key={answer.answer} 
                        className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                        onClick={() => handleSelectAnswer(answer)}
                    >
                        {answer.answer}
                    </Button>
                ))}
                </div>
            ) :
                <Result 
                    right={chosenAnswer?.right}
                    setChosenAnswer={setChosenAnswer}
                />
            
            }
            
            
        </div>
    </section>
  )
}

export default Question