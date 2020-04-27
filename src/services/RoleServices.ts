import { IFilter, IRole } from "../interfaces";
import RoleModel from "../model/RoleModel";

const roleModel = new RoleModel;
export default class RoleServices {

    async getMany(filter: IFilter) {
        const result = await roleModel.findMany(filter);
        return {
            message: 'Roles Successfully Fetched',
            data: result
        }
    }

    async getOne(id: IRole['role_id']) {
        const result = await roleModel.findOne({ role_id: id })
        return {
            message: 'Role Successfully Fetched',
            data: result
        }
    }

    async create(role: IRole) {
        const isExist = await roleModel.findOne({ role_name: role.role_name })

        if (isExist) return {
            success: false,
            message: 'Role Already Exist',
        }

        const result = await roleModel.create(role);

        return {
            message: 'Role Successfully Added',
            data: result
        }
    }

    async update(role: IRole) {
        const isExist = await roleModel.findOne({ role_name: role.role_name })
        if (isExist) return {
            success: false,
            message: 'Role Already Exist',
        }
        const result = await roleModel.update(role.role_id, role);
        return {
            message: 'Role Successfully Updated',
            data: result
        }
    }

    async delete(id: IRole['role_id']) {
        const result = await roleModel.delete(id);
        return {
            message: 'Role Successfully Deleted',
            data: result
        }
    }
}