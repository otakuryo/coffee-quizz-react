import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SelectInputUsuarios from "./SelectInputUsuarios"

export default function NuevaRespuesta({usuarios}) {
  return (
    <div className="grid w-full items-center gap-4">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="answer">Responder:</Label>
        <Input name="answer" id="answer" placeholder="Una vez..." required={true} />
      </div>
      <div className="flex flex-col space-y-1.5">
        <SelectInputUsuarios usuarios={usuarios} section="nueva-respuesta" />
      </div>
    </div>
  )
}