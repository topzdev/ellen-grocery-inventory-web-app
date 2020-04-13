import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, IResult, ICategory } from '~/interfaces';

export default class Category {
    private url: string = "/api/category";

    async fetchCategories(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result.data;
    }

    async addCategory(category: ICategory) {
        const result: IResult = await $axios.$post(this.url, category, config);
        return result;
    }

    async updateCategory(category: ICategory) {
        const result: IResult = await $axios.$put(this.url, category, config);
        return result;
    }

    async deleteCategory(category_id: number) {
        const result: IResult = await $axios.$delete(`${this.url}/${category_id}`);
        return result
    }
}