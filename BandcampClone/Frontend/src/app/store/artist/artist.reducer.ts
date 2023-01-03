import { createReducer, on } from "@ngrx/store";
import { ArtistAction } from './artist.action';

export const initialState: any = undefined;

export const artistReducer = createReducer(
    initialState,
    on(ArtistAction.getArtist, (state, {artist}) => artist),
)