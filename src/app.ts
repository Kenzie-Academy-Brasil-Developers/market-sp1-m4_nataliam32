import express, { Application, json } from "express";
import { Request, Response } from "express-serve-static-core";
import logics from "./logics"
import middlewares from "./middlewares";

const app: Application = express();
app.use(json());

app.post("/products", middlewares.verifyIfNameExists, logics.createProduct);
app.get("/products", logics.getProducts);

app.get("/products/:productId", logics.getProductsById);
app.delete("/products/:productId", logics.deleteProductsById);

const PORT: number = 3000;
const msg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
    console.log(msg);
});

