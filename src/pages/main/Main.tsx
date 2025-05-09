import "@@/styles/globals.css";
import { Button } from "@/components/ui/button";
import data from '@/data/db.json';
import NuevaPreguntaCard from "@/components/main/NuevaPreguntaCard";
import VerPreguntaCard from "@/components/main/VerPreguntaCard";
import { useUsers } from "@/contexts/UserContext";
import { usePreguntas } from "@/contexts/PreguntaContext";

export default function Main() {

  // const { preguntas, usuarios } = data;
  const { users } = useUsers();
  const { preguntas } = usePreguntas();

  // Ordenar preguntas por fecha (más recientes primero)
  // const preguntasOrdenadas = [...preguntas].sort((a, b) => 
  //   new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  // );

  return (
    <main>
      <div className="header flex flex-col space-y-1.5">
        <h1>Preguntas para el Café</h1>
        <NuevaPreguntaCard usuarios={users} />
        {
          preguntas.map((pregunta, index) => {
            return <VerPreguntaCard 
              key={index} 
              usuarios={users} 
              pregunta={pregunta} />
          })
        }
      </div>
    </main>
  )
}