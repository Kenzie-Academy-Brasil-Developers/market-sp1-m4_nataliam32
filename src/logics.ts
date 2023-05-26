import { Request, Response } from "express";
import { IFoodProduct, IProduct, TCleaningProduct, TProductCreate } from "./interfaces"
import  market from "./database"

const createProduct = (req: Request, res: Response): Response => {
    const payload: TProductCreate[] = req.body;

    const newProduct = payload.map((product) => {
      const createdProduct: IProduct | IFoodProduct | TCleaningProduct = {
        id: market.length + 1,
        ...product,
        expirationDate: new Date(),
      };
      market.push(createdProduct);
      return createdProduct;
    });
  
    return res.status(201).json(newProduct);
  };
  

const getProducts = (req: Request, res: Response): Response => {
    const total = market.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price
    }, 0)
    return res.json(market);
}

const getProductsById = (req: Request, res: Response): Response => {
    const { productId } = req.params;

    const foundProduct = market.find((value) => value.id === parseInt(productId));
    if(!foundProduct) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }
    return res.json(foundProduct);
}

export default { createProduct, getProducts, getProductsById }