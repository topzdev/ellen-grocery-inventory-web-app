import { Component, Vue } from 'vue-property-decorator';
import { processStore, frontendStore, productStore } from '~/store';
import { IProduct } from '~/interfaces';

@Component
export default class ProductCRUD extends Vue {

    manageItem(item: IProduct) {
        processStore.setCurrentProduct(item);
        this.$router.push("products/product_manage");
    }

    deleteItem(item: IProduct) {
        frontendStore.setMessageModal({
            title: 'Delete Product',
            show: true,
            message: `Are you sure to delete this product ${item.product_name}?`,
            mode: 'question',
            yesFunction: () => {
                productStore.deleteProduct(item.product_id)
            }
        })
    }

} 