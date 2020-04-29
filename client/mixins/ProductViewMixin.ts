import { Vue, Component, Watch } from "vue-property-decorator";
import ProductTable from "@/components/tables/ProductTable.vue";
import ProductList from "@/components/product/ProductList.vue";
import { productStore, frontendStore } from '~/store';

@Component({
    components: {
        ProductTable,
        ProductList
    }
})
export default class ProductViewMixin extends Vue {
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

    @Watch("search")
    searchProduct() {
        productStore.fetchProducts({ search: this.search, show_deleted: false });
    }

    created() {
        this.searchProduct();
    }
}


