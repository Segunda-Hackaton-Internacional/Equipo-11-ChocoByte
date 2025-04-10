import express from 'express';
import { blockchainRouter } from './routes/blockchain';
import { usersRouter } from './routes/users';
import { shoppingRouter } from './routes/shopping';
import { productRouter } from './routes/product';

const app = express();
const BASEPATH = process.env.BASEPATH ?? '/api'
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use(BASEPATH + '/blockchain', blockchainRouter);
app.use(BASEPATH + '/users', usersRouter);
app.use(BASEPATH + '/shopping', shoppingRouter);
app.use(BASEPATH + '/product', productRouter);

app.get(BASEPATH, (req, res) => {
  res.send('Welcome to the API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}${BASEPATH}`);
});
