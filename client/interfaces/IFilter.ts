interface IFilter {
    search?: string;
    limit?: number | string;
    offset?: number | string;
    recent?: boolean,
    order?: string,
    order_by?: string,
    transact_count?: boolean,
    last_transact?: boolean
}

export default IFilter;
