interface ICustomer{
    customer_id?: number,
    firstname: string, 
    lastname: string, 
    middlename: string, 
    points: number, 
    email_address: string | null, 
    home_address: string | null,
    cp_no: string| null, 
    tel_no: string| null, 
    fax: string | null
}

export default ICustomer;