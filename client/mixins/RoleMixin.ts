import { Component, Vue } from "vue-property-decorator";
import {
  roleStore,
  frontendStore,
  processStore,
  IFrontendModule,
  IProcessModule,
  IRoleModule
} from "@/store";
import IRole from "~/interfaces/IRole";

@Component
class RoleMixin extends Vue {
  valid: boolean = false;
  redirect: boolean = true;
  isEdit: boolean = false;
  roleStore: IRoleModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;
  $refs!: { form: any }
  role: IRole = {
    role_id: undefined,
    role_name: ""
  };

  constructor() {
    super();
    this.roleStore = roleStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addRole() {
    this.roleStore.addRole({ role: this.role, redirect: this.redirect });
  }

  updateRole() {
    this.isEdit = false;
    this.roleStore.updateRole(this.role);
  }

  setRole(item: IRole) {
    this.isEdit = true;
    this.role = JSON.parse(JSON.stringify(item));
  }

  clearFields() {
    this.isEdit = false;
    this.role = { role_name: "", role_id: undefined };
    // this.$refs.form.resetForm();
  }

  validate() {
    if (this.$refs.form.validateForm()) {
      if (this.isEdit) return this.updateRole();
      else this.addRole();
    }
  }

  deleteRole(item: IRole) {
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.role.role_name,
      title: "Role"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.roleStore.deleteRole,
      id: this.role.role_id
    });
  }

  searchRole(search: string) {
    this.roleStore.fetchRoles({ search });
  }

  get roleList() {
    return this.roleStore.getRoles;
  }

  get roleTitle() {
    return this.isEdit ? "Edit Role" : "Add Role";
  }

  get isLoading() {
    if (this.roleStore.getLoading) {
      this.clearFields();
      this.frontendStore.setRoleModal(false);
    }
    return this.roleStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.roleModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setRoleModal(show);
  }

  closeModal() {
    this.clearFields();
    this.frontendStore.setRoleModal(false);
  }

  rules: Object = {
    role_name: [(v: any) => !!v || "Role Name is required"]
  };
}

export default RoleMixin;
