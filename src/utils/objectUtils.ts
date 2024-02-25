export function objectToKeyValueEntries(object?: Object){
    if(object === undefined) return undefined;
    return Object.entries(object).map(([key, value])=> ({key, value}))
}