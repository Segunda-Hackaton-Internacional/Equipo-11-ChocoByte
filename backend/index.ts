import express from 'express';
import cors from 'cors';

import { blockchainRouter } from './routes/blockchain';
import { usersRouter } from './routes/users';
import { shoppingRouter } from './routes/shopping';
import { productRouter } from './routes/product';

const app = express();
const BASEPATH = process.env.BASEPATH ?? '/api'
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors())

// Rutas
app.use(BASEPATH + '/blockchain', blockchainRouter);
app.use(BASEPATH + '/users', usersRouter);
app.use(BASEPATH + '/shopping', shoppingRouter);
app.use(BASEPATH + '/product', productRouter);

app.get(BASEPATH, (req, res) => {
  res.send('Welcome to the API');
});

// Debug para Firebase
console.log('📡 Firebase Project ID:', process.env.FIRE_PROJECTID);
console.log('🔗 Firebase DB URL:', process.env.FIRE_DATABASE_URL);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🟢 Server is running at http://localhost:${PORT}${BASEPATH}`);
});
