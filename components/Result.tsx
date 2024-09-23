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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface ResultProps {
  right: boolean | undefined;
  setChosenAnswer: React.Dispatch<React.SetStateAction<Answer | null>>;
}

const handleAnswer = ({setChosenAnswer, right} : ResultProps) => {
    if(right){
        setChosenAnswer(null)
    }
}

export function Result({ right, setChosenAnswer }: ResultProps) {
  return (
    <Card className="w-[350px] bg-gradient-to-b from-[#12003b] to-[#38006b] shadow-lg mt-8">
      <CardHeader>
        <CardTitle>{right ? "Respuesta Correcta!" : "Respuesta incorrecta"}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Link href={right ? "/match" : "/"}>
            <Button variant="outline" onClick={() => handleAnswer({setChosenAnswer, right})}>
                Continuar
            </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
