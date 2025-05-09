import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NuevaRespuesta from "./NuevaRespuesta"
import { useState } from "react"
import { storeRespuesta } from "@/lib/apiUtils";
import { toast } from "sonner";

interface DataRespuesta {
  contenido: string;
  usuarioId: string;
  preguntaId: number;
}

export function CrearRespuestaDialog(props: any) {

  let {
    btnTitle,
    usuarios,
    preguntaId
  } = props

  let [stateDialog, setStateDialog] = useState(false)

  const closeDialog = () => {
    setStateDialog(false)
  }

  const saveAndClose = () => {
    setStateDialog(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data)

    let dataRespuesta: DataRespuesta = {
      contenido: data.answer,
      usuarioId: data.user,
      preguntaId: preguntaId,
    }

    storeRespuestaCallback(dataRespuesta)

  }

  async function storeRespuestaCallback(dataRespuesta: DataRespuesta) {

    let data = await storeRespuesta(dataRespuesta)

    if(data.success) {
      setStateDialog(false)

      toast("Pregunta creada correctamente", {
        description: "Mira en la sección de preguntas",
        duration: 5000,
        icon: "🥳",
        position: "bottom-center",
      })

    }else{
      
      console.log(data)

      toast("No se pudo crear la respuesta", {
        description: "Por favor, intenta nuevamente",
        duration: 10000,
        icon: "🚨",
        position: "bottom-center",
      })

    }
  }

  return (
    <Dialog open={stateDialog} onOpenChange={setStateDialog}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Respuesta</DialogTitle>
            <DialogDescription>
              Añade una nueva respuesta.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <NuevaRespuesta usuarios={usuarios} />
            </div>
          </div>
          <DialogFooter className="flex md:justify-between">
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Close
            </Button>
            <Button type="submit">
              Guardar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
