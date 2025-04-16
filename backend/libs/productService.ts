// backend/libs/productService.ts
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { app } from '../firebase';  // Asegúrate de que en firebase.ts exportas la instancia de la app

// Obtén la instancia de Firestore
const db = getFirestore(app);

// Define la referencia a la colección de productos
const productsCollection = collection(db, 'products');

/**
 * Obtiene todos los productos.
 */
export async function getAllProducts() {
  const snapshot = await getDocs(productsCollection);
  const productos: any[] = [];
  snapshot.forEach((docSnapshot) => {
    productos.push({ id: docSnapshot.id, ...docSnapshot.data() });
  });
  return productos;
}

/**
 * Obtiene un producto por su ID.
 */
export async function getProductById(productId: string) {
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  if (!productSnap.exists()) {
    throw new Error('Producto no encontrado');
  }
  return { id: productSnap.id, ...productSnap.data() };
}

/**
 * Crea un nuevo producto.
 */
export async function createProduct(productData: any) {
  const docRef = await addDoc(productsCollection, productData);
  return { id: docRef.id, ...productData };
}

/**
 * Actualiza un producto existente.
 */
export async function updateProduct(productId: string, updateData: any) {
  const productRef = doc(db, 'products', productId);
  await updateDoc(productRef, updateData);
  return getProductById(productId);
}

/**
 * Elimina un producto.
 */
export async function deleteProduct(productId: string) {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
  return { id: productId, eliminado: true };
}
