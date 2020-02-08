import express, { Response, Request, NextFunction, Express } from 'express';

class ProductInfo {
	public express: Express;

	constructor() {
		this.express = express();
	}
}

export default ProductInfo;
