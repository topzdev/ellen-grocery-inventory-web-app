import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators'
import StatisticAPI from '@/api/Statistic'
import { IFilter } from '~/interfaces';
import { SET_SALES } from '~/configs/types';

const statisticAPI = new StatisticAPI;


interface ISalesReport {
    this_month?: any;
    last_month?: any;
    this_year?: any;
}


@Module({ name: 'statistic', namespaced: true, stateFactory: true })
export default class statistic extends VuexModule {
    sales: ISalesReport = null;



    @Action
    async getCustomer(filter: IFilter): Promise<any> {
        const result = await statisticAPI.getCustomer(filter);
        if (filter.count) return result.data[0]
        return result.data
    }

    @Action
    async getSales(filter: IFilter) {
        const result = await statisticAPI.getSales(filter);
        this.context.commit(SET_SALES, { sales: result.data[0], property: filter.timespan })
    }
}