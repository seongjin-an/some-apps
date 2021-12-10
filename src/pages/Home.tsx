import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../redux/modules/auth";
import { RootState } from "../types/types";

const Home = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const token = useSelector<RootState, string | null>((state) => state.auth.token)
    useEffect(() => {
        if(token === null){
            navigate("/signin");
        }
    }, [token])
    const handleClick = () => {
        dispatch(logout());
    }
    return <div>
        Home
        <button onClick={handleClick}>logout</button>
    </div>
}
export default Home