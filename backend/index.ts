import express from 'express';
<<<<<<< HEAD
import { blockchainRouter } from './routes/blockchain';
import { usersRouter } from './routes/users';
=======

import { blockchainRouter } from './routes/blockchain';
import { router as usersRouter } from './routes/users';
>>>>>>> 4629910e2edf1070e64655c240fe90314c7d4328
import { shoppingRouter } from './routes/shopping';
import { productRouter } from './routes/product';

const app = express();
<<<<<<< HEAD
const BASEPATH = process.env.BASEPATH ?? '/api'
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

=======
const BASEPATH = process.env.BASEPATH ?? '/api';
const PORT = parseInt(process.env.PORT ?? '3000');

app.use(express.json());

// Rutas
>>>>>>> 4629910e2edf1070e64655c240fe90314c7d4328
app.use(BASEPATH + '/blockchain', blockchainRouter);
app.use(BASEPATH + '/users', usersRouter);
app.use(BASEPATH + '/shopping', shoppingRouter);
app.use(BASEPATH + '/product', productRouter);

<<<<<<< HEAD
app.get(BASEPATH, (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}${BASEPATH}`);
=======
// Ruta base
app.get(BASEPATH, (_, res) => {
  res.send('Welcome to the API');
});

// Debug para Firebase
console.log('📡 Firebase Project ID:', process.env.FIRE_PROJECTID);
console.log('🔗 Firebase DB URL:', process.env.FIRE_DATABASE_URL);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🟢 Server is running at http://localhost:${PORT}${BASEPATH}`);
>>>>>>> 4629910e2edf1070e64655c240fe90314c7d4328
});
