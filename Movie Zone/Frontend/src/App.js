import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Paper, Typography} from '@mui/material';

import './App.css'

import Login from './Components/Login';
import RoleSelector from './RoleSelector';
import Home from './Components/Home'
import Movie from './Components/Movie';
import Cart from './Components/Cart';
import Reservation from './Components/Reservation';
import About from './Components/About';
import ProtectedRoute from './ProtectedRoute';

export default function App() {
    const isAuth = sessionStorage.getItem("isAuth");
    const role = sessionStorage.getItem("role");

    return (
    <>
    {console.log(role)}
        <Router>
            <Switch>
                <Route exact path='/' component={!isAuth ? RoleSelector : Home}/>
                <Route exact path='/login/:role' component={!isAuth ? Login : Home}/>

                <ProtectedRoute exact path='/home' component={Home} auth={isAuth}/>
                <ProtectedRoute exact path='/cart' component={Cart} auth={isAuth}/>
                <ProtectedRoute exact path='/movie' component={Movie} auth={isAuth}/>
                <ProtectedRoute exact path='/reservation' component={Reservation} auth={isAuth}/>
                <ProtectedRoute exact path='/about' component={About} auth={isAuth}/>

                {/* <ProtectedRoute exact path='/home' component={Home} auth={isAuth}/>
                <ProtectedRoute exact path='/item' component={Item} auth={isAuth}/>
                <ProtectedRoute exact path='/customer' component={Customer} auth={isAuth}/>
                <ProtectedRoute exact path='/aboutus' component={AboutUs} auth={isAuth}/> */}
            </Switch>
        </Router>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <Typography variant="body2" color="text.secondary" bgcolor='gray' align='center'>
            Copyright &copy; 2022, DEVX Pvt. Ltd.
        </Typography>
    </Paper>
    </>
    )
}
