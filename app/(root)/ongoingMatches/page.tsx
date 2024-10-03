"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { GET_ONGOING_MATCHES, GET_PLAYER_BY_ID  } from '@/constants';
import { apiClient } from "@/lib/api-client";
import { useAppStore } from '@/store';

interface Player {
  username: string; // Nombre de usuario del jugador
}

interface Match {
  _id: string; // Identificador único de la partida
  players: {player1: Player; player2: Player };
  currentTurn: string; // ID del jugador que tiene el turno actual
  theme: string; // Tema de la pregunta actual
  questionsAnswered: Array<{ questionId: string; isCorrect: boolean }>; // Array de preguntas contestadas con el estado de cada respuesta
  correctAnswersStreak: { player1: number; player2: number }; // Racha de respuestas correctas de los jugadores
  completedThemes: {
    player1: string[]; // Array de temas completados por el jugador 1
    player2: string[]; // Array de temas completados por el jugador 2
  }; 
  status: 'in-progress' | 'terminated'; // Estado de la partida
  __v: number; // Versión del documento en MongoDB
}

const OngoingMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userInfo, setMatchId  } = useAppStore();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await apiClient.get(GET_ONGOING_MATCHES, { withCredentials: true });
        setMatches(response.data);
        setLoading(false);
      } catch (err:any) {
        console.error('Error fetching matches:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Cargando partidas...</p>;
  if (error) return <p>{error}</p>;

  const yourPlayerId = userInfo.id; // Cambia esto por la manera en que obtienes el ID del jugador actual.

  const yourTurn = matches.filter(match => match.currentTurn === yourPlayerId);
  const theirTurn = matches.filter(match => match.currentTurn !== yourPlayerId);

  const handlePlay = (matchId: string) => {
    setMatchId(matchId); // Actualiza el matchId en el store
  };
  
  return (
    <section className="flex items-center flex-col">
      <header className="relative flex justify-center p-5 bg-gradient-to-b from-[#12003b] to-[#38006b] w-full">
        <h2 className="text-white text-3xl font-bold">Partidas en curso</h2>
      </header>

      {/* Sección de tu turno */}
      <div className="w-full max-w-lg mx-auto mt-20 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
        <h3 className="text-lg font-bold text-center">Tu turno</h3>
        <div className="flex flex-col gap-2 mt-5">
          {yourTurn.length > 0 ? (
            yourTurn.map(match => (
              <div className="flex justify-between items-center" key={match._id}>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-gray-700">Tu</p>
                  <h3 className="text-lg">{match.players.player1.username}</h3>
                  <p>{match.completedThemes.player1.length}</p> {/* Tu puntaje */}
                </div>
                <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-gray-700">Vs</p>
                  <h3 className="text-lg">{match.players.player2.username}</h3>
                  <p>{match.completedThemes.player2.length}</p> {/* Puntaje del contrincante */}
                </div>
                <Link href={`/match`} className="w-1/2">
                  <Button
                    className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]"
                    onClick={() => handlePlay(match._id)} // Actualiza el matchId
                  >
                    Jugar
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No tienes partidas en tu turno.</p>
          )}
        </div>
      </div>

      {/* Sección de su turno */}
      <div className="w-full max-w-lg mx-auto mt-10 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
        <h3 className="text-lg font-bold text-center">Su turno</h3>
        <div className="flex flex-col gap-2 mt-5">
          {theirTurn.length > 0 ? (
            theirTurn.map(match => (
              <div className="flex justify-center items-center" key={match._id}>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-gray-700">Tu</p>
                  <h3 className="text-lg">{match.players.player1.username}</h3>
                  <p>{match.correctAnswersStreak.player1}</p> {/* Tu puntaje */}
                </div>
                <div className="flex flex-col items-center">
                <p className="text-xl font-bold text-gray-700">Vs</p>
                  <h3 className="text-lg">{match.players.player2.username}</h3>
                  <p>{match.correctAnswersStreak.player2}</p> {/* Puntaje del contrincante */}
                </div>
                <Link href={`/match`} className="w-1/2"></Link>
                <Button className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]" disabled>
                  Esperando...
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center">No hay partidas esperando tu turno.</p>
          )}
        </div>
      </div>

      {/* Sección de partidas terminadas 
      <div className="w-full max-w-lg mx-auto mt-10 mb-10 p-8 bg-gradient-to-b from-[#2a0052] to-[#7200c3] rounded-lg shadow-lg text-white">
        <h3 className="text-lg font-bold text-center">Partidas terminadas</h3>
        <div className="flex flex-col gap-2 mt-5">
          {terminatedMatches.length > 0 ? (
            terminatedMatches.map(match => (
              <div className="flex justify-center items-center" key={match._id}>
                <div className="footer_name">
                  <p className="text-xl font-bold text-gray-700">{match.players.player1.name}</p>
                </div>
                <div className="w-full flex flex-col items-center">
                  <h3>{match.players.player1.name}</h3>
                  <p>{match.correctAnswersStreak.player1 + match.correctAnswersStreak.player2}</p>
                </div>
                <Link href={`/match/${match._id}`} className="w-1/2">
                  <Button className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]">Revancha</Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No hay partidas terminadas.</p>
          )}
        </div>
      </div>
      */}
    </section>
  );
};

export default OngoingMatches;