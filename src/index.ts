import { User } from './models/User';

const user = new User({name: 'New record'});

user.events.on('change', () => {
    console.log("change!");
})

user.events.trigger('change');