import React, {useState,useRef, useEffect}from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material';

import welcome from '../Assets/welcome.jpg';

import login from '../Assets/Login.jpg';
import {LoginValidate, SignUpValidate} from './Validate';

export default function Login() {
    const params = useParams();
    const [signInValues,setSignInValues]=useState({
        email:'',
        password:'',
        role: params.role
    });

    const [signUpValues,setSignUpValues]=useState({
        email:'',
        username:'',
        password:'',
        userconfirmpass:'',
        role: params.role
    });

    // Used to refer input fields
    const signInEmail=useRef();
    const signInPassword=useRef();

    const signUpEmail=useRef();
    const signUpPassword=useRef();
    const signUpConfirmPassword=useRef();
    const signUpUserName=useRef();
    

    const handleSignInChange=(event)=>{
        setSignInValues({...signInValues,
            [event.target.name]:event.target.value,
        })
    }
    const handleSignUpChange=(event)=>{
        setSignUpValues({...signUpValues,
            [event.target.name]:event.target.value,
        })
    }

    const [signInErrors,setSignInErrors]=useState({});
    const [signUpErrors,setSignUpErrors]=useState({});

    const handleSignInSubmit= (event)=>{
        event.preventDefault();
        
        // Make Sure there is no spaces trailing and leading
        Object.keys(signInValues).map(k=>signInValues[k]=signInValues[k].trim());
        // Validate input Fields
        setSignInErrors(LoginValidate(signInValues));
    }

    const handleSignUpSubmit= (event)=>{
        event.preventDefault();
        
        // Make Sure there is no spaces trailing and leading
        Object.keys(signUpValues).map(k=>signUpValues[k]=signUpValues[k].trim());
        // Validate input Fields
        setSignUpErrors(SignUpValidate(signUpValues));
    }

    useEffect(()=>{
        if(Object.keys(signInErrors).length===0  && signInValues.email!=='' && signInValues.password!==''){
            axios.post('http://localhost:8290/user/sign-in',signInValues).then(res=>{
                        if(res.data.token){
                            sessionStorage.setItem('isAuth',"true");
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('email',res.data.email);
                            setInterval(()=> window.location.pathname = "/home",1000);
                        }
                    });
        }else if(Object.keys(signUpErrors).length===0  && signUpValues.email!=='' && signUpValues.password!=='' && signUpValues.userconfirmpass !== '' && signUpValues.username !== ''){
            axios.post('http://localhost:8290/user/sign-up',signUpValues).then(res=>{
                        if(res.data.token){
                            sessionStorage.setItem('isAuth',"true");
                            sessionStorage.setItem('role',res.data.role);
                            sessionStorage.setItem('email',res.data.email);
                            setInterval(()=> window.location.pathname = "/home",1000);
                        }
                    });
        }else{
            console.log(params.role)
        }
    },[signUpErrors, signInErrors])

if(params.role !== 'Customer'){
    return(
        <section className="h-100 gradient-form" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                {/* Left Panel */}
                                <div className="col-lg-6 left-panel">
                                    <div className='title'>Login</div>
                                    <img src={welcome} className="image" alt="welcome user"/>
                                    <div>
                                        <Typography gutterBottom variant="h4" component="div" align='center'>Hello, {params.role}</Typography>
                                        <Typography variant="body2" color="text.secondary" align='center'>Enter your personal details and start your journey</Typography>
                                    </div>
                                    <div className="card-body p-md-5 mx-md-4">
                                        <form>
                                            {/* <!-- Email input --> */}
                                            <label className="form-label d-block" htmlFor="useremail">Email</label>
                                            <div className="mb-4 input-group">
                                                <i className='fa-solid fa-envelope input-group-text d-flex'/>
                                                <input type="email" ref={signInEmail} id="useremail" placeholder='Enter Email' value={signInValues.email} className="form-control" name='email' onChange={handleSignInChange}/>
                                            </div>
                                            {signInErrors.email && <p className='note note-warning error'>{signInErrors.email}</p>}
                                            {/* <!-- Password input --> */}
                                            <label className="form-label d-block" htmlFor="loginPassword">Password</label>
                                            <div className="input-group mb-4">
                                                <i className='fa fa-key input-group-text d-flex'/>
                                                <input type="password" ref={signInPassword} id="loginPassword" placeholder='Enter Password' value={signInValues.password} name='password' className="form-control" onChange={handleSignInChange}/>
                                            </div>
                                            {signInErrors.password && <p className='note note-warning error'>{signInErrors.password}</p>}
                                            {/* <!-- 2 column grid layout --> */}
                                            <div className="row mb-4">
                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Checkbox --> */}
                                                <div className="form-check mb-3 mb-md-0">
                                                    <input className="form-check-input" type="checkbox" defaultChecked id="loginCheck"/>
                                                    <label className="form-check-label" htmlFor="loginCheck">Remember me </label>
                                                </div>
                                                </div>

                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Simple link --> */}
                                                <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSignInSubmit}>Sign in</button>
                                            </form>
                                    </div>
                                </div>
                                {/* Right Panel */}
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Buying something on sale is a very special feeling. In fact, the less I pay for something, the more it is worth to me. I have a dress that I paid so little for that I am afraid to wear it. I could spill something on it, and then how would I replace it for that amount of money?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    )  
}
else{
    return (
        <section className="h-100 gradient-form" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                {/* Left Panel */}
                                <div className="col-lg-6 left-panel overflow-auto">
                                    <div className="card-body p-md-5 mx-md-4">
                                        {/* <!-- Pills navs --> */}
                                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                                aria-controls="pills-login" aria-selected="true">Login</a>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                                                aria-controls="pills-register" aria-selected="false">Register</a>
                                            </li>
                                        </ul>
                                        {/* <!-- Pills navs --> */}
                                        <div className="text-center">
                                            <img src={login} alt="logo" className='login-logo'/>
                                            <h4 className="mt-1 mb-5 pb-1">Welcome to <b>MOVIE ZONE</b></h4>
                                        </div>
                                        {/* <!-- Pills content --> */}
                                        <div className="tab-content">
                                        <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                            <form>
                                            {/* <!-- Email input --> */}
                                            <label className="form-label d-block" htmlFor="useremail">Email</label>
                                            <div className="mb-4 input-group">
                                                <i className='fa-solid fa-envelope input-group-text d-flex'/>
                                                <input type="email" ref={signInEmail} id="useremail" placeholder='Enter Email' value={signInValues.email} className="form-control" name='email' onChange={handleSignInChange}/>
                                            </div>
                                            {signInErrors.email && <p className='note note-warning error'>{signInErrors.email}</p>}
                                            {/* <!-- Password input --> */}
                                            <label className="form-label d-block" htmlFor="loginPassword">Password</label>
                                            <div className="input-group mb-4">
                                                <i className='fa fa-key input-group-text d-flex'/>
                                                <input type="password" ref={signInPassword} id="loginPassword" placeholder='Enter Password' value={signInValues.password} name='password' className="form-control" onChange={handleSignInChange}/>
                                            </div>
                                            {signInErrors.password && <p className='note note-warning error'>{signInErrors.password}</p>}
                                            {/* <!-- 2 column grid layout --> */}
                                            <div className="row mb-4">
                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Checkbox --> */}
                                                <div className="form-check mb-3 mb-md-0">
                                                    <input className="form-check-input" type="checkbox" defaultChecked id="loginCheck"/>
                                                    <label className="form-check-label" htmlFor="loginCheck">Remember me </label>
                                                </div>
                                                </div>

                                                <div className="col-md-6 d-flex justify-content-center">
                                                {/* <!-- Simple link --> */}
                                                <a href="#!">Forgot password?</a>
                                                </div>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="submit" className="btn btn-primary btn-block mb-4" onClick={handleSignInSubmit}>Sign in</button>
                                            </form>
                                        </div>
                                        <div className="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                                            <form>
                                            {/*  Username input */}
                                            <label className="form-label d-block" htmlFor="registerUsername">Username</label>
                                            <div className="input-group mb-4">
                                                <i className='fa-solid fa-user input-group-text d-flex'/>
                                                <input type="text" placeholder='Enter Username' id="registerUsername" ref={signUpUserName} name='username' value={signUpValues.username} className="form-control" onChange={handleSignUpChange}/>
                                            </div>
                                            {signUpErrors.username && <p className='note note-warning error'>{signUpErrors.username}</p>}
                                            {/* Email input */}
                                            <label className="form-label d-block" htmlFor="registerEmail">Email</label>
                                            <div className="input-group mb-4">
                                                <i className='fa-solid fa-envelope input-group-text d-flex'/>
                                                <input type="email" placeholder='Enter Email' id="registerEmail" ref={signUpEmail} name='email' value={signUpValues.email} className="form-control" onChange={handleSignUpChange}/>
                                            </div>
                                            {signUpErrors.email && <p className='note note-warning error'>{signUpErrors.email}</p>}
                                            {/* Password input */}
                                            <label className="form-label d-block" htmlFor="registerPassword">Password</label>
                                            <div className="input-group mb-4">
                                                <i className='fa fa-key input-group-text d-flex'/>
                                                <input type="password" placeholder='Enter Password' id="registerPassword" ref={signUpPassword} name='password' value={signUpValues.password} className="form-control" onChange={handleSignUpChange}/>
                                            </div>
                                            {signUpErrors.password && <p className='note note-warning error'>{signUpErrors.password}</p>}
                                            {/* Confirm Password input */}
                                            <label className="form-label d-block" htmlFor="registerRepeatPassword">Repeat password</label>
                                            <div className="input-group mb-4">
                                                <i className='fa fa-key input-group-text d-flex'/>
                                                <input type="password" placeholder='Confirm Password' id="registerRepeatPassword" ref={signUpConfirmPassword} name='userconfirmpass' value={signUpValues.userconfirmpass} className="form-control" onChange={handleSignUpChange}/>
                                            </div>
                                            {signUpErrors.userconfirmpass && <p className='note note-warning error'>{signUpErrors.userconfirmpass}</p>}
                                            {/* Checkbox */}
                                            <div className="form-check d-flex justify-content-center mb-4">
                                                <input className="form-check-input me-2" type="checkbox" id="registerCheck" defaultChecked
                                                aria-describedby="registerCheckHelpText" />
                                                <label className="form-check-label" htmlFor="registerCheck">
                                                I have read and agree to the terms
                                                </label>
                                            </div>

                                            {/* <!-- Submit button --> */}
                                            <button type="submit" className="btn btn-primary btn-block mb-3" onClick={handleSignUpSubmit}>Sign up</button>
                                            </form>
                                        </div>
                                        </div>
                                        {/* <!-- Pills content --> */}
                                    </div>
                                </div>
                                {/* Right Panel */}
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Buying something on sale is a very special feeling. In fact, the less I pay for something, the more it is worth to me. I have a dress that I paid so little for that I am afraid to wear it. I could spill something on it, and then how would I replace it for that amount of money?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
}
