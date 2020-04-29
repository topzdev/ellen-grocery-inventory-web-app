
type interval = 'this_day' | 'recent' | 'last_day' | 'this_week' | 'this_month' | 'last_month' | 'this_year' | 'last_year'
type status = 'critical' | 'out_of_stock'

interface IFilter {
    search?: string;
    limit?: number | string;
    offset?: number | string;
    recent?: boolean,
    order?: string,
    order_by?: string,
    transact_count?: boolean,
    last_transact?: boolean,
    count?: boolean,
    interval?: string,
    show_deleted?: boolean,
    status?: string
}

export default IFilter;
