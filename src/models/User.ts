import {Eventing} from './Eventing';
import axios, {AxiosResponse} from 'axios';


interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export class User {
    public events: Eventing = new Eventing();
    constructor(private data: UserProps){}

    get = (propName: string): (number | string) => {
        return this.data[propName];
    }

    set = (update: UserProps): void => {
        Object.assign(this.data, update)
    }

    fetch = async (): Promise<void> => {
        let res = await axios.get(`http://localhost:3000/users/${this.get('id')}`)
        this.set(res.data);
 
    }

    save = (): void => {
        const id = this.get('id')
        if(this.get('id')){
            axios.put(`http://localhost:3000/users/${this.get('id')}`, this.data)
        }else{
            axios.post('http://localhost:3000/users', this.data);
        }
    }
}