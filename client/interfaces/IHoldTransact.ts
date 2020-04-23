import { IAccount, IOrder, ICustomer } from '.';

interface IHoldTransact {
    account: IAccount,
    customer: ICustomer;
    orders: IOrder[],
    transaction_started: string,
    holded_at: string
}

export default IHoldTransact