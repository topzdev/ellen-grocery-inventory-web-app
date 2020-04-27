import ProductModel from '../model/ProductModel';
import ImageModel from '../model/ImageModel';
import { UploadedFile } from 'express-fileupload';
import { IFilter, IProduct, IUploadedImage } from '../interfaces';
import ImageServices from './ImageServices';

const productModel = new ProductModel
const imageServices = new ImageServices;

export default class ProductServices {

    async getProduct(barcode: string) {
        const result = await productModel.findOne({ barcode })
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
        const exist = await productModel.findOne({ barcode: product.barcode });

        if (exist) return ({
            success: false,
            message: 'Product Already Exist'
        });

        const image = await imageServices.upload(rawImage)

        const result = await productModel.create({ ...product, ...image })

        return {
            message: 'Product Successfully Added',
            data: result
        }
    }

    async updateProduct(product: IProduct, rawImage: UploadedFile | any) {
        let image: any = await productModel.findOne({ product_id: product.product_id }, undefined, { image_id: true, image_url: true });

        image = await imageServices.update(image.image_id!, rawImage);

        if (!image) return {
            success: true,
            message: 'Error on uploading images'
        }

        const result = await productModel.update(product.product_id, { ...product, ...image })
        return {
            message: 'Product Successfuly Updated',
            data: result
        }
    }

    /**
     * @description 'Deleting product permanently its mean delete information and the image of the product
     */
    async deleteProduct(product_id: IProduct['product_id']) {
        const product = await productModel.findOne({ product_id }, undefined, { image_id: true });

        await imageServices.delete(product.image_id!);

        await productModel.delete(product_id);

        return {
            message: 'Product Successfully Deleted'
        }
    }

    /**
     * @description 'Delete product temporary 
     */
    async removeProduct(product_id: IProduct['product_id']) {
        await productModel.remove(product_id);
        return {
            message: 'Product Successfully Removed'
        }
    }
}