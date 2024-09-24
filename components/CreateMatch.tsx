import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiClient } from '@/lib/api-client';
import { CREATE_MATCH_ROUTE } from '@/constants';
import { useAppStore } from '@/store'; // Importa el store de Zustand

interface CreateMatchProps {
  closeModal: () => void;
  friends: { _id: string; username: string }[];
}

export function CreateMatch({ closeModal, friends }: CreateMatchProps) {
  const router = useRouter();
  const [selectedFriend, setSelectedFriend] = useState<string>("");

  const handleCreateMatch = async () => {
    if (selectedFriend) {
        const player2Id = selectedFriend;
        try {
            const response = await apiClient.post(
                CREATE_MATCH_ROUTE,
                { player2Id },
                { withCredentials: true }
            );

            if (response.data?.matchId) {
                // Establece el matchId en Zustand
                const { setMatchId } = useAppStore.getState();
                setMatchId(response.data.matchId); // Actualiza el estado

                // Ahora redirige a la página de match
                router.push('/match'); // Redirigir a la página de match
            } else {
                alert("No se pudo crear la partida.");
            }
        } catch (error: any) {
            alert("Error al crear la partida: " + (error.response?.data || error.message));
        }
    } else {
        alert("Por favor, selecciona un amigo.");
    }
};

  return (
    <Card className="w-[350px] bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg">
      <CardHeader>
        <CardTitle>Crear Partida</CardTitle>
        <CardDescription>Selecciona un amigo para jugar.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="friend">Amigos</Label>
              <Select onValueChange={setSelectedFriend} value={selectedFriend}>
                <SelectTrigger>
                  <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent position="popper">
                  {friends.map((friend, index) => (
                    <SelectItem key={index} value={friend._id}>
                      {friend.username}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={closeModal}>
          Cancelar
        </Button>
        <Button onClick={handleCreateMatch}>Crear Partida</Button>
      </CardFooter>
    </Card>
  );
}