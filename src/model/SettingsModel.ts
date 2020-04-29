import QueryExtend from "../extends/QueryExtend";
import { ISettings } from "../interfaces";
import { QueryConfig } from "pg";

export default class SettingModel extends QueryExtend {

    async update(settings: ISettings) {
        const query: QueryConfig = {
            text: `UPDATE ${this.settingsTable} ${this.queryfields(settings, 'update')} WHERE id = 1`
        }
        const result = await this.executeQuery(query);
        return true;
    }

}