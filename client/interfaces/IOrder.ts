interface IOrder {
    product_id: number | undefined,
    name: string,
    quantity: number,
    price: number,
    total?: number
}

export default IOrder;