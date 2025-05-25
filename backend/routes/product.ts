import { Router, type Request, type Response } from 'express';
import multer from 'multer';
import { firebaseFiles } from '../libs/storage/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../libs/productService';

export const productRouter = Router();

// Configuración de multer para manejar imágenes en memoria
const upload = multer({ storage: multer.memoryStorage() });

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

// POST /api/product
// Aquí aceptamos campos de texto + múltiples imágenes (campo "imagenes")
productRouter.post(
  '/',
  upload.array('imagenes'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        nombre,
        descripcion,
        categoria,
        precio,
        cantidad,
        origen,
        certificaciones
      } = req.body;

      // Validaciones básicas
      if (!nombre || !precio || Number(cantidad) < 0) {
        res.status(400).json({ exito: false, mensaje: 'Campos obligatorios inválidos' });
        return;  // <-- ya no devuelve `res`, sólo corta ejecución
      }

      // Subir imágenes...
      const imagenesURLs: string[] = [];
      const files = req.files as Express.Multer.File[] | undefined;
      if (files && files.length) {
        for (const file of files) {
          const imageRef = ref(
            firebaseFiles,
            `productos/${Date.now()}-${file.originalname}`
          );
          const result = await uploadBytes(imageRef, file.buffer, {
            contentType: file.mimetype
          });
          imagenesURLs.push(await getDownloadURL(result.ref));
        }
      }

      const productData = {
        nombre,
        descripcion,
        categoria,
        precio: Number(precio),
        stock: Number(cantidad),
        origen,
        certificaciones: certificaciones
          ? (certificaciones as string).split(',').map(c => c.trim())
          : [],
        imagenes: imagenesURLs,
        creadoEn: new Date().toISOString()
      };

      const nuevoProducto = await createProduct(productData);

      res
        .status(201)
        .json({ exito: true, mensaje: 'Producto registrado con éxito', data: nuevoProducto });
      return; // <-- de nuevo, corta ejecución sin devolver `res`
    } catch (error: any) {
      console.error('Error al crear producto:', error);
      res
        .status(500)
        .json({ exito: false, mensaje: 'Error al crear producto', error: error.message });
      return;
    }
  }
);

// PUT /api/product/:id
productRouter.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const productoActualizado = await updateProduct(id, updateData);
    res.status(200).json({ exito: true, data: productoActualizado });
  } catch (error: any) {
    console.error('Error al actualizar producto:', error);
    res
      .status(500)
      .json({ exito: false, mensaje: 'Error al actualizar producto', error: error.message });
  }
});

// DELETE /api/product/:id
productRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resultado = await deleteProduct(id);
    res.status(200).json({ exito: true, data: resultado });
  } catch (error: any) {
    console.error('Error al eliminar producto:', error);
    res
      .status(500)
      .json({ exito: false, mensaje: 'Error al eliminar producto', error: error.message });
  }
});
