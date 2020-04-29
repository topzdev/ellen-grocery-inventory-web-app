import VuexPersistence from 'vuex-persist'

export default ({ store }: any) => {
    // @ts-ignore;
    window.onNuxtReady(() => {
        new VuexPersistence({
            modules: ['cashier']
        }).plugin(store);
    });
}