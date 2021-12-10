import { RouterState } from "connected-react-router";
import { AnyAction, Reducer } from "redux";

export type ILoginReqType = {
    email: string;
    password: string;
}
export interface IAuthState{
    token: string | null;
    loading: boolean;
    error: Error | null;
}
export interface RootState {
    auth: IAuthState;
    router: Reducer<RouterState<unknown>, AnyAction>;
}