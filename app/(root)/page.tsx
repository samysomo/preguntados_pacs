"use client";
import { AddFriend } from "@/components/AddFriend";
import { CreateMatch } from "@/components/CreateMatch";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { GET_USER_INFO } from "@/constants";
import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  interface Friend {
    _id: string;
    username: string;
  }

  const router = useRouter();
  const [loading, setLoading] = useState(true); // Comienza como true
  const { userInfo, setUserInfo } = useAppStore();
  const [openAFModal, setOpenAFModal] = useState(false);
  const [openCMModal, setOpenCMModal] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

  // Función para obtener datos del usuario
  const getUserData = async () => {
    try {
      const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
      console.log("Response from GET_USER_INFO:", response.data);

      if (response.status === 200) {
        if (response.data.user && response.data.user.id) {
          setUserInfo(response.data.user);
          setFriends(response.data.user.friends || []);
        } else {
          console.warn("User data does not contain an ID:", response.data.user);
          setUserInfo(undefined);
        }
      } else {
        console.error("Unexpected response status:", response.status);
        setUserInfo(undefined);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserInfo(undefined);
    } finally {
      setLoading(false); // Finaliza la carga aquí
    }
  };

  useEffect(() => {
    // Verifica la existencia del token en las cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));

    // Si el token está presente y no hay userInfo, llama a getUserData
    if (token) {
      getUserData();
    } else {
      setLoading(false); // Si no hay token, no es necesario cargar de nuevo
    }
  }, [setUserInfo]);

  // Use a separate useEffect for redirección
  useEffect(() => {
    if (loading) return; // Evitar redirección mientras se está cargando

    if (!userInfo) {
      console.log("Redirecting to sign-in page."); // Log de redirección
      router.push("/sign-in");
    }
  }, [loading, userInfo, router]);

  const handleAddFriend = () => {
    setOpenAFModal(true);
  };

  const handleCreateMatch = () => {
    setOpenCMModal(true);
  };

  const closeAFModal = () => {
    setOpenAFModal(false);
  };

  const closeCMModal = () => {
    setOpenCMModal(false);
  };

  return (
    <section className="relative flex min-h-screen w-full text-white">
      {/* Sidebar - Menu */}
      <div className="w-1/4 min-h-screen p-8 bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg flex flex-col justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-4xl lg:text-3xl font-bold mb-10 tracking-wide text-[#ff77e9]">
            <span className="max-lg:hidden mr-1">Preguntados - </span>PACS
          </h1>
          <Button onClick={handleCreateMatch} className="mb-6 w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
            Crear <span className="max-lg:hidden ml-1">Partida</span>
          </Button>
          <Button onClick={handleAddFriend} className="w-full mb-6 text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
            Añadir <span className="max-lg:hidden ml-1">Amigo</span>
          </Button>
          <Link href="/ongoingMatches" className="w-full mb-6">
            <Button className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
              Partidas <span className="max-lg:hidden ml-1">en Curso</span>
            </Button>
          </Link>
        </div>
        <Footer user={userInfo} setUserInfo={setUserInfo} className="mt-auto" />
      </div>

      <div className="flex-1 flex justify-center items-start p-10">
        <div className="w-full max-w-2xl bg-[#240055] p-6 rounded-lg shadow-md">
          <h2 className="text-3xl mb-4">Amigos Conectados</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#ff77e9]">
                <th className="p-2">Nombre</th>
                <th className="p-2">ID</th>
              </tr>
            </thead>
            <tbody>
              {friends.length > 0 ? (
                friends.map((friend, index) => (
                  <tr key={index}>
                    <td className="p-2 text-[#ff77e9]">{friend.username}</td>
                    <td className="p-2 text-[#ff77e9]">{friend._id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2 text-[#ff77e9]">-</td>
                </tr>
              )}
            </tbody>
          </table>

          {openAFModal && (
            <div className="modal-backdrop fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="modal-container">
                <AddFriend closeModal={closeAFModal} />
              </div>
            </div>
          )}
          {openCMModal && (
            <div className="modal-backdrop fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <div className="modal-container">
                <CreateMatch closeModal={closeCMModal} friends={friends} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
