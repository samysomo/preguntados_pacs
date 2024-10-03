"use client";

import Roulette from '@/components/Roulette';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/store';
import { apiClient } from '@/lib/api-client';
import { GET_MATCH_ROUTE, CHECK_IF_DECISIVE_ROUTE } from '@/constants';
import SelectedCategoryModal from '@/components/SelectCategoryModal';
import { useRouter } from "next/navigation";

const Match = () => {

    const router = useRouter();

    const { matchId, matchData, setMatchData, category } = useAppStore((state) => ({
      matchId: state.matchId,
      matchData: state.matchData,
      setMatchData: state.setMatchData,
      category: state.category,
    }));
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectCategoryModal, setSelectCategoryModal] = useState(false);


    useEffect(() => {
        const fetchMatchData = async () => {
            if (matchId) {
                setLoading(true);
                try {
                    const response = await apiClient.get(GET_MATCH_ROUTE + matchId, {
                        withCredentials: true,
                    });

                    if (response.data) {
                        setMatchData(response.data);

                        if (response.data.status === 'completed') {
                            alert('¡Ganaste!');
                            router.push("/");
                        }
                        
                        // Verificar si la próxima pregunta es decisiva
                        const decisiveResponse = await apiClient.get(CHECK_IF_DECISIVE_ROUTE + matchId, {
                            withCredentials: true,
                        });

                        if (decisiveResponse.data.nextDecisive) {
                            setSelectCategoryModal(true); // Abrir el modal de selección de categoría
                        }
                    } else {
                        setError('No match data found');
                    }
                } catch (err: any) {
                    setError(err.message || 'Error fetching match data');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchMatchData();
    }, [matchId, setMatchData]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!matchData) {
        return <p>No match found</p>;
    }

    return (
        <section className='flex items-center min-h-screen flex-col'>
            <header className='flex relative mb-32 w-full justify-center gap-20'>
                <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
                    <Link href="/">
                        <Image
                            src="/icons/arrow-left.svg"
                            alt='Back to home'
                            width={40}
                            height={40}
                            className='pt-10'
                        />
                    </Link>
                </div>
                {[matchData.players.player1, matchData.players.player2].map((player: any, index: number) => (
                    index % 2 === 0 ? (
                        <div
                            key={player._id}
                            className={`flex mt-10 p-5 justify-end bg-gradient-to-b from-[#12003b] to-[#38006b] w-full ${index % 2 === 0 ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}
                        >
                            <div className='flex flex-col mr-3'>
                                <h1 className='text-white text-end'>{player.username}</h1>
                                <p className='text-pink-500'>{player.email}</p>
                            </div>
                            <div className="footer_name">
                                <p className='text-xl font-bold text-gray-700'>
                                    {player.username.charAt(0).toUpperCase()}
                                </p>
                            </div>
                            <div className="flex size-10 ml-28 items-center justify-center rounded-md bg-gray-200">
                                <p className='text-xl font-bold text-gray-700'>
                                    {index + 1}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div
                            key={player._id}
                            className={`flex mt-10 p-5 justify-start bg-gradient-to-b from-[#12003b] to-[#38006b] w-full ${index % 2 === 0 ? 'rounded-r-2xl' : 'rounded-l-2xl'}`}
                        >
                            <div className="flex size-10 mr-28 items-center justify-center rounded-md bg-gray-200">
                                <p className='text-xl font-bold text-gray-700'>
                                    {index + 1}
                                </p>
                            </div>
                            <div className="footer_name mr-3">
                                <p className='text-xl font-bold text-gray-700'>
                                    {player.username.charAt(0).toUpperCase()}
                                </p>
                            </div>
                            <div className='flex flex-col'>
                                <h1 className='text-white'>{player.username}</h1>
                                <p className='text-pink-500'>{player.email}</p>
                            </div>
                        </div>
                    )
                ))}
            </header>
            {!selectCategoryModal && (
                <Roulette />
            )}
            <SelectedCategoryModal
                isOpen={selectCategoryModal}
                setSelectCategoryModal={setSelectCategoryModal}
            />
        </section>
    );
};

export default Match;
