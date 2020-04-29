import QueryExtend from "../extends/QueryExtend";
import { ISupplier, IFilter } from "../interfaces";
import { QueryConfig } from "pg";

export default class SupplierModel extends QueryExtend {
    async findOne(column: object, condition?: string) {

        const query: QueryConfig = {
            text: `SELECT * FROM ${this.supplierTable} WHERE ${this.analyzeCondition(column, condition)} LIMIT 1`,
        };
        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async findMany({ search, limit, offset }: IFilter): Promise<ISupplier[]> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.supplierTable}
            ${this.analyzeFilter('supplier_name', { search })}
            ${this.limitRows({ limit, offset })}`
        };
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async create({ supplier_name, email_address, company_address, cp_no, tel_no, fax, website, description }: ISupplier): Promise<ISupplier['supplier_id']> {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.supplierTable}
            (supplier_name, email_address, company_address, cp_no, tel_no, fax, website, description) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING supplier_id`,
            values: [
                supplier_name,
                email_address,
                company_address,
                cp_no,
                tel_no,
                fax,
                website,
                description
            ]
        };
        const result = await this.executeQuery(query);
        return result.rows[0].supplier_id
    }

    async update(id: ISupplier['supplier_id'], { supplier_name, email_address, company_address, cp_no, tel_no, fax, website, description }: ISupplier): Promise<ISupplier['supplier_id']> {
        const query: QueryConfig = {
            text: `UPDATE "${this.supplierTable}" 
			SET supplier_name=$1, email_address=$2, company_address=$3, cp_no = $4, tel_no = $5, 
			fax = $6, website = $7, description = $8 WHERE supplier_id = $9`,
            values: [
                supplier_name,
                email_address,
                company_address,
                cp_no,
                tel_no,
                fax,
                website,
                description,
                id
            ]
        };

        const result = await this.executeQuery(query);
        return id
    }

    async delete(id: ISupplier['supplier_id']): Promise<ISupplier['supplier_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.supplierTable} WHERE supplier_id = $1`,
            values: [id]
        };

        const result = await this.executeQuery(query);
        return id
    }

}