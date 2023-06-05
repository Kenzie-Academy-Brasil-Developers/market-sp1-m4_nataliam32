import {  NextFunction, Request, Response } from "express";
import market from "./database";
import { IProduct, TProductCreate, TProductUpdate } from "./interfaces";

const verifyIfNameExists = (req: Request, res: Response, next: NextFunction): Response | void => {
    const payload: TProductCreate[] = req.body;

    let productNameVariable = undefined;
    const error: string = "Product already registered.";

    for (let value of payload) {
      productNameVariable = market.find((product) => {
        return value.name === product.name; 
      });
    }
    
    if (productNameVariable !== undefined) {
      return res.status(409).json({ error });
    }

    return next();
}

const verifyIfNameExistsPatch = (req: Request, res: Response, next: NextFunction): Response | void => {
  const productName = req.params.productName;
  
  const foundProduct = market.find((product) => product.name === productName)

  if(foundProduct) {
    return res.status(409).json({ error: 'Product already exists.'})
  }

  return next();
}

const verifyIfIdExists = (req: Request, res: Response, next: NextFunction): Response | void => {
  const { productId } = req.params;

  if(req.method === "GET") {
    const foundProduct: IProduct | undefined = market.find((value) => value.id === parseInt(productId));

    if(!foundProduct) {
      const error: string = "Product not found";
      return res.status(404).json({ error })
  }
    res.locals.productId = foundProduct;

  } else if(req.method === "PATCH" || "DELETE") {
    const { productId } = req.params;

    const productIndex: number = market.findIndex((val): boolean => val.id === Number(productId));

    if(productIndex === -1) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }

    res.locals.productId = productIndex;

    return next();
  }
  
  
  return next();
}


 
export default { verifyIfNameExists, verifyIfIdExists, verifyIfNameExistsPatch }