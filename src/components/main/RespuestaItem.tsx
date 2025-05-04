import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useUsers } from "@/contexts/UserContext"

export default function RespuestaItem({respuesta}) {

  let currentName = `answer-${respuesta.id}`;

  let { users } = useUsers();
  let userNombre = "None";
  if(respuesta.usuarioId) {
    let tmpUser = users.find(user => user.id == respuesta.usuarioId );
    if(tmpUser) {
      userNombre = tmpUser.nombre;
    }
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={currentName}>{userNombre}:</Label>
      <Textarea name={currentName} value={respuesta.texto} readOnly />
    </div>
  )
}