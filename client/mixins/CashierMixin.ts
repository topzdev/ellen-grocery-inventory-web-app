import { Component, Vue, Watch } from 'vue-property-decorator';
import { IFrontendModule, frontendStore, ICashierModule, cashierStore, IProductModule, productStore } from '~/store';
import dayjs from 'dayjs';

@Component
export default class CashierMixin extends Vue {
    dateTime: string = "";
    search: string = "";
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

    realtime() {
        this.dateTime = dayjs().format('MMMM DD, YYYY h:mm:ss')
    }

    created() {
        setInterval(this.realtime, 1000);
    }

    @Watch('search')
    searchProduct() {
        console.log(this.search)
        this.productStore.fetchProducts({ search: this.search })
    }
}