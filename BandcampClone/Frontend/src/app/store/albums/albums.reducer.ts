import { createReducer, on } from "@ngrx/store";
import { AlbumsAction } from './albums.action';

export const initialState: any[] = [];

export const albumsReducer = createReducer(
    initialState,
    on(AlbumsAction.getAlbums, (state, {albums}) => albums),
)