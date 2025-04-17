import { Router } from "express";
import { makePurchase } from "../controllers/purchaseController";

export const shoppingRouter = Router();

shoppingRouter.post("/comprar", makePurchase);
