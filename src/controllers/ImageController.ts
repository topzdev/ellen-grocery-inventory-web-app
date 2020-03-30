import cloudinary from 'cloudinary';
import { UploadedFile } from 'express-fileupload';
require('dotenv').config();

class ImageController {
	private cloudinarySetting: object = {
		folder: process.env.CLOUDINARY_FOLDER_NAME
	};

	public async uploadImage(file: UploadedFile) {
		let imageResult: any;

		await cloudinary.v2.uploader.upload(
			file.tempFilePath,
			this.cloudinarySetting,
			(error: any, result: Error) => {
				if (error) return console.error(
					'Error on uploading image in cloudinary',
					error
				);
				console.log('Sucessfully Pushed to Cloudinary',result);
				imageResult = result;
			}
		);

		return imageResult;
	}

	public async deleteImage(public_id: string){
		await cloudinary.v2.uploader.destroy(public_id, (error: any, result: Error)=>{
			if(error) return console.error('Error on delete image in cloudinary', error.stack);
			
			console.log('Successfully Deleted', result)
		})
	}

}


export default ImageController;