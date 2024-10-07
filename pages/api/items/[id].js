export default async function handler(req, res) {
  const { id } = req.query;
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items/${id}`; // Incluir el ID en la URL
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        console.log('Fetching from:', baseURL,' of next-crud\pages\api\items\[id].js'); // <-- Agrega esto
        const response = await fetch(baseURL);
        const data = await response.json();
        console.log('Data received:', data,' of next-crud\pages\api\items\[id].js'); // <-- Agrega esto
        res.status(200).json(data);
      } catch (error) {
        console.error('API Error:', error); // <-- Agrega esto
        console.error('API Error:', error ,' of next-crud\pages\api\items\[id].js'); // <-- Agrega esto

        res.status(500).json({ message: 'Error al obtener el elemento' });
      }
      break;
    case 'PATCH':
      try {
        const response = await fetch(baseURL, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el elemento' });
      }
      break;
    case 'DELETE':
      try {
        await fetch(baseURL, { method: 'DELETE' });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el elemento' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
