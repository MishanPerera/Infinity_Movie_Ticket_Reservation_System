import React, { useEffect } from 'react'
import Navbar from './Navbar'

export default function Home() {
  const isAuth = sessionStorage.getItem("isAuth");
  const role = sessionStorage.getItem("role");
  const email = sessionStorage.getItem("email");
  const date = new Date();

  const getTime =()=>{
      const hour = date.getHours()>12 ? date.getHours()%12 : date.getHours();
      const period = date.getHours()>12 ? "PM" : "AM";
      const minutes = date.getMinutes()<10? 0+""+date.getMinutes(): date.getMinutes();

      return hour+":"+minutes+" "+period;
  }

  return (
    <>
      <Navbar/>
      <section className="text-center">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="card mx-4 mx-md-5 align-items-center shadow-5-strong h-50 w-50">
          <h1>User Details</h1>
          <hr/>
          <h4>Email: {email}</h4>
          <h4>Role: {role}</h4>
          <h4>Login Status: {isAuth}</h4>
          <h4>Date: {date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()}</h4>
          <h4>Time: {getTime()}</h4>  
        </div>
        </div>
      </section>
    </>
  )
}
