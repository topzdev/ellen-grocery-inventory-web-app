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
  dialog: boolean = true;
  public isEdit: boolean = false;
  public roleStore: IRoleModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

  public role: IRole = {
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
    this.roleStore.addRole(this.role);
  }

  updateRole() {
    this.isEdit = false;
    this.roleStore.updateRole(this.role);
  }

  setRole(item: IRole) {
    this.isEdit = true;
    this.role = JSON.parse(JSON.stringify(item));
  }

  setCancel() {
    this.isEdit = false;
    this.role = { role_name: "", role_id: undefined };
    // @ts-ignore
    this.$refs.manageForm.resetValidation();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      if (this.isEdit) {
        this.updateRole();
      } else {
        this.addRole();
      }
    }
  }

  showDelete(item: IRole) {
    this.role = item;
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
    if (search.length <= 0) this.roleStore.fetchRoles();
    this.roleStore.searchRoles(search);
  }

  get roleList() {
    return this.roleStore.getRoles;
  }

  get roleTitle() {
    return this.isEdit ? "Edit Role" : "Add Role";
  }

  rules: Object = {
    role_name: [(v: any) => !!v || "Role Name is required"]
  };
}

export default RoleMixin;
