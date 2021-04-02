import { AxiosPromise, AxiosResponse } from "axios";

interface ModelAttributes<T> {
    set(value: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: () => void): void
    trigger(eventName: string): void;
}

interface HasId {
    id?: number;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ){}

    get on() {
        //return a reference to this.events.on
        return this.events.on;
    }
    
    get trigger() {
        return this.events.trigger;
    }

    get get() {
        return this.attributes.get;
    }

    set = (update: T): void => {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    fetch = async (): Promise<void> => {
        const id = this.attributes.get('id');

        if(typeof id !== 'number'){
            throw new Error('Cannot fetch without an id');
        }
        let res =  await this.sync.fetch(id);
        this.set(res.data)
    }

    save = async (): Promise<void> => {
        try {
            let res = await this.sync.save(this.attributes.getAll());
            this.trigger('save');
        }catch(err){
            this.trigger('error');
        }
    }
}