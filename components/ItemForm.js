import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ItemForm({ currentItem, onSave, onCancel }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name)
      setDescription(currentItem.description)
    } else {
      setName('')
      setDescription('')
    }
  }, [currentItem])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const itemData = { name, description }

    try {
      let url = '/api/items'
      let method = 'POST'

      if (currentItem) {
        url += `/${currentItem.id}`
        method = 'PATCH'
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      })

      if (response.ok) {
        onSave()
      }
    } catch (error) {
      console.error('Error al guardar el elemento:', error)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{currentItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}</CardTitle>
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
        <CardFooter className="flex justify-between">
          
          <Button type="submit" variant="destructive"><span className="sr-only h-4 w-4">{currentItem ? 'Actualizar' : 'Agregar'}</span></Button>
          {currentItem && (
            <Button type="button" variant="outline" onClick={onCancel}>
              
              <span className="sr-only h-4 w-4">Cancelar</span>

            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
