interface ICustomer{
    customer_id?: number,
    firstname: string, 
    lastname: string, 
    middlename: string, 
    email_address?: string, 
    cp_no?: string, 
    tel_no?: string, 
    points: number, 
    fax?: string
}

export default ICustomer;