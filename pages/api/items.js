export default async function handler(req, res) {
  const { method } = req;
  const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/items`;
  
  switch (method) {
    case 'GET':
      try {
        console.log('Fetching from:', baseURL ,' of next-crud\pages\api\items.js'); // <-- Agrega esto
        const response = await fetch(baseURL);
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('La respuesta no es un array');
        }
        console.log('Data received:', data ,' of next-crud\pages\api\items.js'); // <-- Agrega esto
        res.status(200).json(data);
      } catch (error) {
        console.error('API Error:', error ,' of next-crud\pages\api\items.js'); // <-- Agrega esto
        res.status(500).json({ message: 'Error al obtener los elementos' });
      }
      break;
    case 'POST':
      try {
        const response = await fetch(baseURL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(201).json(data);
      } catch (error) {
        console.error('API Error:', error ,' of next-crud\pages\api\items.js'); // <-- Agrega esto
        res.status(500).json({ message: 'Error al crear el elemento', error: error });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
  }
}
