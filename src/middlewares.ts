import {  NextFunction, Request, Response } from "express";
import market from "./database";
import { IProduct, TProductCreate } from "./interfaces";

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

const verifyIfIdGet = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { productId } = req.params;

    const foundProduct: IProduct | undefined = market.find((value) => value.id === parseInt(productId));

    if(!foundProduct) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }
    res.locals.productId = foundProduct;

    return next();
}

const verifyIfIPatchAndDelete = (req: Request, res: Response, next: NextFunction): Response | void => {
    const { productId } = req.params;

    const productIndex: number = market.findIndex((val): boolean => val.id === Number(productId));

    if(productIndex === -1) {
        const error: string = "Product not found";
        return res.status(404).json({ error })
    }

    res.locals.productId = productIndex;

    return next();
} 

export default { verifyIfNameExists, verifyIfIdGet, verifyIfIPatchAndDelete }