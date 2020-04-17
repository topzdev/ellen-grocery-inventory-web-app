import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import IProduct from '../interfaces/IProduct';
import { QueryConfig } from 'pg';
import ImageController from './ImageController'

const imageUploader = new ImageController()

class ProductController extends QueryExtend {
	constructor() {
		super();
		console.log('Product Controller');
	}

	public async getSingleProduct(req: Request, res: Response): Promise<any> {
		const barcode = req.params.barcode;

		try {
			const query: QueryConfig = {
				text: `SELECT * FROM "${this.productTable}" WHERE barcode = $1`,
				values: [barcode]
			};

			const result = await this.executeQuery(query);

			return res.json({
				success: true,
				message: 'Successfly Single Product Fetch',
				data: result.rows[0]
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

	public async getProducts(req: Request, res: Response): Promise<any> {

		const { search, limit, offset } = req.query;

		try {
			const query: QueryConfig = {
				text: `SELECT
				product.product_id,
				product.barcode,
				product.product_name,
				product.quantity,
				product.quantity_max,
				product.quantity_min,
				product.price,
				product.description,
				product.brand_id,
				product.supplier_id,
				product.category_id,
				product.image,
				product.image_url,
				brand.brand_name,
				category.category_name,
				supplier.supplier_name
				FROM "${this.productTable}" product
				INNER JOIN "${this.brandTable}" brand ON product.brand_id = brand.brand_id 
				INNER JOIN "${this.categoryTable}" category ON product.category_id = category.category_id 
				INNER JOIN "${this.supplierTable}" supplier ON product.supplier_id = supplier.supplier_id
				${this.queryAnalyzer("product.product_name", search, limit, offset)}`,

			};

			const result = await this.executeQuery(query);
			return res.json({
				success: true,
				message: 'Successfully fetched',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

	public async addProduct(req: Request, res: Response): Promise<any> {
		const {
			barcode,
			product_name,
			quantity,
			quantity_max,
			quantity_min,
			price,
			description,
			brand_id,
			supplier_id,
			category_id,
		}: IProduct = req.body;

		let image = {
			public_id: "",
			image_url: ""
		};

		try {
			// validate if already exisit
			let query: QueryConfig = {
				text: `SELECT 1 FROM "${this.productTable}" WHERE barcode = $1 OR product_name = $2`,
				values: [barcode, product_name]
			}

			let result = await this.executeQuery(query);

			if (result.rows.length) return res.json({
				success: false,
				message: 'Product Already Exist',
			});

			// validate if the req.files has value then upload the image
			if (req.files && req.files['file']) {
				// @ts-ignore
				let uploaded = await imageUploader.uploadImage(req.files['file'])
				image.public_id = uploaded.public_id;
				image.image_url = uploaded.secure_url
			}

			// after the image successfully added then the rest is saved
			query = {
				text: `INSERT INTO "${this.productTable}" 
				(barcode, product_name, quantity, quantity_max, quantity_min, price, description, brand_id, supplier_id, category_id, image, image_url)
					VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING product_id`,
				values: [
					barcode,
					product_name,
					quantity,
					quantity_max,
					quantity_min,
					price,
					description,
					brand_id,
					supplier_id,
					category_id,
					image.public_id,
					image.image_url
				]
			};

			result = await this.executeQuery(query);

			return res.json({
				success: true,
				message: 'Product Successfully Added',
				data: result.rows[0]
			});
		} catch (err) {
			console.log(req.body);
			console.log('Database error', err.stack);
		}
	}

	public async updateProduct(req: Request, res: Response): Promise<any> {
		const {
			barcode,
			product_name,
			quantity,
			quantity_max,
			quantity_min,
			price,
			description,
			brand_id,
			supplier_id,
			category_id,
			product_id,
			image,
			image_url
		}: IProduct = req.body;

		let updateImage = {
			public_id: image,
			image_url: image_url
		};

		try {
			if (req.files && req.files['file']) {
				await imageUploader.deleteImage(image!)

				// @ts-ignore
				let uploaded = await imageUploader.uploadImage(req.files['file'])
				updateImage.public_id = uploaded.public_id;
				updateImage.image_url = uploaded.secure_url
			}

			const query: QueryConfig = {
				text: `UPDATE "${this.productTable}" SET 
							barcode=$1, product_name=$2, quantity=$3, quantity_max=$4, quantity_min=$5, price=$6, 
							description=$7, brand_id=$8, supplier_id=$9, category_id=$10, image=$11, image_url=$12 WHERE product_id=$13`,
				values: [
					barcode,
					product_name,
					quantity,
					quantity_max,
					quantity_min,
					price,
					description,
					brand_id,
					supplier_id,
					category_id,
					updateImage.public_id,
					updateImage.image_url,
					product_id
				]
			};

			const result = await this.executeQuery(query);
			console.log('Process');
			res.json({
				success: true,
				message: 'Product Successfuly Updated',
				data: result
			});
		} catch (err) {
			console.error(err.stack);
		}
	}

	public async deleteProduct(req: Request, res: Response): Promise<any> {
		const { product_id, image } = req.body;

		try {
			const query: QueryConfig = {
				text: `DELETE FROM "${this.productTable}" WHERE product_id = $1`,
				values: [product_id]
			};

			if (image) imageUploader.deleteImage(image);

			const result = await this.executeQuery(query);
			return res.json({
				success: true,
				message: 'Successfully Deleted',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

}

export default ProductController;
