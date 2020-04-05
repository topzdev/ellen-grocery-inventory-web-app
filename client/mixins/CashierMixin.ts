import { Component, Vue } from 'vue-property-decorator';
import { IFrontendModule, frontendStore, ICashierModule, cashierStore, IProductModule, productStore } from '~/store';


@Component
export default class CashierMixin extends Vue {

    frontendStore: IFrontendModule;
    cashierStore: ICashierModule;
    productStore: IProductModule;

    constructor() {
        super()
        this.cashierStore = cashierStore;
        this.frontendStore = frontendStore;
        this.productStore = productStore;
    }

    get orders() {
        return cashierStore.getOrders;
    }

    get calculations() {
        return this.cashierStore.getCalculation;
    }

    get paymentTrayState() {
        return this.frontendStore.getPaymentTrayState;
    }

    set paymentTrayState(show) {
        this.frontendStore.setPaymentTray(show);
    }

    openPaymentTray(show: boolean) {
        this.frontendStore.setPaymentTray(show);
    }
}