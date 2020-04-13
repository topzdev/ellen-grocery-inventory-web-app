
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'
import ICustomer from '~/interfaces/ICustomer';
import IOrder from '~/interfaces/IOrder';
import { SET_TRANSACTION_STARTED, CALCULATION, SET_ACCOUNTS, SET_CASHIER_ACCOUNT, SET_CASHIER_CUSTOMER, SET_ORDERS } from '~/configs/types';
import IAccount from '~/interfaces/IAccount';;

interface ICalculation {
    grandTotal: number;
    netPrice: number;
    taxTotal: number;
}

@Module({
    name: 'cashier',
    namespaced: true,
})
export default class Cashier extends VuexModule {
    account: IAccount | undefined = undefined;
    customer: ICustomer | undefined = undefined;
    orders: Array<IOrder> = [];
    net_price: number = 0.00;
    tax_total: number = 0.00;
    grand_total: number = 0.00;
    transaction_started: string | undefined = undefined;

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

    get getCustomer() {
        return this.customer;
    }

    get getTransactionStarted() {
        return this.transaction_started;
    }


    @Mutation
    private [SET_ORDERS](orders: Array<IOrder>) {
        this.orders = orders;
        localStorage.setItem('ellen-cashier-orders', JSON.stringify(this.orders))
    }

    @Mutation
    private [CALCULATION]({ netPrice, taxTotal, grandTotal }: ICalculation) {
        this.net_price = netPrice;
        this.tax_total = taxTotal;
        this.grand_total = grandTotal
    }

    @Mutation
    private [SET_CASHIER_ACCOUNT](account: IAccount) {
        this.account = account;
        localStorage.setItem('ellen-cashier-customer', JSON.stringify(account));
    }

    @Mutation
    private [SET_CASHIER_CUSTOMER](customer: ICustomer) {
        this.customer = customer;
        localStorage.setItem('ellen-cashier-customer', JSON.stringify(customer));
    }

    @Mutation
    private [SET_TRANSACTION_STARTED](time: string) {
        this.transaction_started = time;
    }

    @Action
    addOrder(order: IOrder) {

        const index = this.orders.map(item => item.product_id).indexOf(order.product_id)

        if (index != -1) {
            order.quantity = this.orders[index].quantity + 1;

            this.updateOrder(order);

        } else {
            let newOrders = [...this.orders, order];

            this.calculate(newOrders);

            this.context.commit(SET_ORDERS, newOrders);
        }
    }

    @Action
    updateOrder(order: IOrder) {
        if (order.quantity <= 0) return this.removeOrder(order.product_id);

        let newOrders = this.orders.map(item => item.product_id === order.product_id ? order : item);

        this.calculate(newOrders);

        return this.context.commit(SET_ORDERS, newOrders);
    }

    @Action
    removeOrder(product_id: number | undefined) {

        let newOrders = this.orders.filter((item) => item.product_id !== product_id)

        this.calculate(newOrders);

        return this.context.commit(SET_ORDERS, newOrders);
    }

    @Action({ commit: CALCULATION })
    calculate(orders: Array<IOrder>) {
        let netPrice = 0.0, taxTotal = 0.0, grandTotal = 0.0;

        orders.forEach(item => {
            netPrice += item.quantity * item.price;
        })

        taxTotal = (netPrice * .12);
        grandTotal = netPrice + taxTotal;

        return { netPrice, taxTotal, grandTotal }
    }

    @Action({ commit: SET_CASHIER_ACCOUNT })
    setAccount(account: IAccount) {
        return account;
    }

    @Action({ commit: SET_CASHIER_CUSTOMER })
    setCustomer(customer: ICustomer) {
        return customer;
    }

    @Action({ commit: SET_TRANSACTION_STARTED })
    startTransaction() {
        return Date.now();
    }

}