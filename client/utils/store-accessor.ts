import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import product from '~/store/product'

let productStore: product

function initialiseStores(store: Store<any>): void {
    productStore = getModule(product, store)
}

export {
    initialiseStores,
    productStore,
}