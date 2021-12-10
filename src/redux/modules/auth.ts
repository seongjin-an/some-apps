import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IAuthState, ILoginReqType } from "../../types/types";
import UserService from '../../services/UserService'
import TokenService from "../../services/TokenService";
import { push } from "connected-react-router";



const initialState: IAuthState = {
    token: null,
    loading: false,
    error: null
}

const prefix = 'my-books/auth';

export const {pending, success, fail} = createActions('PENDING', 'SUCCESS', 'FAIL', {prefix})

const reducer = handleActions<IAuthState, any>({
    PENDING: (state) => ({
        ...state,
        loading: true,
        error: null
    }),
    SUCCESS: (state, action) => ({
        token: action.payload,
        loading: false,
        error: null
    }),
    FAIL: (state, action) => ({
        ...state,
        loading: false,
        error: action.payload
    })
}, initialState, {prefix})

export default reducer;

//saga

export const {login, logout} = createActions('LOGIN', 'LOGOUT', {prefix})
function* loginSaga(action: Action<ILoginReqType>){
    try{
        console.log('login saga')
        yield put(pending());
        const token: string = yield call(UserService.login, action.payload);
        //localstorage
        TokenService.set(token);
        yield put(success(token));
    }catch(error: any){
        yield put(fail(new Error(error.response.data.error || "UNKNOWN_ERROR")))
    }
}
function* logoutSaga(){
    try{
        console.log('logout saga')
        yield put(pending());
        const token: string = yield select(state => state.auth.token);
        yield call(UserService.logout, token);
        //localstorage
        TokenService.set(token);
    }catch(error: any){
    }finally{
        TokenService.remove();
        yield put(success(null))
    }
}
export function* authSaga(){
    yield takeEvery(`${prefix}/LOGIN`, loginSaga);
    yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}