import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import filterGenerator from "~/utils/filterGenerator";
import { IFilter, IResult, IProduct } from "~/interfaces";

export default class ProductAPI {
    private url: string = "api/product";

    async fetchSingleProduct(barcode: string) {
        const result = await $axios.$get(`${this.url}/${barcode}`);
        return result;
    }

    async fetchProducts(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result;
    }

    async addProduct(product: IProduct) {
        const formData = new FormData();

        formData.append('product_name', product.product_name.toString())
        formData.append('barcode', product.barcode.toString())
        formData.append('quantity_min', product.quantity_min.toString())
        formData.append('quantity_max', product.quantity_max.toString())
        formData.append('quantity', product.quantity.toString())
        formData.append('price', product.price.toString())
        formData.append('description', product.description)
        formData.append('brand_id', product.brand_id.toString())
        formData.append('supplier_id', product.supplier_id.toString())
        formData.append('category_id', product.category_id.toString())
        if (product.imageFile) formData.append('image', product.imageFile!)

        const result: IResult = await $axios.$post(`${this.url}`, formData, config);
        return result;
    }

    async updateProduct(product: IProduct) {

        const formData = new FormData();

        formData.append('product_id', product.product_id!.toString())
        formData.append('product_name', product.product_name.toString())
        formData.append('barcode', product.barcode.toString())
        formData.append('quantity_min', product.quantity_min.toString())
        formData.append('quantity_max', product.quantity_max.toString())
        formData.append('quantity', product.quantity.toString())
        formData.append('price', product.price.toString())
        formData.append('description', product.description)
        formData.append('brand_id', product.brand_id.toString())
        formData.append('supplier_id', product.supplier_id.toString())
        formData.append('category_id', product.category_id.toString())
        if (product.imageFile) formData.append('image', product.imageFile!)

        const result: IResult = await $axios.$put(`${this.url}`, formData, config);
        return result;
    }

    async deleteProduct(id: IProduct['product_id']) {
        const result: IResult = await $axios.$delete(`${this.url}/${id}`);
        return result;
    }

} 