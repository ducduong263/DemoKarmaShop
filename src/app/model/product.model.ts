export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    color: string;
    size: string;
    image: string;
    category: string;
    quantity: number;
    constructor(
        name: string,
        id: number,
        decs: string,
        price: number,
        colors: string,
        size: string,
        image: string,
        category: string,
        quantity: number
    ) {
        this.name = name;
        this.id = id;
        this.price = price;
        this.description = decs;
        this.color = colors;
        this.size = size;
        this.image = image;
        this.category = category;
        this.quantity = quantity;
    }
}
export interface CartItem {
    product: Product;
    quantity: number;
  }