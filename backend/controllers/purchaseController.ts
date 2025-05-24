import type { Request, Response } from "express";
import { firebaseStorage } from "../libs/storage/firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const makePurchase = async (req: Request, res: Response): Promise<void> => {
  try {
    const { product, quantity, paymentMethod, shippingAddress, userId } = req.body;

    if (!userId || !product) {
      res.status(400).json({ message: "Falta el ID del comprador (buyerId) y/o el " });
      return;
    }

    const traceId = uuidv4();

    const newOrder = {
      userId,
      product,
      quantity,
      paymentMethod,
      shippingAddress,
      total: product.precio * quantity,
      status: "confirmada",
      createdAt: new Date(),
      traceId,
    };

    console.log("Orden de compra:", JSON.stringify(newOrder));
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
