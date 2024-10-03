"use client";

import PlayersTable from '@/components/PlayersTable';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api-client';
import { GET_USERS } from '@/constants';

interface User {
  _id: string;
  username: string;
  email: string;
}

const SearchPeople = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Para manejar el estado de carga
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(GET_USERS, { withCredentials: true });
    
        if (response.status === 200 && Array.isArray(response.data.users)) {
          setUsers(response.data.users);  // Acceder a response.data.users
          setLoading(false); // Cambiar el estado de carga a false
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchData();
  }, []);
  

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
        {loading ? (
          <p className="text-white">Cargando usuarios...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <PlayersTable users={users} />
        )}
      </div>
    </section>
  );
};

export default SearchPeople;
