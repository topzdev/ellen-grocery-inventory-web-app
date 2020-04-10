interface ICustomer {
    customer_id?: number,
    firstname: string,
    lastname: string,
    email_address?: string,
    home_address: string
    cp_no?: string,
    tel_no?: string,
    points: number,
}

export default ICustomer;