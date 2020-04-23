import { Component, Vue, Prop } from "vue-property-decorator";
import { brandStore, categoryStore, supplierStore, roleStore } from "@/store";


@Component({ inheritAttrs: false })
export default class SelectMixin extends Vue {
  @Prop(Number) value: number | undefined;

  id: string = "";


  get roles() {
    return roleStore.roles;
  }


}
