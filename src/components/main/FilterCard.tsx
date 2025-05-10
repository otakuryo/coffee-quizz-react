import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterCardProps {
  usuarios: any[];
  onFilterChange: (userId: string, orderBy: 'asc' | 'desc') => void;
}

export default function FilterCard({ usuarios, onFilterChange }: FilterCardProps) {

  let [user, setUser] = useState<string>('')
  let [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const handleUserChange = (userId: string) => {
    setUser(userId)
    onFilterChange(userId, order)
  }

  const handleOrderChange = (order: 'asc' | 'desc') => {
    setOrder(order)
    onFilterChange(user, order)
  }

  const handleOrderToggle = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
    onFilterChange(user, order)
  }


  return (
    <Card className="max-w-[600px]">
      <CardContent>
        <div className="flex flex-row w-full items-center gap-2 pt-4 md:pt-0">
          <Select name="user" onValueChange={handleUserChange}>
            <SelectTrigger id="author">
              <SelectValue placeholder="Filtra por usuario" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem key={`filter-all`} value={`all`}>Todos</SelectItem>
              {
                usuarios.map(usuario => (
                  <SelectItem key={`filter-${usuario.id}`} value={`${usuario.id}`}>
                    {usuario.nombre}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={handleOrderToggle}
            className="cursor-pointer"
          >
            {order === 'asc' ? 'Más Antiguos' : 'Más Recientes'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
