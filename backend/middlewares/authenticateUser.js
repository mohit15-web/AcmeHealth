import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
    
  // Check if the token is present
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Replace 'your_jwt_secret' with your actual secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // assuming the payload includes user info like id or email
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};


