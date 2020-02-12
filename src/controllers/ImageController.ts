import cloudinary from 'cloudinary';
import { Request, Response } from 'express';
require('dotenv').config();

class ImageController {
	private cloudinarySetting: object = {
		folder: process.env.CLOUDINARY_FOLDER_NAME
	};

	public async uploadSingleImage(req: Request, res: Response) {
		const file = '';
		let imageResult: any;

		return await cloudinary.v2.uploader.upload(
			file,
			this.cloudinarySetting,
			(result: any, error: Error) => {
				if (error) {
					return console.error(
						'Error on uploading image in cloudinary',
						error.stack
					);
				}

				imageResult = result;
			}
		);

		return imageResult;
	}
}
