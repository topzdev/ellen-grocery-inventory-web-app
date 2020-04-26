import cloudinary from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
import config from '../config'
import { type } from 'os';
import { IUploadedImage, IProduct } from '../interfaces';

export default class ImageModel {
    private setting: object = {
        folder: config.cloudinary.folder_name
    }

    async create(file: UploadedFile | any): Promise<IUploadedImage> {
        let image: any;

        await cloudinary.v2.uploader.upload(
            file.tempFilePath,
            this.setting,
            (error: any, result: any) => {
                if (error) return console.error(
                    'Error on uploading image in cloudinary',
                    error
                );
                console.log('Sucessfully Pushed to Cloudinary', result);
                image = result;
            }
        );
        return { image_id: image.public_id, image_url: image.secure_url }
    }

    async update(image_id: IProduct['image_id'], newRawImage: UploadedFile | any) {
        await this.delete(image_id);
        return await this.create(newRawImage);
    }

    async delete(image_id: IProduct['image_id']) {

        if (image_id) {
            await cloudinary.v2.uploader.destroy(image_id!, (error: any, result: Error) => {
                if (error) return console.error('Error on delete image in cloudinary', error.stack);

                // @ts-ignore
                if (result.result === "not found") throw Error("Error on delete image")
                console.log('Successfully Deleted', result)
            })

        }
    }
}