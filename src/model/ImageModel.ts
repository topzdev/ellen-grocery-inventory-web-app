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
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath, this.setting);
        return { image_id: result.public_id, image_url: result.secure_url }
    }

    async update(image_id: IUploadedImage['image_id'], newRawImage: UploadedFile | any) {
        await this.delete(image_id);
        return await this.create(newRawImage);
    }

    async delete(image_id: IUploadedImage['image_id']) {
        const result = await cloudinary.v2.uploader.destroy(image_id)
        return true;
    }
}