

export const priority_values = () =>{
    let values:string[] = []
    Object.keys(Priority)
    .map(key => values.push(key))
    
    return values
}