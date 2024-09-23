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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation";

interface CreateMatchProps {
  closeModal: () => void;
}

export function CreateMatch({ closeModal }: CreateMatchProps) {
  const router = useRouter();

  const handleCreateMatch = () => {
    router.push("/match")
  }

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
              <Select>
                <SelectTrigger id="friend">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Patryck</SelectItem>
                  <SelectItem value="sveltekit">Diego</SelectItem>
                  <SelectItem value="astro">Lud</SelectItem>
                  <SelectItem value="nuxt">Pablo</SelectItem>
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
