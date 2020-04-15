import { Component, Vue, Watch } from 'vue-property-decorator';
import {
    IFrontendModule, frontendStore, ICashierModule, customerStore, ICustomerModule,
    cashierStore, IProductModule, productStore, transactionStore, ITransactionModule
} from '~/store';
import dayjs from 'dayjs';

@Component
export default class CashierMixin extends Vue {
    dateTime: string = "";
    frontendStore: IFrontendModule;
    cashierStore: ICashierModule;
    productStore: IProductModule;
    transactionStore: ITransactionModule;
    customerStore: ICustomerModule

    constructor() {
        super()
        this.cashierStore = cashierStore;
        this.frontendStore = frontendStore;
        this.productStore = productStore;
        this.transactionStore = transactionStore
        this.customerStore = customerStore;
    }

    get orders() {
        return cashierStore.getOrders;
    }

    get calculations() {
        return this.cashierStore.getCalculation;
    }

    get transactions() {
        return this.transactionStore.getTransactions
    }

    get customers() {
        return this.customerStore.getCustomers
    }

    initPage() {
        this.$router.push('/cashiers');
    }

    mainPage() {
        this.$router.push('/cashiers/main');
    }

    paymentPage() {
        this.$router.push('/cashiers/payment');
    }


    get paymentTrayState() {
        return this.frontendStore.getPaymentTrayState;
    }

    set paymentTrayState(show) {
        this.frontendStore.setPaymentTray(show);
    }

    openCustomerModal(show: boolean) {
        this.frontendStore.setCustomerModal(show);
    }

    openPaymentTray(show: boolean) {
        this.frontendStore.setPaymentTray(show);
    }

    realtime() {
        this.dateTime = dayjs().format('dddd, MMMM DD, YYYY h:mm:ss A')
    }

    created() {
        setInterval(this.realtime, 1000);
    }


}