"use client";

import Roulette from '@/components/Roulette';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useAppStore } from '@/store'; // Importa el store de Zustand
import { apiClient } from '@/lib/api-client';
import { GET_MATCH_ROUTE } from '@/constants';

const Match = () => {
    // Usamos el store de Zustand al principio del componente
    const { matchId, matchData, setMatchData } = useAppStore((state) => ({
        matchId: state.matchId,
        matchData: state.matchData,
        setMatchData: state.setMatchData,
    }));
    
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    
    useEffect(() => {
        const fetchMatchData = async () => {
            if (matchId) {
                setLoading(true);
                try {
                    const response = await apiClient.get(GET_MATCH_ROUTE + matchId, {
                        withCredentials: true,
                    });
                    
                    if (response.data) {
                        setMatchData(response.data); // Solo actualiza si hay datos
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
                {matchData.players.map((player: any, index: number) => (
                    <div
                        key={player._id}
                        className={`flex mt-10 p-5 bg-gradient-to-b from-[#12003b] to-[#38006b] w-full ${index % 2 === 0 ? 'rounded-r-2xl justify-end' : 'rounded-l-2xl justify-start'}`}
                    >
                        {index % 2 === 0 ? (
                            <>
                                <div className='flex flex-col mr-3'>
                                    <h1 className='text-white'>{player.username}</h1>
                                    <p className='text-pink-500'>{player.email}</p>
                                </div>
                                <div className="footer_name">
                                    <p className='text-xl font-bold text-gray-700'>
                                        {player.username.charAt(0).toUpperCase()} {/* Inicial del jugador */}
                                    </p>
                                </div>
                                <div className="flex size-10 ml-28 items-center justify-center rounded-md bg-gray-200">
                                    <p className='text-xl font-bold text-gray-700'>
                                        {index + 1} {/* Número del jugador */}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex size-10 mr-28 items-center justify-center rounded-md bg-gray-200">
                                    <p className='text-xl font-bold text-gray-700'>
                                        {index + 1} {/* Número del jugador */}
                                    </p>
                                </div>
                                <div className="footer_name">
                                    <p className='text-xl font-bold text-gray-700'>
                                        {player.username.charAt(0).toUpperCase()} {/* Inicial del jugador */}
                                    </p>
                                </div>
                                <div className='flex flex-col ml-3'>
                                    <h1 className='text-white'>{player.username}</h1>
                                    <p className='text-pink-500'>{player.email}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}

            </header>
            <Roulette />
        </section>
    );
};

export default Match;
