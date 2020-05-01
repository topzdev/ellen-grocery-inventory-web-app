import { Component } from "vue-property-decorator";
import ProductTable from "@/components/tables/ProductTable.vue";
import ProductList from "@/components/product/ProductList.vue";
import { productStore, frontendStore } from '~/store';
import PaginationMixin from './PaginationMixin';

@Component({
    components: {
        ProductTable,
        ProductList
    }
})
export default class ProductViewMixin extends PaginationMixin {
    page = 1;
    search: string = ""
    views = [{
        icon: "mdi-view-headline",
        value: "table"
    }, {
        icon: 'mdi-view-grid',
        value: 'list'
    }];


    get selected() {
        return frontendStore.productViewMode;
    }

    set selected(mode: string) {
        frontendStore.setProductView(mode);
    }

    get count() {
        return productStore.count
    }

    get length() {
        return Math.ceil(this.count / this.parseRow) || 0
    }

    searchProduct() {
        let self = this;
        productStore.fetchProducts({
            search: this.search,
            show_deleted: false,
            limit: this.row,
            offset: this.parseRow * (this.page - 1)
        });
    }

    created() {
        this.searchProduct();
    }
}


