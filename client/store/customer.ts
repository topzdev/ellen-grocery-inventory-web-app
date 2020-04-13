import CustomerAPI from '~/api/Customer'
import { frontendStore } from '~/utils/store-accessor';
import { ICustomer, IFilter } from '~/interfaces';
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { SET_CURRENT_CUSTOMER, SET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, SET_LOADING } from '~/configs/types';

const customerAPI = new CustomerAPI

@Module({ name: "customer", namespaced: true })
export default class Customer extends VuexModule {
  private path: string = "/customers";
  private customers: ICustomer[] = [];
  private customer: ICustomer | undefined = undefined;
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getCustomers() {
    return this.customers;
  }

  get getCurrentCustomer() {
    return this.customer;
  }

  @Mutation
  private [SET_CURRENT_CUSTOMER](customer: ICustomer): void {
    this.customer = customer;
  }

  @Mutation
  private [SET_CUSTOMERS](customers: Array<ICustomer>): void {
    this.customers = customers;
  }
  @Mutation
  private [ADD_CUSTOMER](customer: ICustomer): void {
    this.customers = [customer, ...this.customers];
  }
  @Mutation
  private [UPDATE_CUSTOMER](customer: ICustomer): void {
    this.customers = this.customers.map(item =>
      item.customer_id === customer.customer_id ? customer : item
    );
  }
  @Mutation
  private [DELETE_CUSTOMER](customer_id: number): void {
    this.customers = this.customers.filter(
      item => item.customer_id !== customer_id
    );
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }


  @Action({ commit: SET_CURRENT_CUSTOMER })
  async fetchSingleCustomer(customer_id: ICustomer['customer_id']) {
    if (customer_id === undefined) return undefined;
    const result = await customerAPI.fetchSingleCustomer(customer_id)
    return result.data;
  }

  @Action({ commit: SET_CUSTOMERS })
  async fetchCustomers(filter: IFilter) {
    const result = await customerAPI.fetchCustomers(filter)
    return result.data;
  }

  @Action({ commit: ADD_CUSTOMER })
  async addCustomer({ customer, redirect }: { customer: ICustomer, redirect: boolean }) {

    this.setLoading(true);

    const result = await customerAPI.addCustomer(customer);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    return { customer_id: result.data.customer_id, ...customer };
  }

  @Action({ commit: UPDATE_CUSTOMER })
  async updateCustomer(customer: ICustomer) {
    const result = await customerAPI.updateCustomer(customer);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return customer;
  }

  @Action({ commit: DELETE_CUSTOMER })
  async deleteCustomer(customer_id: ICustomer['customer_id']) {
    const result = await customerAPI.deleteCustomer(customer_id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return customer_id;
  }
}
