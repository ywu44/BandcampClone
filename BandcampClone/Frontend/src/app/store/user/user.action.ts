import { createActionGroup, props } from '@ngrx/store'
import { User } from 'src/app/models/user';

export const UserAction = createActionGroup({
    source: '[User Page] Artist',
    events: {
        'Get User': props<{ user: User }>(),
    }
});