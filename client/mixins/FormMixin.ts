import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class FormMixin extends Vue {
    @Prop(Boolean) modal?: boolean;
    @Prop(Object) data?: Object;
    @Prop(Boolean) isEdit?: boolean;
    @Prop(Boolean) isLoading?: boolean;
    @Prop(Function) validate!: Function;
    @Prop(Function) closeModal!: Function;
    @Prop(String) title?: string;
    @Prop(Object) rules?: Object;

    $refs!: { form: any }

    get color() {
        return this.isEdit ? 'warning' : 'success';
    }

    validateForm() {
        return this.$refs.form.validate();
    }

    resetForm() {
        this.$refs.form.resetValidation();
    }
}