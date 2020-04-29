interface ISales {
    sum: number,
    count: string
}

interface ISalesReport {
    this_month?: ISales;
    last_month?: ISales;
    this_year?: ISales;
    last_year?: ISales;
}

interface IProductStatus {
    out_of_stock?: any;
    critical?: any
}

interface IStatsCount {
    product?: any,
    transaction?: any
    customer?: any
}

interface ICustomersByInterval {
    spend: number | string
    fullname: string,
    customer_id: number
}

interface IProductsByStatus {
    product_name: string,
    quantity: number,
    quantity_max: number,
    quantity_min: number,
    barcode: string
}

interface ITransactByInterval {
    transact_id: number,
    customer_name: string
    total_amount: number,
    amount_paid: number,
    created_at: string
    points: number,
}


export {
    ISales,
    ITransactByInterval,
    ICustomersByInterval,
    IProductsByStatus,
    IStatsCount,
    IProductStatus,
    ISalesReport
}