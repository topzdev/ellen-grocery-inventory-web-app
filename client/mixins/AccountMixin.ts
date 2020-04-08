import { Component, Vue } from "vue-property-decorator";
import {
  accountStore,
  frontendStore,
  processStore,
  IFrontendModule,
  IProcessModule,
  IAccountModule
} from "@/store";
import IAccount from "~/interfaces/IAccount";

@Component
class AccountMixin extends Vue {
  valid: boolean = false;
  dialog: boolean = true;
  public isEdit: boolean = false;
  public accountStore: IAccountModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

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

  //   setAccount(item: IAccount) {
  //     this.isEdit = true;
  //     this.account = JSON.parse(JSON.stringify(item));
  //   }

  setCancel() {
    this.isEdit = false;
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
    // @ts-ignore
    this.$refs.manageForm.reset();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
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

  manageItem(item: IAccount) {
    this.accountStore.fetchSingleAccount(item.account_id!);
    this.$router.push("accounts/update");
  }

  searchAccount(search: string) {
    if (search.length <= 0) this.accountStore.fetchAccounts();
    this.accountStore.searchAccounts(search);
  }

  get accountList() {
    return this.accountStore.getAccounts;
  }

  rules: Object = {
    firstname: [(v: any) => !!v || "First Name is required"],
    lastname: [(v: any) => !!v || "Last Name is required"],
    middlename: [(v: any) => !!v || "Middle Name is required"],
    username: [(v: any) => !!v || "Username is required"],
    email_address: [(v: any) => !!v || "Email Address is required"],
    password: [
      (v: any) => !!v || "Password is required",
      (v: any) => v.length > 6 || "Password length must longer than 6",
      (v: any) => v.length < 50 || "Password is too long"
    ],
    role_id: [(v: any) => v !== -1 || "Role is required"]
  };
}

export default AccountMixin;
