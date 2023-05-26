import { Request, Response } from "express";
import { IFoodProduct, IProduct, TCleaningProduct, TProductCreate } from "./interfaces"
import  market from "./database"

const createProduct = (request: Request, response: Response): Response => {
    const payload: TProductCreate[] = request.body;
    const newProduct = payload.map((product) => {
      const createdProduct: IProduct | IFoodProduct | TCleaningProduct = {
        id: market.length + 1,
        ...product,
        expirationDate: new Date(),
      };
      market.push(createdProduct);
      return createdProduct;
    });
  
    return response.status(201).json(newProduct);
  };
  

const getProducts = (req: Request, res: Response): Response => {
    return res.json(market);
}

export default { createProduct, getProducts }