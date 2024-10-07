import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Pencil, Trash2 } from 'lucide-react'

export default function Home() {
  const [items, setItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items')
      const data = await response.json()
      if (Array.isArray(data)) {
        setItems(data)
      } else {
        setItems([])
        console.error('La respuesta de la API no es un array:', data)
      }
    } catch (error) {
      console.error('Error al cargar los elementos:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const itemData = { name, description }
    try {
      let url = '/api/items'
      let method = 'POST'
      if (editingItem) {
        url += `/${editingItem.id}`
        method = 'PATCH'
      }
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      })
      if (response.ok) {
        fetchItems()
        setName('')
        setDescription('')
        setEditingItem(null)
      }
    } catch (error) {
      console.error('Error al guardar el elemento:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, { method: 'DELETE' })
      if (response.ok) fetchItems()
    } catch (error) {
      console.error('Error al eliminar el elemento:', error)
    }
  }

  const handleEdit = (item) => {
    setEditingItem(item)
    setName(item.name)
    setDescription(item.description)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Elementos</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {editingItem ? 'Actualizar' : 'Agregar'}
            </Button>
            {editingItem && (
              <Button type="button" variant="outline" className="ml-2" onClick={() => setEditingItem(null)}>
                Cancelar
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Elementos</CardTitle>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p className="text-center text-gray-500">No hay elementos para mostrar.</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(item)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}