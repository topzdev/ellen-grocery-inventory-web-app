import CategoryModel from "../model/CategoryModel";
import { IFilter, ICategory } from "../interfaces";

const categoryModel = new CategoryModel;

export default class CategoryServices {

    async getOne(id: ICategory['category_id']) {
        const result = await categoryModel.findOne({ category_id: id })
        return {
            message: 'Single Category Successfully Fetched',
            data: result
        }
    }

    async getMany(filter: IFilter) {
        const result = await categoryModel.findMany(filter)
        return {
            message: 'Categories Fetched Successfully ',
            data: result
        }
    }

    async create(category: ICategory) {
        const isExist = await categoryModel.findOne({ category_name: category.category_name })

        if (isExist) return {
            message: 'Category name is already exist',
            success: false,
        }

        const result = await categoryModel.create(category)
        return {
            message: 'Category Successfully Added',
            data: result
        }
    }

    async update(category: ICategory) {
        const isExist = await categoryModel.findOne({ category_name: category.category_name })

        if (isExist) return {
            message: 'Category name is already exist',
            success: false,
        }

        const result = await categoryModel.update(category)
        return {
            message: 'Category Successfully Updated',
            data: result
        }
    }

    async delete(id: ICategory['category_id']) {
        const result = await categoryModel.delete(id)
        return {
            message: 'Category Successfully Delete',
            data: result
        }
    }

}