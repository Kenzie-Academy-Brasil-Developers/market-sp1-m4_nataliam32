interface IProduct {
    id: number;
    name: string;
    price: number;
    weight: number;
    section: "food" | "cleaning";
    expirationDate: Date;
};

interface ICleaningProduct extends IProduct {};

interface IFoodProduct extends IProduct {
    calories: number;
}

type TProductCreate = Omit<IProduct, "id" | "expirationDate">;
type TProductUpdate = Partial<TProductCreate>

export { IProduct, IFoodProduct, TProductCreate, TProductUpdate, ICleaningProduct };