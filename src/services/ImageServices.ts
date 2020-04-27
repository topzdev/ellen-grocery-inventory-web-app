import ImageModel from "../model/ImageModel";
import { UploadedFile } from "express-fileupload";
import { IUploadedImage } from "../interfaces";

const imageModel = new ImageModel;

export default class ImageServices {

    async upload(rawImage: UploadedFile | any) {
        let image: IUploadedImage = {
            image_url: "",
            image_id: ""
        }
        if (rawImage) image = await imageModel.create(rawImage['image'])

        return image;
    }


    async delete(image_id: IUploadedImage['image_id']) {
        if (image_id) {
            const result = await imageModel.delete(image_id);
            return result;
        }
    }

    async update(image_id: IUploadedImage['image_id'], rawImage: UploadedFile | any) {
        let image: IUploadedImage = {
            image_url: "",
            image_id: ""
        }
        await this.delete(image_id);
        image = await this.upload(rawImage)
        return image;
    }

} 