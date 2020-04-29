import { ISettings } from "../interfaces";
import SettingModel from "../model/SettingsModel";

const settingsModel = new SettingModel;

export default class SettingsServices {

    async update(settings: ISettings) {
        const result = await settingsModel.update(settings);

        return {
            message: 'Settings Updated Successfully'
        }
    }

}