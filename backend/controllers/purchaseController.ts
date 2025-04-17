import type { Request, Response } from "express";
import { firebaseStorage } from "../libs/storage/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const makePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, quantity, paymentMethod, shippingAddress, buyerId } = req.body;

    if (!buyerId) {
      res.status(400).json({ message: "Falta el ID del comprador (buyerId)" });
      return;
    }

    const productRef = doc(firebaseStorage, "productos", productId);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      res.status(404).json({ message: "Producto no encontrado" });
      return;
    }

    const product = productSnap.data();

    if (product.stock < quantity) {
      res.status(400).json({ message: "Stock insuficiente" });
      return;
    }

    await updateDoc(productRef, {
      stock: product.stock - quantity,
    });

    const traceId = uuidv4();

    const newOrder = {
      buyerId,
      productId,
      quantity,
      paymentMethod,
      shippingAddress,
      total: product.precio * quantity,
      status: "confirmada",
      createdAt: new Date(),
      traceId,
    };

    await addDoc(collection(firebaseStorage, "ordenes"), newOrder);

    res.status(201).json({
      message: "Compra realizada con éxito",
      orden: newOrder,
    });

  } catch (error) {
    console.error("Error al registrar la compra:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
