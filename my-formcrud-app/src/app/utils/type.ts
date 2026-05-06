export type formProductDataType = {
    id: number,
    productName: string,
    vintage: string,
    price: number,
    brand: string,
    notes: string[],
    category: string
}

export const brands = ["The Macallan", "Hennessy", "Grey Goose", "Glenfiddich", "Moët & Chandon", "Amrut"];
export const tastingNotes = ["Smoky", "Oak", "Vanilla", "Fruity", "Spiced", "Peaty"];
export const categories = ["Whiskey", "Wine", "Vodka", "Cognac", "Rum"];