import { IBrand, IFilter } from "../interfaces";
import BrandModel from "../model/BrandModel";

const brandModel = new BrandModel;

export default class BrandServices {

    async getOne(id: IBrand['brand_id']) {
        const result = await brandModel.findOne({ brand_id: id })

        return {
            message: 'Fetched Single Brand Successfully ',
            data: result
        }
    }

    async getMany(filter: IFilter) {
        const result = await brandModel.findMany(filter);

        return {
            message: 'Supplier Successfully Updated ',
            data: result
        }
    }

    async create(brand: IBrand) {
        const isExist = await brandModel.findOne({ brand_name: brand.brand_name })

        console.log(brand, isExist)

        if (isExist) return {
            success: false,
            message: 'Brand name is already exist'
        }

        const result = await brandModel.create(brand)

        return {
            message: 'Brand Successfully Added ',
            data: result
        }
    }

    async update({ brand_id, brand_name }: IBrand) {
        const isExist = await brandModel.findOne({ brand_name });
        console.log(brand_id, brand_name, isExist)

        if (isExist) return {
            success: false,
            message: 'Brand name is already exist'
        }

        const result = await brandModel.update(brand_id, { brand_name })

        return {
            message: 'Brand Successfully Updated',
            data: result
        }
    }

    async delete(id: IBrand['brand_id']) {

        const result = await brandModel.delete(id);

        return {
            message: 'Brand Successfully Deleted',
            data: result
        }
    }
}