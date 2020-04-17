import IOrder from "./IOrder";

interface ITransaction {
    transact_id?: number | string;
    customer_id?: number | string;
    account_id?: number | string;
    started_at: string
    ended_at: string
    created_at: string
    total_amount: string | number
    amount_paid: string | number
    orders: IOrder[]
}

export default ITransaction;