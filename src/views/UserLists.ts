import { CollectionView } from './CollectionView';
import { User, UserProps} from '../models/User';
import { UserShow } from './UserShow';

export class UserLists extends CollectionView<User, UserProps> {
    renderItem(model: User, itemParent: Element): void {
        new UserShow(itemParent, model).render()
    }
}