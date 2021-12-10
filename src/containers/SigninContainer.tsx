import { push } from 'connected-react-router';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Signin from '../components/signin/Signin'
import {login as loginSagaStart} from '../redux/modules/auth'
import { RootState } from '../types/types';

const SigninContainer = ({}) => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector<RootState, string | null>((state) => state.auth.token)
    const login = useCallback((reqData) => {
        dispatch(loginSagaStart(reqData))
    }, [dispatch])
    useEffect(() => {
        if(token){
            navigate("/");
        }
    }, [token])
    return (
        <Signin login={login}/>
    )
}
export default SigninContainer