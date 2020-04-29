import VuexPersistence from 'vuex-persist'
import { initialiseStores } from "~/utils/store-accessor";
import { IRootState } from "~/interfaces";
import { Store } from "vuex";


export function getPlugins() {
    let plugins = []

    if (process.browser) {
        const vuexLocal = new VuexPersistence<IRootState>({
            storage: window.localStorage,
        })

        plugins.push(vuexLocal.plugin)
    }

    const initializer = (store: Store<any>) => initialiseStores(store);
    plugins.push(initializer);

    return plugins;
}