import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { VerRespuestasDialog } from "./VerRespuestasDialog"
import SelectInputUsuarios from "./SelectInputUsuarios"
import { CrearRespuestaDialog } from "./CrearRespuestaDialog"

export default function VerPreguntaCard({usuarios, pregunta}) {
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{pregunta.texto}</CardTitle>
        <CardDescription>Autor: {pregunta.creador}</CardDescription>
      </CardHeader>
      <CardContent className="hidden">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="cursor-pointer" variant="outline">Ocultar</Button>
        <CrearRespuestaDialog btnTitle="Responder" usuarios={usuarios} />
        <VerRespuestasDialog btnTitle={`Ver Respuestas (${pregunta.respuestas.length})`} respuestas={pregunta.respuestas} />
        </CardFooter>
    </Card>
  )
}
