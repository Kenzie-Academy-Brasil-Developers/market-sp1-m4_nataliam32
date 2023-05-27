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
    const total: number = market.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price
    }, 0);

   interface IProductRes {
    total: number;
    marketProducts: IProduct[];
   }

   const productResponse: IProductRes = {
    total: total,
    marketProducts: market,
   }

    return res.json(productResponse);
}

const getProductsById = (req: Request, res: Response): Response => {
    const { productId } = req.params;

    const foundProduct: IProduct | undefined = market.find((value) => value.id === parseInt(productId));

    if(!foundProduct) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }
    return res.json(foundProduct);
}

const deleteProductsById = (req: Request, res: Response): Response => {
    const { productId } = req.params;

    const productIndex: number = market.findIndex((val): boolean => val.id === Number(productId));

    if(productIndex === -1) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }

    market.splice(productIndex, 1);
    
    return res.status(204).json();
}

export default { createProduct, getProducts, getProductsById, deleteProductsById }