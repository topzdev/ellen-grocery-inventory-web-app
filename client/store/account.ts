import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { frontendStore } from "~/utils/store-accessor";
import {
  SET_ACCOUNTS,
  SET_CURRENT_ACCOUNT,
  ADD_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT,
  SET_COUNT
} from "~/configs/types";
import { IAccount, IFilter, IPasswords } from '~/interfaces';
import AccountAPI from '~/api/Account'

const accountAPI = new AccountAPI;

@Module({
  name: "account",
  namespaced: true
})
export default class Account extends VuexModule {
  path: string = "/accounts";
  accounts: Array<IAccount> = [];
  account: IAccount | null = null;
  count: number = 0;

  @Mutation
  private [SET_ACCOUNTS](accounts: Array<IAccount>) {
    this.accounts = accounts;
  }

  @Mutation
  private [SET_CURRENT_ACCOUNT](account: IAccount) {
    this.account = account;
  }

  @Mutation
  private [ADD_ACCOUNT](account: IAccount) {
    this.accounts = [account, ...this.accounts];
  }

  @Mutation
  private [UPDATE_ACCOUNT](account: IAccount) {
    this.accounts = this.accounts.map(item =>
      item.account_id === account.account_id ? account : item
    );
  }

  @Mutation
  private [DELETE_ACCOUNT](account_id: IAccount['account_id']) {
    this.accounts = this.accounts.filter(
      item => item.account_id !== account_id
    );
  }

  @Mutation
  private [SET_COUNT](count: number) {
    this.count = count;
  }

  @Action
  async fetchSingleAccount(account_id: IAccount['account_id']) {
    if (account_id === undefined) return;
    const result = await accountAPI.fetchSingleAccount(account_id)
    if (result.success) this.context.commit(SET_CURRENT_ACCOUNT, result.data);
  }

  @Action
  async fetchAccounts(filter: IFilter) {
    const result = await accountAPI.fetchAccounts(filter);
    if (result.success) {
      this.context.commit(SET_ACCOUNTS, result.data);
      this.context.commit(SET_COUNT, result.count);
    };
  }

  @Action({ rawError: true })
  async addAccount(account: IAccount) {
    const result = await accountAPI.addAccount(account);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(ADD_ACCOUNT, {
      account_id: result.data.account_id,
      ...account
    })
  }

  @Action({ rawError: true })
  async updateAccount(account: IAccount) {
    const result = await accountAPI.updateAccount(account);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return this.context.commit(UPDATE_ACCOUNT, account);
  }

  @Action
  async updatePassword(passwords: IPasswords) {
    const result = await accountAPI.updatePassword(passwords);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
  }

  @Action
  async deleteAccount(account_id: number) {
    const result = await accountAPI.deleteAccount(account_id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(DELETE_ACCOUNT, account_id);
  }
}
