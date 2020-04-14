import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, IResult, IBrand } from '~/interfaces';

export default class BrandAPI {
    private url: string = "/api/brand";

    async fetchBrands(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result;
    }

    async addBrand(brand_name: IBrand['brand_name']) {
        const result: IResult = await $axios.$post(this.url, { brand_name }, config);
        return result;
    }

    async updateBrand(brand: IBrand) {
        const result: IResult = await $axios.$put(this.url, brand, config);
        return result;
    }

    async deleteBrand(brand_id: IBrand['brand_id']) {
        const result: IResult = await $axios.$delete(`${this.url}/${brand_id}`);
        return result;
    }
}