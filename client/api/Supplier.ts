import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, ISupplier, IResult } from '~/interfaces';

export default class Supplier {
    private url: string = "/api/supplier";

    async fetchSuppliers(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result;
    }

    async fetchSingleSupplier(supplier_id: ISupplier['supplier_id']) {
        const result: IResult = await $axios.$get(`${this.url}/${supplier_id}`, config);
        return result;
    }

    async addSupplier(supplier: ISupplier) {
        const result: IResult = await $axios.$post(this.url, supplier, config);
        return result;
    }

    async updateSupplier(supplier: ISupplier) {
        const result: IResult = await $axios.$put(this.url, supplier, config);
        return result;
    }

    async deleteSupplier(supplier_id: ISupplier['supplier_id']) {
        const result: IResult = await $axios.$delete(`${this.url}${supplier_id}`);
        return result;
    }
}