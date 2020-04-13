import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, ISupplier } from '~/interfaces';

export default class Supplier {
    private url: string = "/api/supplier/";

    async fetchSuppliers(filter: IFilter) {
        const result = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result.data;
    }

    async addSupplier(supplier: ISupplier) {
        const result = await $axios.$post(this.url, supplier, config);
        return result;
    }

    async updateSupplier(supplier: ISupplier) {
        const result = await $axios.$put(this.url, supplier, config);
        return result;
    }

    async deleteSupplier(supplier_id: ISupplier['supplier_id']) {
        const result = await $axios.$delete(`${this.url}${supplier_id}`);
        return result;
    }
}