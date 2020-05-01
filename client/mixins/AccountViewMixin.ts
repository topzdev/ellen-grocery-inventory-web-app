import { Component } from "vue-property-decorator";
import AccountTable from "@/components/tables/AccountTable.vue";
import { accountStore } from '~/store';
import PaginationMixin from './PaginationMixin';

@Component({
    components: {
        AccountTable,
    }
})
export default class AccountViewMixin extends PaginationMixin {
    page = 1;
    search: string = ""

    get count() {
        return this.search ? accountStore.accounts.length : accountStore.count
    }

    get length() {
        return Math.ceil(this.count / this.parseRow) || 0
    }

    fetchAccounts() {
        accountStore.fetchAccounts({
            search: this.search,
            show_deleted: false,
            limit: this.row,
            offset: this.parseRow * (this.page - 1)
        });
    }

    created() {
        this.fetchAccounts();
    }
}


