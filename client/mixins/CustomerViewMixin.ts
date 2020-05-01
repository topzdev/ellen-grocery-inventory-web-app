import { Vue, Component, Watch } from "vue-property-decorator";
import CustomerTable from "@/components/tables/CustomerTable.vue";
import { customerStore, frontendStore } from '~/store';
import PaginationMixin from './PaginationMixin';
import { ICustomer } from '~/interfaces';

@Component({
    components: { CustomerTable }
})
export default class CustomerViewMixin extends PaginationMixin {
    page = 1;
    search: string = ""

    get count() {
        return this.search ? customerStore.customers.length : customerStore.count
    }

    get length() {
        return Math.ceil(this.count / this.parseRow) || 0
    }

    fetchCustomer() {
        customerStore.fetchCustomers({
            search: this.search,
            show_deleted: false,
            transact_count: true,
            last_transact: true,
            limit: this.row,
            offset: this.parseRow * (this.page - 1)
        });
    }

    created() {
        this.fetchCustomer();
    }
}


