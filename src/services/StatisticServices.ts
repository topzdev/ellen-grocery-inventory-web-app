import StatisticModel from "../model/StatisticModel"
import { IFilter } from "../interfaces";

const statisticModel = new StatisticModel;

export default class StatisticServices {

    async overall() {
        const sales = await this.salesOverall();
        const count = await this.countOverall();
        const status = await this.productStatusOverall()

        return {
            message: 'Sales Overall',
            data: {
                sales: sales.data,
                count: count.data,
                status: status.data
            }
        };
    }

    async salesOverall() {
        const result = {
            this_month: await statisticModel.salesByInterval({ interval: 'this_month' }),
            last_month: await statisticModel.salesByInterval({ interval: 'last_month' }),
            this_year: await statisticModel.salesByInterval({ interval: 'this_year' }),
            last_year: await statisticModel.salesByInterval({ interval: 'last_year' }),
        }
        return {
            message: 'Sales Overall',
            data: result
        };
    }

    async countOverall() {
        const result = {
            product: await statisticModel.productCount(""),
            transaction: await statisticModel.transactionCount(""),
            customer: await statisticModel.customerCount(""),
        }

        return {
            message: 'Count Overall',
            data: result
        };
    }

    async productStatusOverall() {
        const result = {
            out_of_stock: await statisticModel.productCountByStatus('out_of_stock'),
            critical: await statisticModel.productCountByStatus('critical')
        }
        return {
            message: 'Product Count By Status',
            data: result
        };
    }

    async productListByStatus({ status, limit }: IFilter) {
        const result = await statisticModel.productListByStatus({ status, limit })
        return {
            message: 'Product List By Status',
            data: result
        };
    }

    async customerListByInterval({ interval }: IFilter) {
        const result = await statisticModel.customerListByInterval({ interval });
        return {
            message: 'Customer List By Interval',
            data: result
        };
    }

    async transactionListByInterval({ interval }: IFilter) {
        const result = await statisticModel.transactionListByInterval({ interval });
        return {
            message: 'Transaction List By Interval',
            data: result
        };
    }
} 