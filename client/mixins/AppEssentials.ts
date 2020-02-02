import { Vue, Component } from "vue-property-decorator";
@Component
export default class AppEssentials extends Vue {
  color: string = "light-blue darken-1"
  title: string = "Ellen Inventory System";
  background: string = "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg";
}
