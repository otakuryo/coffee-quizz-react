import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VerRespuestasDialog } from "./VerRespuestasDialog"
import { CrearRespuestaDialog } from "./CrearRespuestaDialog"
import { useUsers } from "@/contexts/UserContext"
import { EllipsisVerticalIcon } from "lucide-react"

export default function VerPreguntaCard({usuarios, pregunta}) {

  let { users } = useUsers();

  let userNombre = "None";

  if(pregunta.usuarioId) {

    let tmpUser = users.find(user => user.id == pregunta.usuarioId );
    if(tmpUser) {
      userNombre = tmpUser.nombre;
    }

  };

  const handleVisible = () => {
    pregunta.visible = !pregunta.visible;
  }

  return (
    <Card className={`relative max-w-[600px] ${pregunta.visible ? 'block' : 'hidden'}`}>
      
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-2 right-2">
          <Button variant="outline" className="cursor-pointer">
            <EllipsisVerticalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Ocultar</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Eliminar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <CardHeader>
        <CardTitle className="me-5 md:me-8"><span className="opacity-50">🤔</span> {pregunta.contenido}</CardTitle>
        <CardDescription>Autor: {userNombre}</CardDescription>
      </CardHeader>
      <CardContent className="hidden">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5"></div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="cursor-pointer" variant="outline" onClick={handleVisible}>Ocultar</Button>
        <CrearRespuestaDialog btnTitle="Responder" usuarios={usuarios} preguntaId={pregunta.id} />
        <VerRespuestasDialog 
          btnTitle="Ver Respuestas" 
          preguntaId={pregunta.id}
        />
        </CardFooter>
    </Card>
  )
}
