export default (query: any) => {
    let filter: string[] = []


    for (const key in query) {
        console.log(query[key], key)
        if (query[key] !== '' && query[key] !== undefined) filter.push(key + '=' + query[key]);
    }

    console.log(filter.join('&'))

    return filter.length ? '?' + filter.join('&') : ''
}