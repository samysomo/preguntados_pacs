import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { ADD_FRIEND_ROUTE } from "@/constants";

interface AddFriendProps {
  closeModal: () => void;
}

export function AddFriend({ closeModal }: AddFriendProps) {
  const [friendId, setFriendId] = useState("");

  const handleAddFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Botón Añadir presionado");
    console.log("ID del amigo:", friendId); // Log del ID del amigo

    try {
      const response = await apiClient.post(ADD_FRIEND_ROUTE, { friendId }, { withCredentials: true });
      console.log("Respuesta de la API:", response); // Log de la respuesta
      if (response.status === 200) {
        alert("Amigo agregado exitosamente");
        closeModal(); // Cierra el modal solo si se agrega exitosamente
      }
    } catch (error) {
      console.error("Error al agregar amigo:", error);
      alert("Error al agregar amigo");
    }
  };

  return (
    <Card className="w-[350px] bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg">
      <CardHeader>
        <CardTitle>Añadir Amigo</CardTitle>
        <CardDescription>Escribe el id de tu amigo para añadirlo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddFriend}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="friendId">Id</Label>
              <Input
                id="friendId"
                placeholder="Id de tu amigo"
                value={friendId}
                style={{ color: "black" }}
                onChange={(e) => setFriendId(e.target.value)}
              />
            </div>
          </div>
          <CardFooter className="flex justify-around mt-10">
            <Button variant="outline" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit">Añadir</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
