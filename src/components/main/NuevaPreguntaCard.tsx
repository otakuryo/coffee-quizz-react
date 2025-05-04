import { useRef } from "react"

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
import SelectInputUsuarios from "./SelectInputUsuarios"

export default function NuevaPreguntaCard({usuarios}) {
  
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    console.log(data);

    // setStateDialog(false)
  }

  const handleClear = () => {
    formRef.current?.reset()
  }

  return (
    <Card className="w-[600px]">
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Crear Pregunta</CardTitle>
          <CardDescription>Escribe una pregunta.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="question">Pregunta</Label>
                <Input name="question" id="question" placeholder="A quien...?" required={true} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <SelectInputUsuarios usuarios={usuarios} />
              </div>
            </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="cursor-pointer" variant="outline" onClick={handleClear}>Limpiar</Button>
          <Button className="cursor-pointer">Guardar</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
