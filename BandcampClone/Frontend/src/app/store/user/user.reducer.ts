import { createReducer, on } from "@ngrx/store";
import { UserAction } from "./user.action";

export const initialState: any = undefined;

export const userReducer = createReducer(
    initialState,
    on(UserAction.getUser, (state, {user}) => user),
)