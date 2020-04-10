import Vue from "vue";
import BrandSelect from "@/components/selects/BrandSelect.vue";
import SupplierSelect from "@/components/selects/SupplierSelect.vue";
import CategorySelect from "@/components/selects/CategorySelect.vue";
import RoleSelect from "@/components/selects/RoleSelect.vue";
import BackButton from "@/components/button/BackButton.vue";

Vue.component("brand-select", BrandSelect);
Vue.component("supplier-select", SupplierSelect);
Vue.component("category-select", CategorySelect);
Vue.component("role-select", RoleSelect);
Vue.component("back-btn", BackButton);
