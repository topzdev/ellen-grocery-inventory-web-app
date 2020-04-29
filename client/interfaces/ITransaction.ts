import IOrder from './IOrder';

interface ITransaction {
    transact_id?: number | string;
    customer_id?: number | string;
    account_id?: number | string;
    started_at?: string;
    ended_at?: string;
    created_at?: string;
    total_amount?: string | number
    amount_paid?: string | number,
    customer_name?: string;
    account_name?: string
    orders?: IOrder[],
    points?: number
}

export default ITransaction;