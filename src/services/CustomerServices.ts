import { IFilter, ICustomer } from "../interfaces";
import CustomerModel from "../model/CustomerModel";

const customerModel = new CustomerModel;
export default class CustomerServices {

    async getMany(filter: IFilter) {
        const result = await customerModel.findMany(filter);
        const count = await customerModel.count(filter);
        return {
            message: 'Customers Successfully Fetched',
            data: result,
            count
        }
    }

    async getOne(customer_id: ICustomer['customer_id']) {
        const result = await customerModel.findOne({ customer_id });
        return {
            message: 'Customer Successfully Fetched',
            data: result
        }
    }

    async create(customer: ICustomer) {
        const result = await customerModel.create(customer);
        return {
            message: 'Customer Successfully Added',
            data: result
        }
    }

    async update(customer: ICustomer) {
        const result = await customerModel.update(customer.customer_id, customer);
        return {
            message: 'Customers Successfully Updated',
            data: result
        }
    }

    async remove(id: ICustomer['customer_id']) {
        const result = await customerModel.remove(id);
        return {
            message: 'Customers Successfully Removed',
            data: result
        }
    }

    async delete(id: ICustomer['customer_id']) {
        const result = await customerModel.delete(id);
        return {
            message: 'Customers Successfully Deleted adminly',
        }
    }
}