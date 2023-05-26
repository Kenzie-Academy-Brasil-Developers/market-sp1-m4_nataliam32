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