export default (query: any) => {
    let string = '?'
    let objNames = Object.getOwnPropertyNames(query);

    objNames.forEach(item => {
        if (query[item]) string += item + '=' + query[item] + '&'
    })
    return string
}