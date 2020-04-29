
import { VuexModule, Module, Mutation, Action, MutationAction } from 'vuex-module-decorators'
import ICustomer from '~/interfaces/ICustomer';
import IOrder from '~/interfaces/IOrder';
import { SET_TRANSACTION_STARTED, CALCULATION, SET_ACCOUNTS, SET_CASHIER_ACCOUNT, SET_CASHIER_CUSTOMER, SET_ORDERS, SET_CLEAR, ADD_HOLD, RETRIEVE_HOLD, REMOVE_HOLD } from '~/configs/types';
import IAccount from '~/interfaces/IAccount';
import { transactionStore } from '~/utils/store-accessor';
import { IHoldTransact } from '~/interfaces';

interface ICalculation {
    grandTotal: number;
    netPrice: number;
    taxTotal: number;
    quantityTotal: number;
}

@Module({
    name: 'cashier',
    namespaced: true,
})
export default class Cashier extends VuexModule {
    orders: Array<IOrder> = [];
    net_price: number = 0.00;
    tax_total: number = 0.00;
    total_amount: number = 0.00;
    quantity_total: number = 0;
    transaction_started: string = null;
    hold: IHoldTransact[] = []
    account: IAccount = {
        account_id: 1,
        fullname: "John Doe"
    };
    customer: ICustomer = null;


    get getOrders() {
        return this.orders;
    }

    get getCalculation() {
        return {
            net_price: this.net_price,
            tax_total: this.tax_total,
            total_amount: this.total_amount,
            quantity_total: this.quantity_total
        }
    }

    get getCustomer() {
        return this.customer;
    }

    @Mutation
    private [ADD_HOLD](hold: IHoldTransact) {
        this.hold = [...this.hold, hold]
    }

    @Mutation
    private [RETRIEVE_HOLD](index: number) {
        const { transaction_started, account, customer, orders } = this.hold[index];
        this.transaction_started = transaction_started;
        this.account = account;
        this.customer = customer;
        this.orders = orders;
    }

    @Mutation
    private [REMOVE_HOLD](index: number) {
        this.hold = this.hold.filter((item, idx) => idx != index);
    }

    @Mutation
    private [SET_ORDERS](orders: Array<IOrder>) {
        this.orders = orders;
    }

    @Mutation
    private [CALCULATION]({ netPrice, taxTotal, grandTotal, quantityTotal }: ICalculation) {
        this.net_price = netPrice;
        this.tax_total = taxTotal;
        this.total_amount = grandTotal
        this.quantity_total = quantityTotal;
    }

    @Mutation
    private [SET_CLEAR]() {
        this.net_price = 0.00;
        this.tax_total = 0.00;
        this.total_amount = 0.00;
        this.quantity_total = 0;
        this.transaction_started = null;
        this.customer = null;
        this.orders = [];
    }

    @Mutation
    private [SET_CASHIER_ACCOUNT](account: IAccount) {
        this.account = account;
    }

    @Mutation
    private [SET_CASHIER_CUSTOMER](customer: ICustomer) {
        this.customer = customer;
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
        let netPrice = 0.0, taxTotal = 0.0, grandTotal = 0.0, quantityTotal = 0;

        orders.forEach(item => {
            quantityTotal += item.quantity;
            netPrice += item.quantity * item.price;
        })

        taxTotal = (netPrice * .12);
        grandTotal = netPrice + taxTotal;

        return { netPrice, taxTotal, grandTotal, quantityTotal }
    }

    @Action({ commit: SET_CLEAR })
    setClear() {
        return;
    }

    @Action({ rawError: true })
    finishTransaction({ amount_paid }: { amount_paid: number }) {
        console.log(this.transaction_started, this.orders)

        transactionStore.addTransaction({
            account_id: this.account.account_id,
            customer_id: this.customer?.customer_id,
            customer_name: this.customer.fullname,
            started_at: this.transaction_started,
            ended_at: new Date().toISOString(),
            total_amount: this.total_amount,
            account_name: this.account.fullname,
            amount_paid,
            orders: this.orders
        });

        // @ts-ignore
        $nuxt.$router.push('/cashiers');
        // this.setClear();
        this.context.commit(SET_CLEAR)
    }

    @Action
    addHold() {
        this.context.commit(ADD_HOLD, {
            orders: this.orders,
            account: this.account,
            customer: this.customer,
            quantity_count: this.quantity_total,
            total_amount: this.total_amount,
            transaction_started: this.transaction_started,
            holded_at: new Date().toISOString(),
        });
        this.context.commit(SET_CLEAR);
        // @ts-ignore
        $nuxt.$router.push('/cashiers');
    }

    @Action
    retriveHold(index: number) {
        this.context.commit(RETRIEVE_HOLD, index);
        this.context.commit(REMOVE_HOLD, index);
        this.context.commit(CALCULATION, this.orders);
        // @ts-ignore
        $nuxt.$router.push('/cashiers/main');
    }

    @Action
    removeHold(index: number) {
        this.context.commit(REMOVE_HOLD, index);
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
        return new Date().toISOString();
    }

    @Action
    cancelTransaction() {
        this.context.commit(SET_CLEAR)
    }

}