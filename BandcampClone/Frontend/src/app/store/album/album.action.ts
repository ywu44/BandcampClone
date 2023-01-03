import { createActionGroup, props } from '@ngrx/store'
import { Album } from '../../models/album'

export const AlbumAction = createActionGroup({
    source: '[Album Page] Album',
    events: {
        'Get Album': props<{ album: Album }>(),
    }
});