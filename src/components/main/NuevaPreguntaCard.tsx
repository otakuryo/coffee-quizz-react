import { useRef, useState } from "react"

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
import { storeQuestion } from "@/lib/apiUtils"
import { usePreguntas } from "@/contexts/PreguntaContext"
import { toast } from "sonner"

export default function NuevaPreguntaCard({usuarios}) {
  
  let { refetch } = usePreguntas()

  const [question, setQuestion] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    let response = await storeQuestion({
      userId: data.user,
      question: data.question
    })

    if (response) {
      clearQuestionInput()
      refetch()
      toast("Pregunta creada correctamente", {
        description: "Mira en la sección de preguntas",
        duration: 10000,
        icon: "🥳",
        position: "bottom-center",
      })
    }else{

      toast("Error al crear la pregunta", {
        description: "Por favor, intenta nuevamente",
        duration: 10000,
        icon: "🚨",
        position: "top-center",
      })
    }

  }

  const handleClear = () => {
    // formRef.current?.reset()
    clearQuestionInput()
  }

  const clearQuestionInput = () => {
    setQuestion("")
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value)
  }

  return (
    <Card className="max-w-[600px]">
      <form ref={formRef} onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Crear Pregunta</CardTitle>
          <CardDescription>Escribe una pregunta.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="question">Pregunta</Label>
                <Input 
                  value={question} 
                  onChange={handleQuestionChange} 
                  name="question" 
                  id="question" 
                  placeholder="A quien...?" 
                  required={true} 
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <SelectInputUsuarios usuarios={usuarios} section="nueva-pregunta" />
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
