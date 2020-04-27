interface IPassword {
    account_id?: number;
    new_password: string
    current_password: string
    verify_password: string
}

export default IPassword