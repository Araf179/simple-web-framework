import {User, UserProps} from '../models/User';
import {View} from './View';

export class UserForm extends View<User, UserProps> {
  
    eventsMap = (): {[key: string]: () => void} => {
        return {
            'click:.set-age': this.onSetAgeClick,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        }
    }

    onSaveClick = () => {
        this.model.save();
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');
        const name = input.value;
        //this.model is going to refer to User class
        this.model.set({name});
    }

    onSetAgeClick = (): void => {
        this.model.setRandomAge();
    }

    template(): string {
        return `
        <div>
            <h1>Details Screen</h1>
            <h2>Name: ${this.model.get('name')}<h2>
            <h3>Age: ${this.model.get('age')}</h3>
            <input placeholder="${this.model.get('name')}"/>
            <button class="set-name">Click Me</button>
            <button class="set-age">Set random age</button>
            <button class="save-model">Save User</button>
        </div>
        `
    }

}