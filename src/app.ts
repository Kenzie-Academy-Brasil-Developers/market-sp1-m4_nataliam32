import express, { Application, json } from "express";
import { Request, Response } from "express-serve-static-core";
import logics from "./logics"

const app: Application = express();
app.use(json());

app.post("/products", logics.createProduct);

app.get("/products", logics.getProducts);

app.get("/products/:productId", logics.getProductsById);

const PORT: number = 3000;
const msg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(msg);
});

