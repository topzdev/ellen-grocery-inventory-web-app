import { Vue, Component } from 'vue-property-decorator'

@Component
export default class ContainerSizeMixin extends Vue {
    height = 0;

    matchHeight() {
        // @ts-ignore;
        this.height = this.$refs.scroll.clientHeight;
        console.log(this.height);
    }

    mounted() {
        this.matchHeight();
    }

}