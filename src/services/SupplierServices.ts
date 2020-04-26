import { ISupplier, IFilter } from "../interfaces";
import SupplierModel from "../model/SupplierModel";

const supplierModel = new SupplierModel;
export default class SupplierServices {

    async getSupplier(id: ISupplier['supplier_id']) {
        const result = await supplierModel.findOne({ supplier_id: id });

        return {
            message: 'Supplier Successfully fetched',
            data: result
        }
    }

    async getSuppliers(filter: IFilter) {
        const result = await supplierModel.findMany(filter);

        return {
            message: "Suppliers Successfuly Fetched",
            data: result
        }
    }

    async createSupplier(supplier: ISupplier) {
        const { supplier_name } = supplier;
        const exist = await supplierModel.findOne({ supplier_name });

        if (exist) return {
            success: false,
            message: 'Supplier name is already exist'
        }

        const result = await supplierModel.create(supplier);

        return {
            message: "Supplier Successfully Added",
            data: result
        }
    }

    async updateSupplier(supplier: ISupplier) {
        const { supplier_name } = supplier;
        const exist = await supplierModel.findOne({ supplier_name });

        console.log(supplier, 'Services', exist)
        if (exist) return {
            success: false,
            message: 'Supplier name is already exist'
        }


        const result = await supplierModel.update(supplier.supplier_id, supplier)

        return {
            message: "Supplier Successfully Updated ",
            data: result
        }

    }

    async deleteSupplier(supplier_id: ISupplier['supplier_id']) {
        const result = await supplierModel.delete(supplier_id);

        return {
            message: "Supplier Successfully Deleted",
            data: result
        }
    }
}