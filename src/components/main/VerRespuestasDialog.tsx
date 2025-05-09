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
import RespuestaItem from "./RespuestaItem"
import { useState } from "react"
import type { Pregunta } from "@/types/Pregunta"

export function VerRespuestasDialog(props: any) {
  let {
    btnTitle,
    preguntaId
  } = props

  let [pregunta, setPregunta] = useState<Pregunta | null>(null)
  let [open, setOpen] = useState(false)

  async function getPreguntaByIdWithRespuestas(preguntaId: string) {
    let response = await fetch(`/api/pregunta/${preguntaId}/respuestas`)
    let data = await response.json()
    if(data.success) {
      setPregunta(data.data)
    }
  }

  function ListaRespuestas() {

    if(!pregunta) return null;

    return pregunta.respuestas.map((respuesta,index)=> {
      return <RespuestaItem key={index} respuesta={respuesta} />
    })
  }

  function onOpenChange(open: boolean) {
    if (open) {
      getPreguntaByIdWithRespuestas(preguntaId)
    } else {
      setOpen(false)
      setTimeout(() => {
        setPregunta(null)
      }, 150)
    }
  }
  
  function onClose() {
    setOpen(false)
  }

  function onOpen() {
    setOpen(true)
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" onClick={onOpen}>{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader className="sticky -top-5 bg-background pt-3">
          <DialogTitle>{pregunta?.contenido ?? "Cargando..."}</DialogTitle>
          <DialogDescription>
            Listado de respuestas.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            {ListaRespuestas()}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
