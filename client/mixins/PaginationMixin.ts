import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PaginationMixin extends Vue {
    row: string = '5'

    get parseRow() {
        // @ts-ignore
        if (this.row === 'All') return this.count
        return this.row
    }

    get rows() {
        const list = ['3', '5', '10', '15', '20']
        // @ts-ignore
        const filtered = list.filter(item => this.count >= parseInt(item))
        console.log(filtered);
        return [...filtered, 'All']
    }
}