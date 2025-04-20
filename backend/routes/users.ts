import express from 'express';
import { findUserByEmail } from '../libs/storage/userService';

const router = express.Router();

router.post('/login', async (req: any, res: any) => {
  try {
    console.log(' POST /login');
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña requeridos' });
    }

    const user = await findUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error(' Error en login:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export { router };
