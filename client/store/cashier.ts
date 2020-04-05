import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import ICustomer from '~/interfaces/ICustomer';
import IOrder from '~/interfaces/IOrder';
import { ADD_ORDER, UPDATE_ORDER, REMOVE_ORDER, CALCULATION } from '~/configs/types';

interface ICalculation {
    grandTotal: number;
    netPrice: number;
    taxTotal: number;
}

@Module({
    name: 'cashier',
    namespaced: true
})
export default class Cashier extends VuexModule {
    customer: ICustomer | undefined;
    orders: Array<IOrder> = []
    net_price: number = 0.00;
    tax_total: number = 0.00;
    grand_total: number = 0.00;
    customer_id: number | undefined;
    staff_id: number | undefined;

    get getOrders() {
        return this.orders;
    }

    get getCalculation() {
        return {
            net_price: this.net_price,
            tax_total: this.tax_total,
            grand_total: this.grand_total
        }
    }


    @Mutation
    private [ADD_ORDER](orders: IOrder) {
        this.orders = [...this.orders, orders];
    }

    @Mutation
    private [UPDATE_ORDER](orders: IOrder) {
        if (!this.orders.length) return;
        this.orders = this.orders.map(item => item.product_id === orders.product_id ? orders : item)
    }

    @Mutation
    private [REMOVE_ORDER](product_id: number) {
        this.orders = this.orders.filter((item) => item.product_id !== product_id)

    }

    @Mutation
    private [CALCULATION]({ netPrice, taxTotal, grandTotal }: ICalculation) {
        this.net_price = netPrice;
        this.tax_total = taxTotal;
        this.grand_total = grandTotal

    }


    @Action
    addOrder(order: IOrder) {
        this.calculate();
        const index = this.orders.map(item => item.product_id).indexOf(order.product_id)
        if (index != -1) {
            order.quantity = this.orders[index].quantity + 1;
            this.context.commit(UPDATE_ORDER, order);
        } else {
            this.context.commit(ADD_ORDER, order);
        }

        this.calculate();
    }

    @Action
    updateOrder(order: IOrder) {
        this.calculate();
        if (order.quantity <= 0) return this.context.commit(REMOVE_ORDER, order.product_id)


        return this.context.commit(UPDATE_ORDER, order);
    }

    @Action({ commit: REMOVE_ORDER })
    removeOrder(product_id: number) {
        this.calculate();
        return product_id
    }

    @Action({ commit: CALCULATION })
    calculate() {
        let netPrice = 0.0;
        let taxTotal = 0.0;
        let grandTotal = 0.0;
        this.orders.forEach(item => {
            netPrice += item.quantity * item.price;
        })

        taxTotal = (netPrice * .12);
        grandTotal = netPrice + taxTotal;

        return { netPrice, taxTotal, grandTotal }
    }


}