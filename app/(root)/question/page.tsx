"use client";

import { Result } from '@/components/Result';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store'; // Asegúrate de importar tu store
import { apiClient } from '@/lib/api-client';
import { GET_NEXT_QUESTION_ROUTE, SUBMIT_ANSWER_ROUTE } from '@/constants';

export interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    questionText: string;
    options: Answer[];
    _id: string;
}

const QuestionComponent = () => {
    const router = useRouter();
    const { category, matchId, setQuestionData } = useAppStore((state) => ({
        category: state.category, // Obtener la categoría desde el store
        matchId: state.matchId,   // Asumiendo que tienes el matchId en tu estado global
        setQuestionData: state.setQuestionData, // Método para establecer la pregunta
    }));

    const [chosenAnswer, setChosenAnswer] = useState<Answer | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDecisive, setIsDecisive] = useState<boolean>(false); 

    useEffect(() => {
        const fetchNextQuestion = async () => {
            if (matchId) {
                setLoading(true);
                setError(null);

                // Verificar si la categoría es 'corona'
                if (category === 'corona') {
                    // Manejar el caso especial si la categoría es 'corona'
                    setIsDecisive(true); // Saltar a la pregunta decisiva
                    //setLoading(false);    // Finalizar la carga
                }

                try {
                    const response = await apiClient.post(
                        `${GET_NEXT_QUESTION_ROUTE}${matchId}/next-question`,
                        { selectedTheme: category }, 
                        { withCredentials: true }
                    );

                    if (response.data) {
                        setQuestion(response.data.question);
                        setIsDecisive(response.data.decisive || false); 
                        setQuestionData(response.data);
                    } else {
                        setError('No question data found');
                    }
                } catch (err: any) {
                    setError(err.message || 'Error fetching question data');
                } finally {
                    setLoading(false);
                }
            }
        };

        if (category) {
            fetchNextQuestion();
        } else {
            setLoading(false);
        }
    }, [category, matchId, setQuestionData]);

    const handleSelectAnswer = async (answer: Answer) => {
        setChosenAnswer(answer);
        // Aquí envías la respuesta al backend
        try {
            await apiClient.post(
                SUBMIT_ANSWER_ROUTE + matchId + '/answer',
                {
                    matchId,
                    questionId: question?._id,
                    isCorrect: answer.isCorrect,
                    isDecisive, 
                },
                { withCredentials: true }
            );
        } catch (error) {
            console.error('Error submitting answer', error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!question && !isDecisive) {
        console.warn('No se encontró ninguna pregunta');
        return <p>No question found</p>;
    }

    return (
        <section className='flex items-center flex-col'>
            <header className='flex p-5 justify-center relative bg-gradient-to-b from-[#12003b] to-[#38006b] w-full'>
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
                <h2 className='text-white text-3xl font-bold'>Pruebas Orientadas a Objetos</h2>
            </header>
            <div className="w-full max-w-md mx-auto mt-28 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
                <h3 className='text-lg font-bold'>{question?.questionText}</h3> 
                {!chosenAnswer ? (
                    <div className='flex flex-col gap-5 mt-8'>
                        {question?.options.map((answer) => (
                            <Button
                                key={answer.text}
                                className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                                onClick={() => handleSelectAnswer(answer)}
                            >
                                {answer.text}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Result
                        right={chosenAnswer?.isCorrect}
                        setChosenAnswer={setChosenAnswer}
                        isDecisive={isDecisive} 
                    />
                )}
            </div>
        </section>
    );
};

export default QuestionComponent;
