import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

export default function RespuestaItem({respuesta}) {

  let currentName = `answer-${respuesta.id}`

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={currentName}>{respuesta.usuario.nombre}:</Label>
      <Textarea name={currentName} value={respuesta.texto} readOnly />
    </div>
  )
}