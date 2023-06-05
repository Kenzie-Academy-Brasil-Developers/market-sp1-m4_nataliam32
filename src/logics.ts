import { Request, Response } from "express";
import { ICleaningProduct, IFoodProduct, IProduct, TProductCreate } from "./interfaces"
import  market from "./database"

const createProduct = (req: Request, res: Response): Response => {
    const payload: TProductCreate[] = req.body;
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const finalDate = date.toISOString().split('T')[0];

    let productId = 0;
    market.forEach((product) => {
        if(product.id > productId){
            productId = product.id
        }
    });

    const newProduct: IProduct[] | undefined = payload.map((product) => {
      const createdProduct: IProduct | ICleaningProduct | IFoodProduct = {
        id: productId + 1,
        ...product,
        expirationDate: finalDate,
      };
      market.push(createdProduct);
      productId++;
      return createdProduct;
    });

    const total: number = newProduct.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price;
    }, 0);

    interface IProductRes {
        total: number,
        marketProducts: IProduct[]
    }

    const productResponse: IProductRes = {
        total: total,
        marketProducts: market
    }
  
    return res.status(201).json(productResponse);
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

    const foundProduct = res.locals.productId;
    return res.json(foundProduct);
}

const updateProductsById = (req: Request, res: Response): Response => {
    
    const payload: TProductCreate[] = req.body;
    
    const productIndex = res.locals.productId;

    const updateProduct: TProductCreate[] = (market[productIndex] = {
        ...market[productIndex],
        ...payload
    });

    return res.status(200).json(updateProduct);
}

const deleteProductsById = (req: Request, res: Response): Response => {

    const productIndex = res.locals.productId;

    market.splice(productIndex, 1);
    
    return res.status(204).json();
}

export default { createProduct, getProducts, getProductsById, updateProductsById, deleteProductsById }