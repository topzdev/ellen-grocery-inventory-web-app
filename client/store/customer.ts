import CustomerAPI from '~/api/Customer'
import { frontendStore } from '~/utils/store-accessor';
import { ICustomer, IFilter } from '~/interfaces';
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { SET_CURRENT, SET_CUSTOMERS, ADD_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER, SET_LOADING, ADD_SUPPLIER, UPDATE_SUPPLIER, SET_COUNT } from '~/configs/types';

const customerAPI = new CustomerAPI

@Module({ name: "customer", namespaced: true })
export default class Customer extends VuexModule {
  path: string = "/customers";
  customers: ICustomer[] = [];
  customer: ICustomer | undefined = undefined;
  loading: boolean = false;
  count: number = 0;

  @Mutation
  private [SET_CURRENT](customer: ICustomer): void {
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
  private [SET_COUNT](count: number): void {
    this.count = count;
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ rawError: true })
  setLoading(state: boolean) {
    return this.context.commit(SET_LOADING, state);
  }


  @Action({ rawError: true })
  async fetchSingleCustomer(customer_id: ICustomer['customer_id']) {
    const result = await customerAPI.fetchSingleCustomer(customer_id)
    if (result.success) this.context.commit(SET_CURRENT, result.data);
  }

  @Action({ rawError: true })
  async fetchCustomers(filter: IFilter) {
    const result = await customerAPI.fetchCustomers(filter)
    console.log(result);
    if (result.success) {
      this.context.commit(SET_CUSTOMERS, result.data)
      this.context.commit(SET_COUNT, result.count)
    };
  }

  @Action({ rawError: true })
  async addCustomer({ customer, redirect }: { customer: ICustomer, redirect: boolean }) {

    this.setLoading(true);

    const result = await customerAPI.addCustomer(customer);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) this.context.commit(ADD_CUSTOMER, { ...customer, customer_id: result.data, fullname: customer.fullname });
  }

  @Action({ rawError: true })
  async updateCustomer(customer: ICustomer) {
    const result = await customerAPI.updateCustomer(customer);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(UPDATE_CUSTOMER, customer);
  }

  @Action({ rawError: true })
  async deleteCustomer(customer_id: ICustomer['customer_id']) {
    const result = await customerAPI.deleteCustomer(customer_id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(DELETE_CUSTOMER, customer_id)
  }
}
