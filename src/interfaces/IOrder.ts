import IProduct from "./IProduct";

interface IOrder {
    product_id: number | undefined,
    name: string,
    quantity: number,
    maxQuantity: IProduct['quantity']
    price: number,
    total?: number
    image?: IProduct['image_url']
}

export default IOrder;