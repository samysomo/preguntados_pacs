"use client"
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userInfo, setUserInfo } = useAppStore();
  const [openAFModal, setOpenAFModal] = useState(false);
  const [openCMModal, setOpenCMModal] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
        console.log({ response });
      } catch (error) {
        console.log(error);
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    if (!userInfo) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, [userInfo, setUserInfo]);

  if (!userInfo) router.push("/sign-in");

  const handleAddFriend = () => {
    setOpenAFModal(true);
  };

  const handleCrateMatch = () => {
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
          <h1 className="text-3xl lg:text-5xl font-bold mb-10 tracking-wide text-[#ff77e9]">
            Preguntados - PACS
          </h1>
          <Button onClick={handleCrateMatch} className="mb-6 w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
            Crear Partida
          </Button>
          <Button onClick={handleAddFriend} className="w-full mb-6 text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
            Añadir Amigo
          </Button>
          <Link href="/ongoingMatches" className="w-full mb-6">
            <Button className="w-full text-lg bg-[#fc466b] hover:bg-[#ff77e9]">
            Partidas en curso
            </Button>
          </Link>
        </div>
        <Footer user={userInfo} setUserInfo={setUserInfo} className="mt-auto" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex justify-center items-start p-10">
        <div className="w-full max-w-2xl bg-[#240055] p-6 rounded-lg shadow-md">
          <h2 className="text-3xl mb-4">Amigos Conectados</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#ff77e9]">
                <th className="p-2">Nombre</th>
                <th className="p-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 text-[#ff77e9]">-</td>
                <td className="p-2 text-[#ff77e9]">-</td>
              </tr>
            </tbody>
          </table>

          {/* Modal logic */}
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
                <CreateMatch closeModal={closeCMModal} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
