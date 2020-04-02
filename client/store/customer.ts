import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ICustomer from "~/interfaces/ICustomer";
import config from "~/configs/axiosConfig";
import { $axios } from "~/utils/axios";
import IResult from "~/interfaces/IResult";
import { frontendStore } from '~/utils/store-accessor';

@Module({
  name: "customer",
  namespaced: true
})
export default class Customer extends VuexModule {
  private url: string = "/api/customer";
  private path: string = "/customers";
  private customers: Array<ICustomer> = [];
  private customer: ICustomer | undefined = undefined;

  get getCustomers() {
    return this.customers;
  }

  get getCurrentCustomer() {
    return this.customer;
  }

  @Mutation
  private SET_CURRENT(customer: ICustomer): void {
    this.customer = customer;
  }

  @Mutation
  private SET_CUSTOMERS(customers: Array<ICustomer>): void {
    this.customers = customers;
  }
  @Mutation
  private ADD_CUSTOMER(customer: ICustomer): void {
    this.customers = [customer, ...this.customers];
  }
  @Mutation
  private UPDATE_CUSTOMER(customer: ICustomer): void {
    this.customers = this.customers.map(item =>
      item.customer_id === customer.customer_id ? customer : item
    );
  }
  @Mutation
  private DELETE_CUSTOMER(customer_id: number): void {
    this.customers = this.customers.filter(
      item => item.customer_id !== customer_id
    );
  }

  @Action({ commit: "SET_CURRENT" })
  public async fetchSingleCustomer(id: number | undefined) {
    if (id === undefined) return undefined;

    const result: IResult = await $axios.$get(`${this.url}/${id}`);
    console.log(result.data);
    return result.data;
  }

  @Action({ commit: "SET_CUSTOMERS" })
  public async fetchCustomers() {
    const result: IResult = await $axios.$get(this.url);
    return result.data;
  }

  @Action({ commit: "SET_CUSTOMERS" })
  public async searchCustomers(search: string) {
    const result: IResult = await $axios.$get(`${this.url}/search/${search}`);
    return result.data;
  }

  @Action({ commit: "ADD_CUSTOMER" })
  public async addCustomer(customer: ICustomer) {
    const result: IResult = await $axios.$post(this.url, customer, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return { customer_id: result.data.customer_id, ...customer };
  }

  @Action({ commit: "UPDATE_CUSTOMER" })
  public async updateCustomer(customer: ICustomer) {
    const result: IResult = await $axios.$put(this.url, customer, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return customer;
  }

  @Action({ commit: "DELETE_CUSTOMER" })
  public async deleteCustomer(customer_id: number) {
    const result: IResult = await $axios.$delete(`${this.url}/${customer_id}`);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return customer_id;
  }
}
