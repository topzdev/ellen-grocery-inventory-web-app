import VuexPersistence from 'vuex-persist'

export default ({ store }: any) => {
    // @ts-ignore;
    window.onNuxtReady(() => {
        new VuexPersistence({
            /* your options */
        }).plugin(store);
    });
}