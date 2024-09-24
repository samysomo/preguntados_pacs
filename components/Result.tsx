import { Answer } from "@/app/(root)/question/page";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ResultProps {
  right: boolean | undefined;
  setChosenAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
  isDecisive: boolean; // Asegúrate de que esta propiedad esté incluida
}

// Eliminar la función handleAnswer y manejar la lógica directamente en el onClick
export function Result({ right, setChosenAnswer, isDecisive }: ResultProps) {
  const handleAnswer = () => {
    if (right) {
      setChosenAnswer(null);
    }
  };

  return (
    <Card className="w-[350px] bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg mt-8">
      <CardHeader>
        <CardTitle>{right ? "Respuesta Correcta!" : "Respuesta Incorrecta"}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={right ? "/match" : "/"}>
          <Button variant="outline" onClick={handleAnswer}>
            Continuar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
