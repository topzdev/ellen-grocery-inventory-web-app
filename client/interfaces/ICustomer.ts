interface ICustomer {
    customer_id?: number,
    firstname: string,
    lastname: string,
    email_address: string | null,
    home_address: string | null,
    cp_no: string | null,
    tel_no: string | null,
}

export default ICustomer;