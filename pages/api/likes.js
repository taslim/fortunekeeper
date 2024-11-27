// In-memory storage for likes (replace with a database in production)
let fortuneLikes = {};

export default function handler(req, res) {
  const { method, body } = req;
  
  switch (method) {
    case 'POST':
      const { fortune } = body;
      
      // Initialize if not exists
      if (!fortuneLikes[fortune]) {
        fortuneLikes[fortune] = 0;
      }
      
      // Increment likes count
      fortuneLikes[fortune]++;
      
      return res.status(200).json({ 
        likes: fortuneLikes[fortune],
        fortune 
      });

    case 'GET':
      const { fortune: queryFortune } = req.query;
      return res.status(200).json({ 
        likes: fortuneLikes[queryFortune] || 0,
        fortune: queryFortune 
      });

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
} 