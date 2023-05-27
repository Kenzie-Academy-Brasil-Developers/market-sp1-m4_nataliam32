interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: "food" | "cleaning";
    expirationDate: Date;
};

type TCleaningProduct = IProduct;

interface IFoodProduct extends IProduct {
    calories: number;
}

type TProductCreate = Omit<IProduct, "id" | "expirationDate">;
type TProductUpdate = Partial<TProductCreate>

export { IProduct, TCleaningProduct, IFoodProduct, TProductCreate, TProductUpdate };