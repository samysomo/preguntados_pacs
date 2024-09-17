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

interface AddFriendProps {
  closeModal: () => void;
}

export function AddFriend({ closeModal }: AddFriendProps) {
  return (
    <Card className="w-[350px] bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg">
      <CardHeader>
        <CardTitle>Añadir Amigo</CardTitle>
        <CardDescription>Escribe el id de tu amigo para añadirlo.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Id</Label>
              <Input id="name" placeholder="Id de tu amigo" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={closeModal}>
          Cancelar
        </Button>
        <Button>Añadir</Button>
      </CardFooter>
    </Card>
  );
}
