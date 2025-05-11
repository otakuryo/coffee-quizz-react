import "@@/styles/globals.css";
import { Button } from "@/components/ui/button";
import data from '@/data/db.json';
import NuevaPreguntaCard from "@/components/main/NuevaPreguntaCard";
import VerPreguntaCard from "@/components/main/VerPreguntaCard";
import { useUsers } from "@/contexts/UserContext";
import { usePreguntas } from "@/contexts/PreguntaContext";
import FilterCard from "@/components/main/FilterCard";
import Footer from "@/components/general/Footer";
export default function Main() {

  // const { preguntas, usuarios } = data;
  const { users } = useUsers();
  const { preguntas, loading, setPreguntas } = usePreguntas();

  const handleFilterChange = (userId: string, orderBy: 'asc' | 'desc') => {
    let preguntasFiltradas = [...preguntas];

    preguntasFiltradas.map(pregunta => {
      if (userId == 'all' || userId == '' ) {
        pregunta.visible = true;
      } else {
        pregunta.visible = pregunta.usuarioId == userId;
      }
    });

    if (orderBy === 'asc') {
      preguntasFiltradas.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else {
      preguntasFiltradas.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setPreguntas(preguntasFiltradas);
  };

  return (
    <main className="mx-2 mb-3">
      <div className="header flex flex-col space-y-1.5 text-center">
        <h1>Preguntas para el Café</h1>
      </div>
      <div className="flex justify-center items-center flex-col w-full">
        <div className="flex flex-col space-y-1.5 max-w-[600px] w-full">
          <NuevaPreguntaCard usuarios={users} />
          <FilterCard usuarios={users} onFilterChange={handleFilterChange} />
          {
            preguntas.map((pregunta, index) => {
              return <VerPreguntaCard 
                key={index} 
                usuarios={users} 
                pregunta={pregunta} />
            })
          }
        </div>
      </div>
      <Footer />
    </main>
  )
}