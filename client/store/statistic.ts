import { Module, Action, Mutation, VuexModule } from 'vuex-module-decorators'
import StatisticAPI from '@/api/Statistic'
import { IFilter } from '~/interfaces';
import { STATS_SALES, STATS_COUNT, STATS_PRODUCT, STATS_PRODUCTS_STATUS, STATS_TRANSACT_INTERVAL, STATS_CUSTOMER_INTERVAL } from '~/configs/types';

const statisticAPI = new StatisticAPI;

interface ISales {
    sum: number,
    count: string
}


interface ISalesReport {
    this_month?: ISales;
    last_month?: ISales;
    this_year?: ISales;
    last_year?: ISales;
}

interface IProductStatus {
    out_of_stock?: any;
    critical?: any
}

interface IStatsCount {
    product?: any,
    transaction?: any
    customer?: any
}

interface ICustomersByInterval {
    spend: number | string
    fullname: string,
    customer_id: number
}

interface IProductsByStatus {
    product_name: string,
    quantity: number,
    quantity_max: number,
    quantity_min: number,
    barcode: string
}

interface ITransactByInterval {
    transact_id: number,
    customer_name: string
    total_amount: number,
    amount_paid: number,
    created_at: string
    points: number,
}

@Module({ name: 'statistic', namespaced: true, stateFactory: true })
export default class statistic extends VuexModule {
    sales: ISalesReport = null;
    count: IStatsCount = null;
    productStatus: IProductStatus = null;
    productListByStatus: IProductsByStatus[] = null
    customerListByInterval: ICustomersByInterval[] = null
    transListByInterval: ITransactByInterval[] = null

    @Mutation
    [STATS_SALES](sales: ISalesReport) {
        this.sales = sales;
    }

    @Mutation
    [STATS_COUNT](count: IStatsCount) {
        this.count = count;
    }

    @Mutation
    [STATS_PRODUCT](status: IProductStatus) {
        this.productStatus = status;
    }

    @Mutation
    [STATS_PRODUCTS_STATUS](list: IProductsByStatus[]) {
        this.productListByStatus = list;
    }

    @Mutation
    [STATS_TRANSACT_INTERVAL](list: ITransactByInterval[]) {
        this.transListByInterval = list;
    }

    @Mutation
    [STATS_CUSTOMER_INTERVAL](list: ICustomersByInterval[]) {
        this.customerListByInterval = list;
    }


    @Action
    async getOverall() {
        const result = await statisticAPI.getOverall();
        this.context.commit(STATS_SALES, result.data.sales)
        this.context.commit(STATS_COUNT, result.data.count)
        this.context.commit(STATS_PRODUCT, result.data.status)
    }

    @Action
    async getCountOverall() {
        const result = await statisticAPI.getCount();
        this.context.commit(STATS_COUNT, result.data)
    }

    @Action
    async getProductStatus() {
        const result = await statisticAPI.getProductStatus();
        this.context.commit(STATS_PRODUCT, result.data)
    }

    @Action
    async getSales() {
        const result = await statisticAPI.getSales();
        this.context.commit(STATS_SALES, result.data)
    }

    @Action
    async getProductsByStatus({ limit, status }: IFilter) {
        const result = await statisticAPI.getProductListByStatus({ limit, status });
        this.context.commit(STATS_PRODUCTS_STATUS, result.data);
    }

    @Action
    async getCustomersByInterval({ limit, interval }: IFilter) {
        const result = await statisticAPI.getCustomerListByInterval({ limit, interval });
        this.context.commit(STATS_CUSTOMER_INTERVAL, result.data);
    }

    @Action
    async getTransactByInterval({ limit, interval }: IFilter) {
        const result = await statisticAPI.getTransactionListByInterval({ limit, interval });
        this.context.commit(STATS_TRANSACT_INTERVAL, result.data);
    }
}