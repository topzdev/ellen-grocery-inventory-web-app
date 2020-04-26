import ProductModel from '../model/ProductModel';
import ImageModel from '../model/ImageModel';
import { UploadedFile } from 'express-fileupload';
import { IFilter, IProduct, IUploadedImage } from '../interfaces';
import { raw } from 'express';

const productModel = new ProductModel
const imageModel = new ImageModel;

export default class ProductServices {

    async getProduct(barcode: string) {
        const result = await productModel.findOne(barcode)
        return {
            message: 'Successfully Single Product Fetch',
            data: result
        }
    }

    async getProducts({ search, limit, offset }: IFilter) {
        const result = await productModel.findMany({ search, limit, offset })
        return {
            message: 'Products Successfully fetched',
            data: result
        }
    }

    async createProduct(product: IProduct, rawImage: UploadedFile | any) {
        let exist = await productModel.findOne(product.barcode);


        let image: IUploadedImage = {
            image_url: "",
            image_id: ""
        }

        console.log(exist, rawImage)

        if (exist) return ({
            success: false,
            message: 'Product Already Exist'
        });

        if (rawImage) image = await imageModel.create(rawImage['image'])

        const result = await productModel.create({ ...product, ...image })

        return {
            message: 'Product Successfully Added',
            data: result
        }
    }

    async updateProduct(product: IProduct, rawImage: UploadedFile | any) {
        let image: IUploadedImage = {
            image_url: "",
            image_id: ""
        }

        if (rawImage) image = await imageModel.update(product.image_id, rawImage['image'])

        console.log(image, rawImage)
        const result = await productModel.update(product.product_id, { ...product, ...image })

        return {
            message: 'Product Successfuly Updated',
            data: result
        }
    }

    async deleteProduct(product_id: IProduct['product_id'], image_id: IProduct['image_id']) {

        await imageModel.delete(image_id);
        await productModel.delete(product_id);

        return {
            message: 'Product Successfully Deleted'
        }
    }
}