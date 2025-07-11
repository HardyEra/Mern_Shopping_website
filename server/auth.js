import jwt from 'jsonwebtoken';
const SECRET = process.env.SECRET || 'hardy123';

export const verifytoken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; 

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Error in Token' });

    req.user = decoded;
    next();
  });
};
