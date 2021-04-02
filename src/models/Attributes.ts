
export class Attributes<T> {
    constructor(private data: T){}
    //K can only ever be strings of 1 of the types in T 
    //constraint limiting the types we can send in as a parameter
    get = <K extends keyof T>(key: K): T[K] => {
        return this.data[key];
    }

    set = (update: T): void => {
        Object.assign(this.data, update)
    }

    getAll = (): T => {
        return this.data;
    }
}
