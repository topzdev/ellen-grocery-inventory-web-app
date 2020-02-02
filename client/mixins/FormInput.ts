import { Component, Vue } from 'vue-property-decorator'

@Component({
    inheritAttrs: false
})
export default class FormInput extends Vue {
    input(event: any): void {
        const value = event.target.value
        this.$emit("input", event.target.value)
    }
} 