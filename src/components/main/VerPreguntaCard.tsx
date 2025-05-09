import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VerRespuestasDialog } from "./VerRespuestasDialog"
import { CrearRespuestaDialog } from "./CrearRespuestaDialog"
import { useUsers } from "@/contexts/UserContext"

export default function VerPreguntaCard({usuarios, pregunta}) {

  let { users } = useUsers();

  let userNombre = "None";

  if(pregunta.usuarioId) {

    let tmpUser = users.find(user => user.id == pregunta.usuarioId );
    if(tmpUser) {
      userNombre = tmpUser.nombre;
    }

  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>{pregunta.contenido}</CardTitle>
        <CardDescription>Autor: {userNombre}</CardDescription>
      </CardHeader>
      <CardContent className="hidden">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="cursor-pointer" variant="outline">Ocultar</Button>
        <CrearRespuestaDialog btnTitle="Responder" usuarios={usuarios} />
        <VerRespuestasDialog 
          btnTitle="Ver Respuestas" 
          preguntaId={pregunta.id}
        />
        </CardFooter>
    </Card>
  )
}
