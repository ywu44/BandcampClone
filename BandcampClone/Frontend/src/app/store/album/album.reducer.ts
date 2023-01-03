import { createReducer, on } from "@ngrx/store";
import { AlbumAction } from './album.action';

export const initialState: any = undefined;

export const albumReducer = createReducer(
    initialState,
    on(AlbumAction.getAlbum, (state, {album}) => album),
)