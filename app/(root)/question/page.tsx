"use client";

import { Result } from '@/components/Result';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store'; // Asegúrate de importar tu store
import { apiClient } from '@/lib/api-client';
import { GET_NEXT_QUESTION_ROUTE } from '@/constants';

// Define el tipo de las opciones de respuesta
export interface Answer {
    text: string;
    isCorrect: boolean;
}

// Define el tipo de la pregunta
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

    const [chosenAnswer, setChosenAnswer] = useState<Answer | null>(null); // Define el tipo de chosenAnswer como Answer o null
    const [question, setQuestion] = useState<Question | null>(null); // Cambiar null al tipo Question
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState<string | null>(null);
    const [isDecisive, setIsDecisive] = useState<boolean>(false); 

    useEffect(() => {
        const fetchNextQuestion = async () => {
            
            if (matchId) {
                setLoading(true);
                setError(null); // Resetea el error antes de la solicitud

                try {
                    const response = await apiClient.post(
                        `${GET_NEXT_QUESTION_ROUTE}${matchId}/next-question`,
                        { selectedTheme: category }, // Enviar el selectedTheme en el cuerpo
                        { withCredentials: true } // Incluye las credenciales
                    );

                    if (response.data) {
                        setQuestion(response.data.question); // Solo actualiza si hay datos
                        setIsDecisive(response.data.decisive || false); // Verificar si la pregunta es decisiva
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

        if (category) { // Llamar a la API solo si hay una categoría
            fetchNextQuestion();
        } else {
            setLoading(false);
        }
    }, [category, matchId, setQuestionData]); // Dependencias para ejecutar el efecto

    const handleSelectAnswer = async (answer: Answer) => {
        setChosenAnswer(answer);
        // Aquí envías la respuesta al backend
        try {
            await apiClient.post(
                '/api/matches/submit-answer',
                {
                    matchId,
                    questionId: question?._id,
                    isCorrect: answer.isCorrect,
                    isDecisive, // Indica si es decisiva
                },
                { withCredentials: true }
            );
            // Maneja la respuesta del servidor según sea necesario
        } catch (error) {
            console.error('Error submitting answer', error);
        }
    };

    if (loading) {
        return <p>Cargando...</p>; // Muestra un mensaje de carga
    }

    if (error) {
        return <p>Error: {error}</p>; // Muestra un mensaje de error
    }

    if (!question) {
        console.warn('No se encontró ninguna pregunta');
        return <p>No question found</p>; // Maneja el caso donde no hay pregunta
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
                <h3 className='text-lg font-bold'>{question.questionText}</h3> {/* Muestra la pregunta */}
                {!chosenAnswer ? (
                    <div className='flex flex-col gap-5 mt-8'>
                        {question.options.map((answer) => (
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
                        isDecisive={isDecisive} // Pasar si es decisiva
                    />
                )}
            </div>
        </section>
    );
};

export default QuestionComponent;
