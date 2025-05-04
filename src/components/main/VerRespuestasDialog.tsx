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

export function VerRespuestasDialog(props: any) {
  let {
    btnTitle,
    respuestas
  } = props

  function ListaRespuestas() {
    return respuestas.map((respuesta,index)=> {
      return <RespuestaItem key={index} respuesta={respuesta} />
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">{btnTitle}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Respuestas</DialogTitle>
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
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
