import { createActionGroup, props } from '@ngrx/store'
import { Album } from '../../models/album'

export const AlbumsAction = createActionGroup({
    source: '[Albums Page] Albums',
    events: {
        'Get Albums': props<{ albums: Album[] }>(),
    }
});