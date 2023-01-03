import { createActionGroup, props } from '@ngrx/store'
import { Artist } from '../../models/artist'

export const ArtistAction = createActionGroup({
    source: '[Artist Page] Artist',
    events: {
        'Get Artist': props<{ artist: Artist }>(),
    }
});