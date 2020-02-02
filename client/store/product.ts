import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators"

@Module({
    name: 'product',
    namespaced: true,
})
export default class Product extends VuexModule {
    // states
    private products: Array<Object> = [{
        productName: "Bear Brand 80g Chocolate",
        barcode: "5646541231231487",
        price: 13.5,
        quantity: 50,
        supplierName: "Bear Brand Corp."
    },
    {
        productName: "Hansel Chocolate",
        barcode: "7895541231231487",
        price: 5.35,
        quantity: 100,
        supplierName: "Rebisco Corp."
    },
    {
        productName: "Fudge Bar Chocolate",
        barcode: "15845541231231487",
        price: 6,
        quantity: 120,
        supplierName: "Rebisco Corp."
    },
    {
        productName: "Joy Diswashing Liquid 25ml",
        barcode: "58845541231231487",
        price: 12,
        quantity: 100,
        supplierName: "Joy Corp."
    }]

    private addonItems: Object = {
        brand: ["nestle", "rebisco", "febisco", "palmovile"],
        supplier: ["Beth Corp", "Nestle Corp"],
        category: ["Biscuit", "Dishwasing", "Etc."]
    };


    //getters
    get getProduct() {
        return this.products
    }

    get getAddonItems() {
        return this.addonItems
    }

    @Mutation
    public ADD_NEW_PRODUCT(product: Object): void {
        this.products.unshift(product);
    }

    //
    @Action
    public addProduct(product: Object): void {
        this.context.commit("ADD_NEW_PRODUCT", product);
    }

}

