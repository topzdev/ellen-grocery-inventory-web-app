interface RulesInterface {
    minQuantity: number,
    maxQuantity: number
}

export default interface ProductInterface {
    productName: string,
    barcode: string,
    quantity: number,
    price: number,
    description: string,
    brand: string,
    supplierName: string,
    category: string,
    image: string,
    rules: RulesInterface
} 