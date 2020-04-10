import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import IAccount from "~/interfaces/IAccount";
import IResult from "~/interfaces/IResult";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { frontendStore } from '~/utils/store-accessor';
import { SET_ACCOUNTS, SET_CURRENT_ACCOUNT, ADD_ACCOUNT, UPDATE_ACCOUNT, DELETE_ACCOUNT } from '~/configs/types';

@Module({
  name: "account",
  namespaced: true
})
export default class Account extends VuexModule {
  private url: string = "/api/account";
  private path: string = "/accounts";
  private accounts: Array<IAccount> = [];
  private current: IAccount | undefined = undefined;

  get getAccounts(): Array<IAccount> {
    return this.accounts;
  }

  get getCurrentAccount(): IAccount {
    return this.current!;
  }

  @Mutation
  private [SET_ACCOUNTS](accounts: Array<IAccount>) {
    this.accounts = accounts;
  }

  @Mutation
  private [SET_CURRENT_ACCOUNT](account: IAccount) {
    this.current = account;
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
  private [DELETE_ACCOUNT](account_id: number) {
    this.accounts = this.accounts.filter(
      item => item.account_id !== account_id
    );
  }

  @Action({ commit: SET_ACCOUNTS })
  public async searchAccounts(search: string) {
    try {
      const result: IResult = await $axios.$get(`${this.url}/search`);
      return result.data;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: SET_CURRENT_ACCOUNT })
  public async fetchSingleAccount(account_id: number | undefined) {
    if (account_id === undefined) return account_id;

    try {
      const result: IResult = await $axios.$get(`${this.url}/${account_id}`);
      return result.data;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: SET_ACCOUNTS })
  public async fetchAccounts() {
    try {
      const result: IResult = await $axios.$get(`${this.url}`);
      return result.data;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: ADD_ACCOUNT })
  public async addAccount(account: IAccount) {
    try {
      const result: IResult = await $axios.$post(
        `${this.url}`,
        account,
        config
      );

      frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
      frontendStore.setRedirect(this.path)

      return {
        account_id: result.data.account_id,
        ...account
      };
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: UPDATE_ACCOUNT })
  public async updateAccount(account: IAccount) {
    try {
      const result: IResult = await $axios.$put(`${this.url}`, account, config);

      frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
      frontendStore.setRedirect(this.path)

      return account;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: DELETE_ACCOUNT })
  public async deleteAccount(account_id: number) {
    try {
      const result: IResult = await $axios.$delete(`${this.url}/${account_id}`);

      frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
      frontendStore.setRedirect(this.path)

      return account_id;
    } catch (error) {
      return console.log(error.stack);
    }
  }
}
