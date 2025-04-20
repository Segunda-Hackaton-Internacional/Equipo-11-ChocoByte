import { Router, type Request, type Response } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../libs/productService';

export const productRouter = Router();

// Endpoint: Obtener todos los productos
// GET /api/product
productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const productos = await getAllProducts();
    res.status(200).json({ exito: true, data: productos });
  } catch (error: any) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al obtener productos', error: error.message });
  }
});

// Endpoint: Obtener un producto por ID
// GET /api/product/:id
productRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await getProductById(id);
    res.status(200).json({ exito: true, data: producto });
  } catch (error: any) {
    console.error('Error al obtener producto:', error);
    res.status(404).json({ exito: false, mensaje: error.message });
  }
});

// Endpoint: Crear un nuevo producto
// POST /api/product
productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const nuevoProducto = await createProduct(productData);
    res.status(201).json({ exito: true, data: nuevoProducto });
  } catch (error: any) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al crear producto', error: error.message });
  }
});

// Endpoint: Actualizar un producto
// PUT /api/product/:id
productRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const productoActualizado = await updateProduct(id, updateData);
    res.status(200).json({ exito: true, data: productoActualizado });
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al actualizar producto', error: error.message });
  }
});

// Endpoint: Eliminar un producto
// DELETE /api/product/:id
productRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await deleteProduct(id);
    res.status(200).json({ exito: true, data: resultado });
  } catch (error: any) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al eliminar producto', error: error.message });
  }
});
