import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SelectInputUsuarios({usuarios, section}) {
  return (
    <>
      <Label htmlFor="author">Autor</Label>
      <Select name="user" required={true}>
        <SelectTrigger id="author">
          <SelectValue placeholder="Selecciona un usuario" />
        </SelectTrigger>
        <SelectContent position="popper">
          {
            usuarios.map(usuario => (
              <SelectItem key={`${section}-${usuario.id}`} value={`${usuario.id}`}>
                {usuario.nombre}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>
    </>
  )
}