"use client";
import React from "react";
import { AddFriend } from "@/components/AddFriend";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddFriendPage = () => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(true); // Inicia el modal abierto

  const closeModal = () => {
    setOpenModal(false);
    router.push("/"); // Redirige a la página principal o a donde desees
  };

  return (
    <section className="flex-center size-full">
      {openModal && (
        <div className="modal-backdrop fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="modal-container">
            <AddFriend closeModal={closeModal} />
          </div>
        </div>
      )}
    </section>
  );
};

export default AddFriendPage;
