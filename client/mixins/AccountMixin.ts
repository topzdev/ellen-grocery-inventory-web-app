import { Component, Vue } from "vue-property-decorator";
import {
  accountStore,
  frontendStore,
  processStore,
  roleStore,
  IFrontendModule,
  IProcessModule,
  IAccountModule
} from "@/store";
import IAccount from "~/interfaces/IAccount";

@Component
class AccountMixin extends Vue {
  valid: boolean = false;
  dialog: boolean = true;
  isEdit: boolean = false;
  accountStore: IAccountModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;
  $refs!: { form: any }
  public account: IAccount = {
    account_id: undefined,
    firstname: "",
    lastname: "",
    middlename: "",
    username: "",
    email_address: "",
    role_id: -1,
    password: ""
  };

  constructor() {
    super();
    this.accountStore = accountStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addAccount() {
    this.accountStore.addAccount(this.account);
  }

  updateAccount() {
    this.isEdit = false;
    this.accountStore.updateAccount(this.account);
  }

  clearFields() {
    this.account = {
      account_id: undefined,
      firstname: "",
      lastname: "",
      middlename: "",
      username: "",
      email_address: "",
      role_id: -1,
      password: ""
    };

    this.$refs.form.resetForm();
  }

  validate(): void {

    if (this.$refs.form.validateForm()) {
      if (this.isEdit) {
        this.updateAccount();
      } else {
        this.addAccount();
      }
    }
  }

  showDelete(item: IAccount) {
    this.account = item;
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.account.username,
      title: "Account"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.accountStore.deleteAccount,
      id: this.account.account_id
    });
  }

  async setAccount(item: IAccount) {
    if (!item) {
      this.clearFields();
      return this.isEdit = false
    };

    await this.accountStore.fetchSingleAccount(item.account_id);

    if (this.currentAccount) {
      this.isEdit = true;
      this.account = JSON.parse(JSON.stringify(this.currentAccount));
    }
  }

  searchAccount(search: string) {
    this.accountStore.fetchAccounts({ search });
  }

  get roles() {
    return roleStore.getRoles;
  }

  get accountList() {
    return this.accountStore.getAccounts;
  }

  get currentAccount() {
    return this.accountStore.getCurrentAccount;
  }

  get accountTitle() {
    return this.isEdit ? "Change Account Info" : "Add Account";
  }

  rules: Object = {
    firstname: [(v: any) => !!v || "First Name is required"],
    lastname: [(v: any) => !!v || "Last Name is required"],
    middlename: [(v: any) => !!v || "Middle Name is required"],
    username: [(v: any) => !!v || "Username is required"],
    email_address: [(v: any) => !!v || "Email Address is required"],
    password: [
      (v: any) => !!v || "Password is required",
      (v: any) => !!v && v.length > 6 || "Password length must longer than 6",
      (v: any) => !!v && v.length < 50 || "Password is too long"
    ],
    role_id: [(v: any) => (v !== -1 && v === "") || "Role is required"]
  };
}

export default AccountMixin;
