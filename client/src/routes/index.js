import ProtectedRoute from "./ProtectedRoute"
import { Route, Routes, Navigate } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../actions/message";

//Custom Component Import
import Home from "../components/Home";
import Login from "../components/Login";
// import Profile from './components/profile'

export default function AppRoutes(props) {
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch();

    dispatch(clearMessage()); // clear message when changing location

    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={user.isLoggedIn ? <Navigate to="/profile" /> : <Login />} />
            {/* <Route exact path="/register" component={Register} /> */}
            {/* <ProtectedRoute exact user={user} path="/profile" component={Profile} /> */}
            {/* <Route path="/user" component={BoardUser} /> */}
            {/* <Route path="/mod" component={BoardModerator} /> */}
            {/* <Route path="/admin" component={BoardAdmin} /> */}
        </Routes>
    )
}